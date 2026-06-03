import { syncGames } from './sync-games'
import { snapshotGames } from './snapshot-games'

async function run() {
  console.log('Starting sync...')

  await syncGames()

  console.log('Starting snapshots...')

  await snapshotGames()

  console.log('Done.')
}

run().catch(console.error)
