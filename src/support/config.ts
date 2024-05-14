import { LaunchOptions } from '@playwright/test';

// Load environment variables from .env file
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `./config/.env.${process.env.ENV}`,
  override: true,
});
// Define a configuration class
class Config {
  public readonly browser: string;
  public readonly browserOptions: LaunchOptions;

  constructor() {
    // Determine the value of headless from the environment variable
    const headless = process.env.HEADLESS !== 'false';

    this.browser = process.env.BROWSER || 'chromium';
    this.browserOptions = {
      slowMo: 0,
      headless,
      args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
      firefoxUserPrefs: {
        'media.navigator.streams.fake': true,
        'media.navigator.permission.disabled': true,
      },
    };
  }
}

// Create an instance of the configuration
export const config = new Config();
