import { ICustomWorld } from './custom-world';
import { config } from './config';
import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  request,
} from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import fs from 'fs-extra';
let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;

declare global {
  // eslint-disable-next-line no-var
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setDefaultTimeout(process.env.PWDEBUG ? -1 : 120000 * 1000);

BeforeAll(async function () {
  switch (config.browser) {
    case 'firefox':
      browser = await firefox.launch(config.browserOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
});

Before({ tags: '@ignore' }, async function () {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');

  // Check if the scenario includes the @api tag
  const isApiTest = pickle.tags.some((tag) => tag.name === '@api');

  // If it's not an API test, create the browser context
  if (!isApiTest) {
    this.context = await browser.newContext({
      acceptDownloads: true,
      recordVideo: { dir: 'screenshots' },
      viewport: { width: 1200, height: 800 },
    });

    await this.context.tracing.start({ screenshots: true, snapshots: true });
    this.page = await this.context.newPage();
  }

  // Create the request context for all scenarios
  this.server = await request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: process.env.RESO_BASE_URL,
  });
});

After(async function (
  this: ICustomWorld,
  { result, pickle }: ITestCaseHookParameter,
) {
  if (!result) return;
  // Check if scenario contains the @api tag and skip execution if it does
  if (pickle.tags.find((tag) => tag.name === '@api')) return;
  if (result.status === Status.PASSED) {
    if (!this.page || !this.context) return;

    const image = await this.page.screenshot();
    if (image) this.attach(image, 'image/png');
    await Promise.all([this.page?.close(), this.context?.close()]);

    const videoPath = await this.page.video()?.path();
    if (videoPath && !pickle.tags.find((tag) => tag.name === '@api')) {
      const videoBuffer = fs.readFileSync(videoPath);
      this.attach(videoBuffer, 'video/webm');
    }
  }
});

AfterAll(async function () {
  await browser.close();
});

BeforeAll(async function () {
  await fs.emptyDir('screenshots');
});
