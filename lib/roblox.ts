const GAMES_API = 'https://games.roblox.com/v1/games/list'

export async function getTrendingGames() {
  const response = await fetch(`${GAMES_API}?sortToken=`)

  if (!response.ok) {
    throw new Error('Failed to fetch games')
  }

  return response.json()
}
