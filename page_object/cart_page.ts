import { Locator, Page } from '@playwright/test';
import { BasePage } from './base_page';

export class CartPage extends BasePage {
  readonly emptyCartText: Locator;

  constructor(page: Page) {
    super(page, 'https://practicesoftwaretesting.com/checkout');
    this.emptyCartText = page.locator('.ng-star-inserted');
  }

  async getSessionStorageCartID(): Promise<string> {
    const cartID = await this.page.evaluate(() => {
      return sessionStorage.getItem('cart_id');
    });
    if (!cartID) {
      throw new Error('cart_id not found in sessionStorage');
    }
    return cartID;
  }
}
