import { Page } from 'playwright';
import { IPage } from '@/types/pages';
import { ICustomWorld } from 'src/support/custom-world';

export default class AbstractPage implements IPage {
  protected world: ICustomWorld;
  protected page: Page;

  constructor(world: ICustomWorld) {
    this.world = world;
    this.page = this.world.page!;
  }

  async navigate(path: string = '') {
    const baseUrl = process.env.BASE_URL || 'https://www.haggadot.com';
    const fullPath = path ? `${baseUrl}/${path}` : baseUrl;
    await this.page.goto(fullPath);
  }
}
