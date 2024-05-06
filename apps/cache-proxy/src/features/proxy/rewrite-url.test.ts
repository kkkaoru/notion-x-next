import { rewriteUrl } from './rewrite-url';

test('should rewrite url', () => {
  const orgUrl = new URL('http://localhost.com:9999/example');
  const mockUrl = vi.fn().mockImplementation(() => orgUrl);
  vi.spyOn(global, 'URL').mockImplementation(mockUrl);

  const url = rewriteUrl('http://localhost.com:9999/example', {
    PROXY_HOST: 'api.notion.com',
  });
  expect(url.href).toBe('https://api.notion.com/example');
  expect(mockUrl).toHaveBeenCalledTimes(1);
  expect(mockUrl).toHaveBeenCalledWith('http://localhost.com:9999/example');
});

test('should return default value', () => {
  const url = rewriteUrl('http://localhost.com:9999/example', {});
  expect(url.href).toBe('https://api.notion.com/example');
});
