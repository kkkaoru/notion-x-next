import { Handler } from 'hono';
import { ProxyEnv } from './types';
import { rewriteUrl } from './rewrite-url';

export const ProxyHandler: Handler<ProxyEnv> = async (c) => {
  const url = rewriteUrl(c.req.url, c.env);
  const request = new Request(url, { headers: c.req.raw.headers, method: c.req.raw.method });
  const res = await fetch(request);
  return new Response(res.body, res);
};
