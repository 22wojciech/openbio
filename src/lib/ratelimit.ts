import { hasRedis, redis } from '@/lib/redis';
import { Ratelimit } from '@upstash/ratelimit';

/**
 * Without Upstash credentials rate limiting is disabled and every request
 * is allowed.
 */
const allowAll = {
  limit: async () => ({
    success: true,
    limit: 0,
    remaining: 0,
    reset: 0,
    pending: Promise.resolve(),
  }),
} as unknown as Ratelimit;

function createLimit(
  requests: number,
  window: Parameters<typeof Ratelimit.slidingWindow>[1],
  prefix: string
): Ratelimit {
  if (!hasRedis) {
    return allowAll;
  }
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    prefix,
  });
}

/** General public endpoints — 60 requests per minute */
export const generalLimit = createLimit(60, '1m', 'rl:general');

/** Email subscribe — 5 requests per minute */
export const subscribeLimit = createLimit(5, '1m', 'rl:subscribe');

/** External fetch endpoints (metadata, music) — 10 requests per minute */
export const fetchLimit = createLimit(10, '1m', 'rl:fetch');
