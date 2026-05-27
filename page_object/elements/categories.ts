import { Locator, Page } from '@playwright/test';

export class Categories {
  readonly categoriesMenuContainer: Locator;
  readonly handTools: Locator;
  readonly powerTools: Locator;
  readonly other: Locator;
  readonly specialTools: Locator;
  readonly rentals: Locator;
  constructor(page: Page) {
    this.categoriesMenuContainer = page.locator('[data-test="nav-categories"]');
    this.handTools = this.categoriesMenuContainer.locator('[data-test="nav-hand-tools"]');
    this.powerTools = this.categoriesMenuContainer.locator('[data-test="nav-power-tools"]');
    this.other = this.categoriesMenuContainer.locator('[data-test="nav-sign-in"]');
    this.specialTools = this.categoriesMenuContainer.locator('[data-test="nav-special-tools"]');
    this.rentals = this.categoriesMenuContainer.locator('[data-test="nav-rentals"]');
  }
}
