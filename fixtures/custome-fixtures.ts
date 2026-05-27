import { test as baseTest, Page } from '@playwright/test';
import { PageFactory } from '../page_object/page_factory';
import { RestfulController } from '../controllers/controller';
import 'dotenv/config';
import { existsSync } from 'fs';
import { AuthHelper } from '../helpers/authHelper';
import { ProductService } from '../services/product_service';
import { FavouritesService } from '../services/favourites_service';
import { CartService } from '../services/cart_service';

interface ExtendedFicture {
  practiceSoftwareTesting: PageFactory;
  practiceSoftwareTestingAuth: PageFactory;
  restfulController: RestfulController;
  authorizedUser: Page;
  productService: ProductService;
  favouritesService: FavouritesService;
  cartService: CartService;
}
export const test = baseTest.extend<ExtendedFicture>({
  practiceSoftwareTesting: async ({ page }, use) => {
    const myFactory = new PageFactory(page);
    await use(myFactory);
  },

  practiceSoftwareTestingAuth: async ({ browser }, use) => {
    const email = process.env.TEST_EMAIL as string;
    const password = process.env.TEST_PASSWORD as string;
    const filePath = '.auth/loggedin-user-state.json';

    const shouldRelogin = !existsSync(filePath) || AuthHelper.isTokenExpired(filePath);

    if (shouldRelogin) {
      const page = await browser.newPage();
      await page.goto('https://practicesoftwaretesting.com/auth/login');
      await page.locator('[data-test="email"]').fill(email);
      await page.locator('[data-test="password"]').fill(password);
      await page.locator('[data-test="login-submit"]').click();
      await page.waitForURL('**/account');
      await page.context().storageState({ path: filePath });
    }
    const context = await browser.newContext({
      storageState: '.auth/loggedin-user-state.json'
    });
    const page = await context.newPage();
    const myFactory = new PageFactory(page);
    await use(myFactory);
  },
  restfulController: async ({ request }, use) => {
    const baseURL = 'https://api.practicesoftwaretesting.com';
    const controller = new RestfulController(request, baseURL);
    await use(controller);
  },
  productService: async ({ restfulController }, use) => {
    const service = new ProductService(restfulController);
    await use(service);
  },
  favouritesService: async ({ restfulController }, use) => {
    const service = new FavouritesService(restfulController);
    await use(service);
  },
  cartService: async ({ restfulController }, use) => {
    const service = new CartService(restfulController);
    await use(service);
  }
});
