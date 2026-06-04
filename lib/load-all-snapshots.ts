import { supabase } from '@/lib/supabase'

export type SnapshotRow = {
  game_id: number
  playing: number
  visits: number
  created_at: string
}

export async function loadAllSnapshots() {
  const snapshots: SnapshotRow[] = []

  let from = 0
  const batchSize = 1000

  while (true) {
    const { data, error } = await supabase
      .from('snapshots')
      .select('game_id, playing, visits, created_at')
      .order('created_at', { ascending: false })
      .range(from, from + batchSize - 1)

    if (error) {
      throw error
    }

    if (!data?.length) {
      break
    }

    snapshots.push(...(data as SnapshotRow[]))

    if (data.length < batchSize) {
      break
    }

    from += batchSize
  }
  console.log(`Total Snapshots Loaded: ${snapshots.length}`)

  return snapshots
}
