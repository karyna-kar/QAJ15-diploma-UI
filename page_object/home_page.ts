import { Page, Locator } from '@playwright/test';
import { BasePage } from './base_page';

export class HomePage extends BasePage {
  readonly items: Locator;
  readonly banner: Locator;

  constructor(page: Page) {
    super(page, 'https://practicesoftwaretesting.com/');
    this.items = page.locator('.card[data-test^="product-"]');
    this.banner = page.locator('[alt="Banner"]');
  }

  async getRandomProductID() {
    await this.items.first().waitFor({
      state: 'visible'
    });
    const count = await this.items.count();
    if (count === 0) {
      throw new Error('No products found on home page');
    }
    const randomIndex = Math.floor(Math.random() * count);
    const randomProduct = this.items.nth(randomIndex);
    const datatestValue = await randomProduct.getAttribute('data-test');
    if (!datatestValue) {
      throw new Error('data-test attribute not found');
    }
    const productId = datatestValue.replace('product-', '');
    return productId;
  }

  async openProductPage(productId: string) {
    const productCard = this.page.locator(`[data-test="product-${productId}"]`);
    await productCard.click();
  }
}
