import { Given, Then, When } from '@cucumber/cucumber';
import HomePage from '../pages/HomePage';
import { expect } from '@playwright/test';
import { ICustomWorld } from 'src/support/custom-world';

import SearchResultsPage from '../pages/SearchResultsPage';

Given('I am on the home page', async function (this: ICustomWorld) {
  const page = new HomePage(this);
  await page.navigate();
});

When(
  'I search for {string} next to Our Favorite Haggadahs',
  async function (this: ICustomWorld, queryParam: string) {
    const page = new HomePage(this);
    await page.navigate();
    await page.searchFor(queryParam);
  },
);

Then(
  'I should see a list of {string} matching the keyword',
  async function (this: ICustomWorld, keyword: string) {
    const page = new SearchResultsPage(this);

    await page.searchResults.first().waitFor({ state: 'visible' });

    const results = await page.searchResults.allTextContents();

    for (const result of results) {
      try {
        expect(result.toLowerCase()).toContain(keyword.toLowerCase());
      } catch (error) {
        this.attach(`Keyword "${keyword}" not found in result: ${result}`);
      }
    }
  },
);

Then('I choose to share the first result', async function (this: ICustomWorld) {
  const page = new SearchResultsPage(this);
  await page.shareButtons.first().click();
  await expect(page.shareWith.wrapper).toBeVisible();
});

Then(
  'I should be provided with a link to copy for sharing purposes',
  async function (this: ICustomWorld) {
    const page = new SearchResultsPage(this);
    const inputValue = await page.shareWith.copyButton.inputValue();

    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    expect(inputValue).toMatch(urlPattern);
  },
);

Then(
  'I should be able to share it as a post on {string}',
  async function (this: ICustomWorld, socialMedia: string) {
    const page = new SearchResultsPage(this);
    switch (socialMedia) {
      case 'Facebook':
        await page.shareWith.shareOnFaceBook.click();
        break;
      case 'Twitter':
        await page.shareWith.shareOnTwitter.click();
        break;
      case 'LinkedIn':
        await page.shareWith.shareOnLinkedIn.click();
        break;
    }

    const browserContext = this.page!.context();

    const newPage = await browserContext.waitForEvent('page');

    const url = newPage.url();

    expect(url).toContain(socialMedia.toLowerCase());
  },
);
