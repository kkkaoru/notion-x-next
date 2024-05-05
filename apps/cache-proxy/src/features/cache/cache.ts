import { cache } from 'hono/cache';
import type { MiddlewareHandler, Env } from 'hono';

const DEFAULT_CACHE_CONTROL = 'max-age=3600';

export type CacheVars = {
  CACHE_CACHE_NAME?: string;
  CACHE_CACHE_CONTROL?: string;
};

interface CacheEnv extends Env {
  Bindings: CacheVars;
}

export const cacheMiddlewareHandler: MiddlewareHandler<CacheEnv> = (c, next) =>
  cache({
    cacheName: c.env?.CACHE_CACHE_NAME || 'proxy-cache',
    cacheControl: c.env?.CACHE_CACHE_CONTROL || DEFAULT_CACHE_CONTROL,
  })(c, next);
