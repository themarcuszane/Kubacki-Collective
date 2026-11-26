import { defineConfig } from '@playwright/test';
import config from './playwright.config';

// Runs the public browser suite against the deployed site. No local server is started.
export default defineConfig({
  ...config,
  reporter: [['list'], ['json', { outputFile: 'test-results/live-tests.json' }]],
  outputDir: 'test-results/live',
  use: { ...config.use, baseURL: 'https://kubackicollective.com' },
  webServer: undefined,
});
