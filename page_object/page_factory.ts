import { Page } from '@playwright/test';
import { HomePage } from './home_page';
import { LoginPage } from './login_page';
import { ProductPage } from './product_page';
import { CartPage } from './cart_page';
import { ContactPage } from './contact_page';

export class PageFactory {
  readonly homePage: HomePage;
  readonly loginPage: LoginPage;
  readonly checkoutPage: CartPage;
  readonly contactPage: ContactPage;
  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.checkoutPage = new CartPage(page);
    this.contactPage = new ContactPage(page);
  }

  createProductPage(productID: string) {
    return new ProductPage(this.page, productID);
  }
}
