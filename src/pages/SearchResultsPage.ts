import { Locator } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';
import AbstractPage from './AbstractPage';
import ShareWithModal from './model/ShareWithModal';

export default class SearchResultsPage extends AbstractPage {
  readonly loader: Locator;

  readonly searchResults: Locator;
  readonly shareButtons: Locator;
  readonly shareWith: ShareWithModal;

  constructor(world: ICustomWorld) {
    super(world);
    this.shareWith = new ShareWithModal(this.page);
    this.loader = this.page.locator('//div[@class="nuxt-loading-indicator"]');
    this.searchResults = this.page.locator(
      '//div[@id="hg-search-results"]//h6',
    );
    this.shareButtons = this.page.locator(
      '//button[contains(@class,"gap-2 text-gray-900")][3]',
    );
  }
}
