import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { middlewares } from './middlewares';
import type { AppType } from './types';

const app = new Hono<AppType>();

app.use('*', ...middlewares);

app.get('/', prettyJSON(), async (c) => {
  return c.json({ message: 'Hello, World!' });
});

export default app;
