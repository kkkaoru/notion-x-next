import { Env } from 'hono';

export type ProxyVars = {
  PROXY_HOST?: string;
  PROXY_PORT?: string;
  PROXY_PROTOCOL?: string;
};

export interface ProxyEnv extends Env {
  Bindings: ProxyVars;
}
