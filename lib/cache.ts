import { getRedis } from '@/lib/redis'

type MemoryCacheEntry<T> = {
  expiresAt: number
  data: T
}

const memoryCache = new Map<string, MemoryCacheEntry<unknown>>()
const pendingFetches = new Map<string, Promise<unknown>>()

export async function getCachedOrFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds = 60,
): Promise<T> {
  const now = Date.now()
  const redis = getRedis()
  const memoryCached = memoryCache.get(key)

  if (memoryCached) {
    if (memoryCached.expiresAt > now) {
      return memoryCached.data as T
    }

    memoryCache.delete(key)
  }

  if (redis) {
    try {
      const cached = await redis.get<string>(key)
      if (cached) {
        const data = JSON.parse(cached) as T
        memoryCache.set(key, {
          data,
          expiresAt: now + ttlSeconds * 1000,
        })
        return data
      }
    } catch {
      // fall through to fetch
    }
  }

  const pendingFetch = pendingFetches.get(key)
  if (pendingFetch) {
    return pendingFetch as Promise<T>
  }

  const nextFetch = (async () => {
    const data = await fetchFn()
    memoryCache.set(key, {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    })

    if (redis) {
      try {
        await redis.set(key, JSON.stringify(data), { ex: ttlSeconds })
      } catch {
        // cache write failure is non-blocking
      }
    }

    return data
  })()

  pendingFetches.set(key, nextFetch)

  try {
    return await nextFetch
  } finally {
    if (pendingFetches.get(key) === nextFetch) {
      pendingFetches.delete(key)
    }
  }
}

export async function invalidateCache(pattern: string): Promise<void> {
  const redis = getRedis()

  for (const key of memoryCache.keys()) {
    if (matchesPattern(key, pattern)) {
      memoryCache.delete(key)
    }
  }

  if (!redis) return

  try {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  } catch {
    // non-blocking
  }
}

function matchesPattern(key: string, pattern: string) {
  if (pattern === key) return true
  if (!pattern.includes('*')) return false

  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')
  return new RegExp(`^${escaped}$`).test(key)
}
