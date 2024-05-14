import {} from '@playwright/test';
import { Locator, Page } from 'playwright';

export default class ShareWithModal {
  private page: Page;
  readonly wrapper: Locator;
  readonly copyButton: Locator;
  readonly shareOnFaceBook: Locator;
  readonly shareOnTwitter: Locator;
  readonly shareOnLinkedIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wrapper = this.page.locator(
      '//div[contains(@class,"max-md:h-full relative")]',
    );
    this.copyButton = this.page.locator('//input[@id="copyInput"]');
    this.shareOnFaceBook = this.page.locator(
      '//div[text()=" Share On Facebook "]',
    );
    this.shareOnTwitter = this.page.locator(
      '//div[text()=" Share On Twitter "]',
    );
    this.shareOnLinkedIn = this.page.locator(
      '//div[text()=" Share On LinkedIn "]',
    );
  }
}
