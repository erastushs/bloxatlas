import { getTrendingGames } from '@/lib/roblox'

export async function fetchTrendingGames() {
  return getTrendingGames()
}
