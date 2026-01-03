// Simple in-memory rate limiter
// For production, consider using Redis

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10)
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10)

export function rateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = store[identifier]

  if (!record || now > record.resetTime) {
    store[identifier] = {
      count: 1,
      resetTime: now + WINDOW_MS,
    }
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: MAX_REQUESTS - record.count }
}

