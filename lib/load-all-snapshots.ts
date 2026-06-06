import { supabase } from '@/lib/supabase'
import { getCachedOrFetch } from '@/lib/cache'

export type SnapshotRow = {
  game_id: number
  playing: number
  visits: number
  created_at: string
}

type LoadSnapshotsOptions = {
  since?: string
  maxRows?: number
}

const RECENT_SNAPSHOTS_CACHE_SECONDS = 60

export async function loadRecentSnapshots(windowHours: number, maxRows: number) {
  return getCachedOrFetch(`snapshots:recent:${windowHours}h:${maxRows}`, async () => {
    const since = new Date(Date.now() - windowHours * 60 * 60 * 1000).toISOString()

    return loadAllSnapshots({
      since,
      maxRows,
    })
  }, RECENT_SNAPSHOTS_CACHE_SECONDS)
}

export async function loadAllSnapshots(options: LoadSnapshotsOptions = {}) {
  const snapshots: SnapshotRow[] = []

  let from = 0
  const batchSize = 1000

  while (true) {
    const to = options.maxRows
      ? Math.min(from + batchSize - 1, options.maxRows - 1)
      : from + batchSize - 1

    let query = supabase
      .from('snapshots')
      .select('game_id, playing, visits, created_at')
      .order('created_at', { ascending: false })
      .range(from, to)

    if (options.since) {
      query = query.gte('created_at', options.since)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    if (!data?.length) {
      break
    }

    snapshots.push(...(data as SnapshotRow[]))

    if (options.maxRows && snapshots.length >= options.maxRows) {
      break
    }

    if (data.length < batchSize) {
      break
    }

    from += batchSize
  }
  console.log(`Total Snapshots Loaded: ${snapshots.length}${options.since ? ` since ${options.since}` : ''}`)

  return snapshots
}
