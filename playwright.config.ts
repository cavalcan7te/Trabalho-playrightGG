import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. */
  reporter: 'html',

  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'https://studylab.free.laravel.cloud/',
    
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
  },

  /* Configure projects */
  projects: [
    // 1. Setup da autenticação
    { 
      name: 'setup', 
      testMatch: /.*\.setup\.ts/ 
    },

    // 2. Testes principais que utilizam a sessão salva
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json', 
      },
      dependencies: ['setup'], // Garante que o setup rode antes
    },
  ],
});