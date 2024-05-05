export const convertOrigin = (origin: string): '*' | string =>
  origin === '*' ? origin : new URL(origin.trim()).origin;
