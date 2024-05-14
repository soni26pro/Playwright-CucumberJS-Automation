import { Locator } from '@playwright/test';
import AbstractPage from './AbstractPage';
import { ICustomWorld } from 'src/support/custom-world';

export default class HomePage extends AbstractPage {
  readonly searchInput: Locator;
  readonly searchIcon: Locator;

  constructor(world: ICustomWorld) {
    super(world);

    this.searchInput = this.page.locator('(//input[@id="searchField"])[1]');

    this.searchIcon = this.page.locator(
      '(//span[contains(@class,"!leading-none icon-search")])[1]',
    );
  }

  async searchFor(queryParam: string) {
    await this.searchInput.fill(queryParam);
    await this.searchIcon.click();
  }
}
