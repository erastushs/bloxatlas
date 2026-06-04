import { syncGames } from './sync-games'
import { snapshotGames } from './snapshot-games'

async function run() {
  const start = Date.now()
  console.log('Starting sync...')

  const syncStart = Date.now()
  await syncGames()
  console.log(`Sync done in ${((Date.now() - syncStart) / 1000).toFixed(2)}s`)

  const snapshotStart = Date.now()
  await snapshotGames()
  console.log(`Snapshot done in ${((Date.now() - snapshotStart) / 1000).toFixed(2)}s`)
  console.log(`Total duration: ${((Date.now() - start) / 1000).toFixed(2)}s`)
}

run().catch(console.error)
