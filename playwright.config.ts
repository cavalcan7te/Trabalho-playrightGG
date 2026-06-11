import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 1200000, // 2 minutos

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',

    // Timeout para ações (click, fill, etc.)
    actionTimeout: 3000000,

    // Timeout para navegação
    navigationTimeout: 6000000,
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});