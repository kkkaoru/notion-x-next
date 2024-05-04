import type { InlineConfig } from 'vitest';

export const test: InlineConfig = {
  globals: true,
  coverage: {
    enabled: process.env.VITEST_ENABLED_COVERAGE === 'true',
    provider: 'v8',
    thresholds:
      process.env.VITEST_ENABLED_THRESHOLDS === 'true'
        ? { statements: 80, branches: 80, functions: 80, lines: 80 }
        : undefined,
    exclude: [
      '**/*/index.ts',
      '**/*/*.types.ts',
      '**/*/*.d.ts',
      '**/*/*.js',
      '*.cjs',
      'apps',
      'src/bin',
      '**/const/*.*',
      '**/*/*.const.ts',
    ],
  },
  clearMocks: true,
};
