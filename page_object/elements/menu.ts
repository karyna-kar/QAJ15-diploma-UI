import { Locator, Page } from '@playwright/test';
import { Categories } from './categories';

export class Menu {
  readonly menuContainer: Locator;
  readonly homeButton: Locator;
  readonly categoriesButton: Categories;
  readonly contactButton: Locator;
  readonly signInButton: Locator;
  readonly cartButton: Locator;
  readonly languageDropDown: Locator;
  constructor(page: Page) {
    this.menuContainer = page.locator('[aria-label="Main menu"]');
    this.homeButton = this.menuContainer.locator('[data-test="nav-home"]');
    this.categoriesButton = new Categories(page);
    this.contactButton = this.menuContainer.locator('[data-test="nav-contact"]');
    this.signInButton = this.menuContainer.locator('[data-test="nav-sign-in"]');
    this.cartButton = this.menuContainer.locator('[data-test="nav-cart"]');
    this.languageDropDown = this.menuContainer.locator('data-test="language-select"');
  }
}
