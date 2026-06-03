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
export async function getGrowth(gameId: number) {
  const response = await fetch(`/api/game/${gameId}/growth`)

  const data = await response.json()
  return data.map((item) => ({
    ...item,
    label: new Date(item.created_at).toLocaleDateString(),
  }))
  return data.growth
}
