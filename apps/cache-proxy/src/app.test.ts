import { Hono } from 'hono';
import { Mock } from 'vitest';
import { middlewares } from './middlewares';
import { ProxyHandler } from './features/proxy';

vi.mock('hono');

test('app', async () => {
  const mockUse = vi.fn();
  const mockAll = vi.fn();
  const mockConstructor = vi.fn().mockImplementation(() => ({
    use: mockUse,
    all: mockAll,
  }));
  (Hono as Mock).mockImplementation(mockConstructor);

  await import('./app');
  expect(mockConstructor).toHaveBeenCalledTimes(1);
  expect(mockUse).toHaveBeenCalledTimes(1);
  expect(mockUse).toHaveBeenCalledWith('*', ...middlewares);
  expect(mockAll).toHaveBeenCalledTimes(1);
  expect(mockAll).toHaveBeenCalledWith('*', ProxyHandler);
});
