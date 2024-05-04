import { Hono } from 'hono';
import { poweredBy } from 'hono/powered-by';
import { logger } from 'hono/logger';
import { type CorsVars, corsMiddlewareHandler } from './features/cors';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono<{ Bindings: CorsVars }>();

app.use('*', poweredBy(), logger());

app.use('*', corsMiddlewareHandler);

app.get('/', prettyJSON(), async (c) => {
  return c.json({ message: 'Hello, World!' });
});

export default app;
