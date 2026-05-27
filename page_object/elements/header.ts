import { Locator, Page } from '@playwright/test';
import { Menu } from './menu';

export class Header {
  readonly headerContainer: Locator;
  readonly appLogo: Locator;
  readonly menu: Menu;

  constructor(page: Page) {
    this.headerContainer = page.locator('.container');
    this.appLogo = this.headerContainer.locator('.navbar-brand');
    this.menu = new Menu(page);
  }
}
