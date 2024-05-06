import { ProxyVars } from './types';

export function rewriteUrl(rawUrl: string, { PROXY_HOST, PROXY_PORT, PROXY_PROTOCOL }: ProxyVars): URL {
  const url = new URL(rawUrl);
  return Object.assign(url, {
    host: PROXY_HOST || url.host,
    port: PROXY_PORT || '',
    protocol: PROXY_PROTOCOL || 'https:',
  } as URL);
}
