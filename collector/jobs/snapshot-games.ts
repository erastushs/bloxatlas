import { supabase } from '../lib/supabase'
import { getGamesStats } from '../sources/roblox'

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }

  return chunks
}

export async function snapshotGames() {
  const snapshotsToInsert: Array<{ game_id: number; playing: number; visits: number; favorites: number }> = []
  const allGames = []

  let skippedCount = 0
  let updatedCount = 0
  let snapshotCount = 0

  let from = 0
  const batchSize = 1000

  while (true) {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .range(from, from + batchSize - 1)

    if (error) {
      throw error
    }

    allGames.push(...data)

    if (data.length < batchSize) {
      break
    }

    from += batchSize
  }

  console.log(`Games Loaded: ${allGames.length}`)

  const gameChunks = chunkArray(allGames, 50)
  const snapshotBatchSize = 500

  for (const chunk of gameChunks) {
    const universeIds = chunk.map((game) => game.universe_id)

    let statsList = []

    try {
      statsList = await getGamesStats(universeIds)
    } catch (error) {
      console.error(`Chunk failed (${chunk.length} games):`, error)

      skippedCount += chunk.length
      continue
    }

    const statsMap = new Map<number, (typeof statsList)[number]>(statsList.map((stats) => [stats.id, stats]))

    for (const game of chunk) {
      const stats = statsMap.get(game.universe_id)

      if (!stats) {
        skippedCount++
        continue
      }

      const { error: updateError } = await supabase
        .from('games')
        .update({
          playing: stats.playing,
          visits: stats.visits,
          favorites: stats.favoritedCount,
          last_synced_at: new Date().toISOString(),
        })
        .eq('id', game.id)

      if (updateError) {
        console.error(updateError)
        continue
      }

      snapshotsToInsert.push({
        game_id: game.id,
        playing: stats.playing,
        visits: stats.visits,
        favorites: stats.favoritedCount,
      })

      updatedCount++

      if (snapshotsToInsert.length >= snapshotBatchSize) {
        const { error: batchError } = await supabase.from('snapshots').insert(snapshotsToInsert)

        if (!batchError) {
          snapshotCount += snapshotsToInsert.length

          snapshotsToInsert.length = 0
        }
      }
    }
    const percent = Math.round((updatedCount / allGames.length) * 100)

    console.log(`Progress: ${updatedCount}/${allGames.length} (${percent}%)`)
  }

  if (snapshotsToInsert.length > 0) {
    console.log(`Inserting ${snapshotsToInsert.length} remaining snapshots...`)

    const { error: snapshotError } = await supabase.from('snapshots').insert(snapshotsToInsert)

    if (snapshotError) {
      throw snapshotError
    }

    snapshotCount += snapshotsToInsert.length
  }

  console.log('==========')
  console.log(`Games Updated: ${updatedCount}`)
  console.log(`Snapshots Added: ${snapshotCount}`)
  console.log(`Skipped: ${skippedCount}`)
  console.log('==========')
}
