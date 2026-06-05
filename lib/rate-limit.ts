const store = new Map<string, { count: number; resetAt: number }>()

const LIMITS: Record<string, number> = {
  default: 60,
  authenticated: 300,
}

const WINDOW_MS = 60_000

export function rateLimit(ip: string, apiKey?: string | null): { allowed: boolean; limit: number; remaining: number; resetAt: number } {
  const tier = apiKey ? 'authenticated' : 'default'
  const limit = LIMITS[tier]
  const now = Date.now()
  const key = `${tier}:${ip}`

  let entry = store.get(key)
  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS }
    store.set(key, entry)
  }

  entry.count++

  const remaining = Math.max(0, limit - entry.count)

  return {
    allowed: entry.count <= limit,
    limit,
    remaining,
    resetAt: entry.resetAt,
  }
}

export function getRateLimitHeaders(ip: string, apiKey?: string | null): Record<string, string> {
  const { limit, remaining, resetAt } = rateLimit(ip, apiKey)
  return {
    'X-RateLimit-Limit': String(limit),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
  }
}