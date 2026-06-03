import { supabase } from '../lib/supabase'

const query = 'blox fruits'

async function syncGame() {
  // Search
  const searchRes = await fetch(
    `https://apis.roblox.com/search-api/omni-search?urlLocale=en_us&searchQuery=${encodeURIComponent(query)}&pageToken=&sessionId=test&pageType=all`,
  )

  const searchData = await searchRes.json()

  const first = searchData.searchResults?.[0]?.contents?.[0]

  if (!first) {
    throw new Error('Game not found')
  }

  const universeId = first.universeId

  // Stats
  const statsRes = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`)

  const statsData = await statsRes.json()

  const game = statsData.data[0]

  // Thumbnail
  const thumbRes = await fetch(
    `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`,
  )

  const thumbData = await thumbRes.json()

  const thumbnail = thumbData.data?.[0]?.imageUrl ?? null

  const payload = {
    universe_id: universeId,
    place_id: game.rootPlaceId,

    name: game.name,
    creator: game.creator?.name,

    description: game.description,

    thumbnail,

    playing: game.playing,
    visits: game.visits,

    favorites: game.favoritedCount,

    last_synced_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('games').upsert(payload, {
    onConflict: 'universe_id',
  })

  if (error) {
    console.error('SUPABASE ERROR:')
    console.dir(error, { depth: null })
    process.exit(1)
  }

  console.log('Saved:', payload.name)
}

syncGame().catch((err) => {
  console.error('FATAL ERROR:')
  console.dir(err, { depth: null })
})
