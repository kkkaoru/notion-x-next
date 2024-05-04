import type { MiddlewareHandler } from 'hono';
import { cors } from 'hono/cors';

const DEFAULT_CORS_MAX_AGE = 600;

export type CorsVars = {
  CORS_ORIGINS?: string;
  CORS_MAX_AGE?: string;
  CORS_CREDENTIALS?: string;
};

export const corsMiddlewareHandler: MiddlewareHandler<{ Bindings: CorsVars }> = (c, next) =>
  cors({
    origin: c?.env?.CORS_ORIGINS?.split(',').map((origin) => new URL(origin.trim()).origin) ?? [],
    allowHeaders: ['Upgrade-Insecure-Requests', 'Content-Type'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE'],
    maxAge: Number.isNaN(Number(c?.env?.CORS_MAX_AGE)) ? DEFAULT_CORS_MAX_AGE : Number(c?.env?.CORS_MAX_AGE),
    credentials: (c?.env?.CORS_CREDENTIALS ?? 'true') === 'true',
  })(c, next);
