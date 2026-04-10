import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  workers: 1,
  use: {
    headless: true,
    baseURL: 'https://hope52411.tech',
  },
  fullyParallel: false,
  reporter: [['html']],
});
