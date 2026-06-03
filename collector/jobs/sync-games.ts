import { supabase } from '../lib/supabase'

import { seedQueries } from '../constants/seeds'

import { searchGames, getGameStats, getGameThumbnail } from '../sources/roblox'

export async function syncGames() {
  for (const query of seedQueries) {
    console.log(`Searching: ${query}`)

    const games = await searchGames(query)

    for (const search of games.slice(0, 2)) {
      if (!search?.universeId) {
        continue
      }

      const stats = await getGameStats(search.universeId)

      if (!stats) {
        continue
      }

      const thumbnail = await getGameThumbnail(search.universeId)

      const payload = {
        universe_id: search.universeId,
        place_id: stats.rootPlaceId,

        name: stats.name,
        creator: stats.creator?.name,

        description: stats.description,

        thumbnail,

        playing: stats.playing,
        visits: stats.visits,

        favorites: stats.favoritedCount,

        last_synced_at: new Date().toISOString(),
      }

      const { error } = await supabase.from('games').upsert(payload, {
        onConflict: 'universe_id',
      })

      if (error) {
        console.error(error)
        continue
      }

      console.log(`Saved: ${stats.name}`)
    }
  }

  console.log('Done.')
}
