import { getRedis } from '@/lib/redis'

export async function getCachedOrFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds = 60,
): Promise<T> {
  const redis = getRedis()

  if (redis) {
    try {
      const cached = await redis.get<string>(key)
      if (cached) return JSON.parse(cached) as T
    } catch {
      // fall through to fetch
    }
  }

  const data = await fetchFn()

  if (redis) {
    try {
      await redis.set(key, JSON.stringify(data), { ex: ttlSeconds })
    } catch {
      // cache write failure is non-blocking
    }
  }

  return data
}

export async function invalidateCache(pattern: string): Promise<void> {
  const redis = getRedis()
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