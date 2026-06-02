import { supabase } from '@/lib/supabase'

export async function getSnapshots(gameId: number) {
  const { data, error } = await supabase.from('snapshots').select('*').eq('game_id', gameId).order('created_at')

  if (error) {
    throw error
  }

  return data
}
export async function getGrowth(gameId: number) {
  const snapshots = await getSnapshots(gameId)

  if (snapshots.length < 2) {
    return 0
  }

  const first = snapshots[0]
  const last = snapshots[snapshots.length - 1]

  return last.playing - first.playing
}
