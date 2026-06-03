import { supabase } from '@/lib/supabase'

export async function getGameGrowth(gameId: number) {
  const { data, error } = await supabase
    .from('snapshots')
    .select(
      `
      playing,
      visits,
      favorites,
      created_at
    `,
    )
    .eq('game_id', gameId)
    .order('created_at', {
      ascending: true,
    })

  if (error) {
    throw error
  }

  return data
}
