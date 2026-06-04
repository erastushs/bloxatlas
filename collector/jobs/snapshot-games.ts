import { supabase } from '../lib/supabase'
import { getGameStats } from '../sources/roblox'

export async function snapshotGames() {
  let updatedCount = 0
  let snapshotCount = 0
  let skippedCount = 0
  const snapshotsToInsert = []
  const allGames = []

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

  for (const game of allGames) {
    const stats = await getGameStats(game.universe_id)
    if (!stats) {
      skippedCount++
      console.log(`Skipped snapshot: ${game.name}`)
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

    snapshotCount++
    updatedCount++
    console.log(`Updated: ${game.name}`)
    console.log(`Snapshot: ${game.name}`)
  }

  console.log(`Inserting ${snapshotsToInsert.length} snapshots...`)
  const { error: snapshotError } = await supabase.from('snapshots').insert(snapshotsToInsert)

  if (snapshotError) {
    throw snapshotError
  }
  console.log('==========')
  console.log(`Games Updated: ${updatedCount}`)
  console.log(`Snapshots Added: ${snapshotCount}`)
  console.log(`Skipped: ${skippedCount}`)
  console.log('==========')
}
