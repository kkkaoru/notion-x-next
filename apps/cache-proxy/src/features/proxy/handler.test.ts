import { ProxyHandler } from './handler';
import type { Context } from 'hono';
import { rewriteUrl } from './rewrite-url';
import { Mock } from 'vitest';
import exp from 'constants';

vi.mock('./rewrite-url', () => ({
  rewriteUrl: vi.fn().mockImplementation(() => new URL('https://api.notion.com/mock')),
}));

test('handler', async () => {
  // mock fetch
  const mockRequestResponse = vi.fn().mockResolvedValue({ body: 'body' });
  vi.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify(mockRequestResponse)));
  // mock Request
  const mockRequestInstance = vi.fn().mockImplementation(() => {});
  const mockRequest = vi.fn().mockImplementation(mockRequestInstance);
  vi.spyOn(global, 'Request').mockImplementation(mockRequest);
  // mock Response
  const mockResponseReturn = vi.fn();
  const mockResponseInstance = vi.fn().mockImplementation(() => mockResponseReturn);
  const mockResponse = vi.fn().mockImplementation(mockResponseInstance);
  vi.spyOn(global, 'Response').mockImplementation(mockResponse);

  await vi.waitFor(async () => {
    const result = await ProxyHandler(
      {
        req: { url: 'https://localhost:5000/mock', raw: { headers: [], method: 'GET' } },
        env: {},
      } as unknown as Context,
      vi.fn(),
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockResponseReturn);
  });

  expect(rewriteUrl).toHaveBeenCalledTimes(1);
  expect(rewriteUrl).toHaveBeenCalledWith('https://localhost:5000/mock', {});
  expect(mockRequest).toHaveBeenCalledTimes(1);
  expect(mockRequest).toHaveBeenCalledWith(new URL('https://api.notion.com/mock'), { headers: [], method: 'GET' });
  expect(mockResponse).toHaveBeenCalledTimes(1);
});
