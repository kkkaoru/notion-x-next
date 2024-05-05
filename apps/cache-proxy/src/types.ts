import { type CorsVars } from './features/cors';
import { type CacheVars } from './features/cache';

export interface AppType {
  Bindings: CorsVars & CacheVars;
}
