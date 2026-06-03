import { supabase } from '../lib/supabase'
import { getGameStats } from '../sources/roblox'

async function snapshotGames() {
  const { data: games, error } = await supabase.from('games').select('*')

  if (error) {
    throw error
  }

  for (const game of games) {
    const stats = await getGameStats(game.universe_id)

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

    console.log(`Snapshot: ${game.name}`)
  }

  console.log('Done.')
}

snapshotGames().catch(console.error)
