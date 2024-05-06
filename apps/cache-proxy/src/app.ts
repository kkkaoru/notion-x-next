import { Hono } from 'hono';
import { middlewares } from './middlewares';
import type { AppType } from './types';
import { ProxyHandler } from './features/proxy';

const app = new Hono<AppType>();

app.use('*', ...middlewares);

app.all('*', ProxyHandler);

export default app;
