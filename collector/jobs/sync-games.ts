import { supabase } from '../lib/supabase'

import { seedQueries } from '../constants/seeds'

import { searchGames, getGamesStats, getGameThumbnails } from '../sources/roblox'

export async function syncGames() {
  let savedCount = 0
  let skippedCount = 0

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  for (const query of seedQueries) {
    console.log(`Searching: ${query}`)

    const games = await searchGames(query)

    const candidates = games.slice(0, 20).filter((g) => g?.universeId)

    if (candidates.length === 0) {
      continue
    }

    const universeIds = candidates.map((g) => g.universeId)

    const statsList = await getGamesStats(universeIds)

    const thumbnails = await getGameThumbnails(universeIds)

    const statsMap = new Map(statsList.map((stats) => [stats.id, stats]))

    const thumbnailMap = new Map(thumbnails.map((thumb) => [thumb.targetId, thumb.imageUrl]))

    const payloads = []

    for (const search of candidates) {
      const stats = statsMap.get(search.universeId)

      if (!stats) {
        skippedCount++
        continue
      }

      payloads.push({
        universe_id: search.universeId,
        place_id: stats.rootPlaceId,

        name: stats.name,
        creator: stats.creator?.name,

        description: stats.description,

        thumbnail: thumbnailMap.get(search.universeId) ?? null,

        playing: stats.playing,
        visits: stats.visits,

        favorites: stats.favoritedCount,

        last_synced_at: new Date().toISOString(),
      })
    }

    if (payloads.length > 0) {
      const { error } = await supabase.from('games').upsert(payloads, {
        onConflict: 'universe_id',
      })

      if (error) {
        console.error(error)
        continue
      }

      savedCount += payloads.length

      console.log(`Saved: ${payloads.length} games`)
    }
  }
  await sleep(1000)

  console.log('==========')
  console.log(`Saved Games: ${savedCount}`)
  console.log(`Skipped Games: ${skippedCount}`)
  console.log('Done.')
  console.log('==========')
}
