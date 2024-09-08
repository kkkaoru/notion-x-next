import { type MiddlewareHandler } from 'hono';
import { poweredBy } from 'hono/powered-by';
import { logger } from 'hono/logger';
import { corsMiddlewareHandler } from '../features/cors';
import { cacheMiddlewareHandler } from '../features/cache';

export const middlewares: MiddlewareHandler[] = [
  poweredBy(),
  logger(),
  // cacheMiddlewareHandler,
  corsMiddlewareHandler,
] as const;
