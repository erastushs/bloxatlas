const query = 'blox fruits'

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
const placeId = first.rootPlaceId

// Stats
const statsRes = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`)

const statsData = await statsRes.json()

const stats = statsData.data[0]

// Thumbnail
const thumbRes = await fetch(
  `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`,
)

const thumbData = await thumbRes.json()

const thumbnail = thumbData.data?.[0]?.imageUrl ?? null

console.log({
  universeId,
  placeId,

  name: stats.name,

  creator: stats.creator?.name,

  playing: stats.playing,

  visits: stats.visits,

  favorites: stats.favoritedCount,

  thumbnail,
})
