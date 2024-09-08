import { convertOrigin } from './convert-origin';

test('should convert origin to origin string', () => {
  expect(convertOrigin('https://cloudflare.com')).toBe('https://cloudflare.com');
  expect(convertOrigin('http://localhost:3333')).toBe('http://localhost:3333');
});

test('should convert origin to wildcard', () => {
  expect(convertOrigin('*')).toBe('*');
});
