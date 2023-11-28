const { devices } = require('@playwright/test')

module.exports = {
  testDir: './playwright/tests',
  outputDir: './playwright/test-results',
  reporter: [['html', { outputFolder: './playwright/test-report' }]],
  fullyParallel: true,
  retries: 1,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  viewport: { width: 1280, height: 720 },
  timeout: 180000,

  use: {
    baseURL: process.env.SITE_URL || 'http://localhost:8001',
    trace: 'on-first-retry',
  },
}
