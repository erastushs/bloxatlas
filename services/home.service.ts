import { supabase } from '@/lib/supabase'
import type { Game, PopularGame } from '@/types/game'

const DEFAULT_POPULAR_GAMES_LIMIT = 9

function toPopularGame(game: Game, index: number): PopularGame {
  return {
    ...game,
    rank: index + 1,
    popularityScore: game.playing,
  }
}

export async function getPopularGames(limit = DEFAULT_POPULAR_GAMES_LIMIT): Promise<PopularGame[]> {
  const { data, error } = await supabase
    .from('games')
    .select('id, name, creator, playing, visits, description, thumbnail')
    .order('playing', { ascending: false })
    .order('visits', { ascending: false })
    .limit(limit)

  if (error) {
    throw error
  }

  return (data ?? []).map((game, index) => toPopularGame(game, index))
}
