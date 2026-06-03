type RobloxSearchGroup = {
  contents?: unknown[]
}

export async function searchGames(query: string) {
  const response = await fetch(
    `https://apis.roblox.com/search-api/omni-search?urlLocale=en_us&searchQuery=${encodeURIComponent(query)}&pageToken=&sessionId=test&pageType=all`,
  )
  const data = await response.json()
  return data.searchResults.flatMap((group: RobloxSearchGroup) => group.contents ?? [])
}

export async function getGameStats(universeId: number) {
  const response = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`)

  const data = await response.json()

  return data.data?.[0]
}

export async function getGameThumbnail(universeId: number) {
  const response = await fetch(
    `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`,
  )

  const data = await response.json()

  return data.data?.[0]?.imageUrl ?? null
}
