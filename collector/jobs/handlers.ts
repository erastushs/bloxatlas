import { registerJobHandler } from '@/lib/queue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
registerJobHandler('collect-snapshot', async (_payload) => {
  const { snapshotGames } = await import('./snapshot-games')
  await snapshotGames()
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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