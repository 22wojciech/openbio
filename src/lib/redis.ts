import { Redis } from '@upstash/redis';

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

/**
 * Without Upstash credentials the cache is disabled: reads miss, writes are
 * ignored and every request falls through to the database.
 */
const disabledCache = {
  get: async () => null,
  set: async () => 'OK',
  del: async () => 0,
} as unknown as Redis;

export const hasRedis = Boolean(url && token);

export const redis: Redis = hasRedis
  ? new Redis({ url: url as string, token: token as string })
  : disabledCache;
