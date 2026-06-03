import { supabase } from '@/lib/supabase'

export async function getSiteStats() {
  const { count, error: countError } = await supabase.from('games').select('*', {
    count: 'exact',
    head: true,
  })

  if (countError) {
    throw countError
  }

  const { data, error } = await supabase.from('games').select('playing, visits')

  if (error) {
    throw error
  }

  const totalPlayers = data.reduce((sum, game) => sum + game.playing, 0)

  const totalVisits = data.reduce((sum, game) => sum + game.visits, 0)

  return {
    totalGames: count ?? 0,
    totalPlayers,
    totalVisits,
  }
}
