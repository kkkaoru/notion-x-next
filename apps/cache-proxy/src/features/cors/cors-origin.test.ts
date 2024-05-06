import { corsMiddlewareHandler } from './cors-origins';
import { cors } from 'hono/cors';
import type { Context } from 'hono';
import { type Mock } from 'vitest';

vi.mock('hono/cors', () => ({
  cors: vi.fn().mockImplementation(() => vi.fn()),
}));

test('should generate cors middleware handler', () => {
  const mockContext = {
    env: {
      CORS_ORIGINS: 'https://cloudflare.com,http://localhost:3000',
      CORS_MAX_AGE: 999,
      CORS_CREDENTIALS: 'false',
    },
  } as unknown as Context;
  const mockNext = vi.fn();
  const mockMiddleware = vi.fn();
  (cors as Mock).mockImplementation(() => mockMiddleware);

  corsMiddlewareHandler(mockContext, mockNext);

  expect(cors).toHaveBeenCalledTimes(1);
  expect(cors).toBeCalledWith({
    origin: ['https://cloudflare.com', 'http://localhost:3000'],
    allowHeaders: ['Upgrade-Insecure-Requests', 'Content-Type'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE'],
    maxAge: 999,
    credentials: false,
  });
  expect(mockMiddleware).toHaveBeenCalledTimes(1);
  expect(mockMiddleware).toBeCalledWith(mockContext, mockNext);
});

test('should generate default cors middleware handler', () => {
  const mockContext = {
    env: {},
  } as unknown as Context;
  const mockNext = vi.fn();
  const mockMiddleware = vi.fn();
  (cors as Mock).mockImplementation(() => mockMiddleware);

  corsMiddlewareHandler(mockContext, mockNext);

  expect(cors).toHaveBeenCalledTimes(1);
  expect(cors).toBeCalledWith({
    origin: [],
    allowHeaders: ['Upgrade-Insecure-Requests', 'Content-Type'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE'],
    maxAge: 600,
    credentials: true,
  });
  expect(mockMiddleware).toHaveBeenCalledTimes(1);
  expect(mockMiddleware).toBeCalledWith(mockContext, mockNext);
});
