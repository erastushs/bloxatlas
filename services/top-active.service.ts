import { supabase } from '@/lib/supabase'
import type { Game, TopActiveGame } from '@/types/game'

const DEFAULT_TOP_ACTIVE_LIMIT = 12

function toTopActiveGame(game: Game, index: number): TopActiveGame {
  return {
    ...game,
    rank: index + 1,
    activeScore: game.playing,
  }
}

export async function getTopActiveGames(limit = DEFAULT_TOP_ACTIVE_LIMIT): Promise<TopActiveGame[]> {
  const { data, error } = await supabase
    .from('games')
    .select('id, name, creator, playing, visits, description, thumbnail')
    .order('playing', { ascending: false })
    .order('visits', { ascending: false })
    .limit(limit)

  if (error) {
    throw error
  }

  return (data ?? []).map((game, index) => toTopActiveGame(game, index))
}
