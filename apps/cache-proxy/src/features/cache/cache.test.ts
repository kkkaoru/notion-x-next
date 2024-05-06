import { cacheMiddlewareHandler } from './cache';
import { cache } from 'hono/cache';
import type { Context } from 'hono';
import { type Mock } from 'vitest';

vi.mock('hono/cache', () => ({
  cache: vi.fn().mockImplementation(() => vi.fn()),
}));

test('should generate default handler', () => {
  const mockContext = {} as unknown as Context;
  const mockNext = vi.fn();
  const mockMiddleware = vi.fn();
  (cache as Mock).mockImplementation(() => mockMiddleware);

  cacheMiddlewareHandler(mockContext, mockNext);

  expect(cache).toHaveBeenCalledTimes(1);
  expect(cache).toBeCalledWith({
    cacheName: 'proxy-cache',
    cacheControl: 'max-age=3600',
  });
  expect(mockMiddleware).toHaveBeenCalledTimes(1);
  expect(mockMiddleware).toBeCalledWith(mockContext, mockNext);
});

test('should generate cache middleware handler', () => {
  const mockContext = {
    env: {
      CACHE_CACHE_NAME: 'mock-cache-name',
      CACHE_CACHE_CONTROL: 'max-age=9999',
    },
  } as unknown as Context;
  const mockNext = vi.fn();
  const mockMiddleware = vi.fn();
  (cache as Mock).mockImplementation(() => mockMiddleware);

  cacheMiddlewareHandler(mockContext, mockNext);

  expect(cache).toHaveBeenCalledTimes(1);
  expect(cache).toBeCalledWith({
    cacheName: 'mock-cache-name',
    cacheControl: 'max-age=9999',
  });
  expect(mockMiddleware).toHaveBeenCalledTimes(1);
  expect(mockMiddleware).toBeCalledWith(mockContext, mockNext);
});
