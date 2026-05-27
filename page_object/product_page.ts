import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base_page';
import { FavouriteProduct } from '../types/type';

export class ProductPage extends BasePage {
  readonly productName: Locator;
  readonly price: Locator;
  readonly co2raiting: Locator;
  readonly productDescription: Locator;
  readonly inputQantityContainer: Locator;
  readonly quantityInput: Locator;
  readonly increaseQuantityButton: Locator;
  readonly decreaseQuantityButton: Locator;
  readonly addToCartButton: Locator;
  readonly addToFavouritesButton: Locator;
  readonly compareButton: Locator;
  readonly specificationSection: Locator;
  readonly specificationTitle: Locator;
  readonly toastContainer: Locator;
  readonly outOfStockLabel: Locator;
  readonly favouriteConfirm: Locator;
  readonly favouriteError: Locator;

  constructor(page: Page, productID: string) {
    super(page, `https://practicesoftwaretesting.com/product/${productID}`);
    this.productName = page.locator('[data-test="product-name"]');
    this.price = page.locator('[data-test="unit-price"]');
    this.co2raiting = page.locator('[data-test="co2-rating-badge"]');
    this.productDescription = page.locator('[data-test="product-description"]');
    this.inputQantityContainer = page.locator('.input-group.quantity');
    this.quantityInput = this.inputQantityContainer.locator('[data-test="quantity"]');
    this.increaseQuantityButton = this.inputQantityContainer.locator('[data-test="increase-quantity"]');
    this.decreaseQuantityButton = this.inputQantityContainer.locator('[data-test="decrease-quantity"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.addToFavouritesButton = page.locator('[data-test="add-to-favorites"]');
    this.compareButton = page.locator('[data-test="add-to-compare"]');
    this.specificationSection = page.locator('.col-12');
    this.specificationTitle = this.specificationSection.locator('[data-test="specs-title"]');
    this.toastContainer = this.page.locator('#toast-container');
    this.outOfStockLabel = this.page.locator('[data-test="out-of-stock"]');
    this.favouriteError = page.locator('[role="alert"]');
    this.favouriteConfirm = page.locator('[role="alert"]');
  }

  async waitForPageLoaded() {
    await expect(this.productName).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  async getSessionStorageCompareIDs() {
    const compareIDs = await this.page.evaluate(() => {
      return sessionStorage.getItem('compare_ids');
    });
    return compareIDs;
  }

  async setSessionStorageCompareIDs(productID: string) {
    await this.page.evaluate(id => {
      const key = 'compare_ids';
      const existingValues = JSON.parse(sessionStorage.getItem(key) || '[]');
      if (!existingValues.includes(id)) {
        existingValues.push(id);
      }
      sessionStorage.setItem(key, JSON.stringify(existingValues));
    }, productID);
  }

  async getSessionStorageCartQuantity() {
    const cartQuantity = await this.page.evaluate(() => {
      return sessionStorage.getItem('cart_quantity');
    });
    return cartQuantity;
  }

  async expectProductInFavorites(favouriteProducts: FavouriteProduct[], productID: string) {
    const allFavoritesProductsIDs = favouriteProducts.map(el => el.product_id);
    expect(allFavoritesProductsIDs).toContain(productID);
  }
}
