import { supabase } from '@/lib/supabase'
import type { Game, RecentlyUpdatedGame } from '@/types/game'

const DEFAULT_RECENTLY_UPDATED_LIMIT = 12

type RecentlyUpdatedRow = Game & {
  last_synced_at: string
}

function toRecentlyUpdatedGame(game: RecentlyUpdatedRow, index: number): RecentlyUpdatedGame {
  return {
    ...game,
    rank: index + 1,
    lastSyncedAt: game.last_synced_at,
  }
}

export async function getRecentlyUpdatedGames(limit = DEFAULT_RECENTLY_UPDATED_LIMIT): Promise<RecentlyUpdatedGame[]> {
  const { data, error } = await supabase
    .from('games')
    .select('id, name, creator, playing, visits, description, thumbnail, last_synced_at')
    .not('last_synced_at', 'is', null)
    .order('last_synced_at', { ascending: false })
    .order('playing', { ascending: false })
    .limit(limit)

  if (error) {
    throw error
  }

  return ((data ?? []) as RecentlyUpdatedRow[]).map((game, index) => toRecentlyUpdatedGame(game, index))
}
