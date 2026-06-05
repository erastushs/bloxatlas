import { registerJobHandler } from '@/lib/queue'

registerJobHandler('collect-snapshot', async (_payload) => {
  const { snapshotGames } = await import('./snapshot-games')
  await snapshotGames()
})

registerJobHandler('collect-sync', async (_payload) => {
  const { syncGames } = await import('./sync-games')
  await syncGames()
})

registerJobHandler('cache-invalidate', async (payload) => {
  const { invalidateCache } = await import('@/lib/cache')
  const pattern = payload.pattern as string
  if (pattern) {
    await invalidateCache(pattern)
  }
})