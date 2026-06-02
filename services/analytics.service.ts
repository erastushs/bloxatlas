import { supabase } from '@/lib/supabase'

export async function getSiteStats() {
  const { data, error } = await supabase.from('games').select('*')

  if (error) {
    throw error
  }

  const totalGames = data.length

  const totalPlayers = data.reduce((sum, game) => sum + game.playing, 0)

  const totalVisits = data.reduce((sum, game) => sum + game.visits, 0)

  return {
    totalGames,
    totalPlayers,
    totalVisits,
  }
}
