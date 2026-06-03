import { supabase } from '../lib/supabase'
import { getGameStats } from '../sources/roblox'

export async function snapshotGames() {
  const { data: games, error } = await supabase.from('games').select('*')

  if (error) {
    throw error
  }

  for (const game of games) {
    const stats = await getGameStats(game.universe_id)
    if (!stats) {
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

    const { error: snapshotError } = await supabase.from('snapshots').insert({
      game_id: game.id,

      playing: stats.playing,
      visits: stats.visits,
      favorites: stats.favoritedCount,
    })

    if (snapshotError) {
      console.error(snapshotError)
      continue
    }
    console.log(`Updated: ${game.name}`)
    console.log(`Snapshot: ${game.name}`)
  }

  console.log('Done.')
}
