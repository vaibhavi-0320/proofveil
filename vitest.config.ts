import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['contracts/test/**/*.test.ts'],
  },
});
