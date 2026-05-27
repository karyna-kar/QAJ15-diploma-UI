import { expect } from '@playwright/test';
import { test } from '../fixtures/custome-fixtures';

test.describe('Product page - In Stock product', async () => {
  let randomProduct: any;
  let productID: string;
  let productPage: any;

  test.beforeAll(async ({ productService }) => {
    let allProducts = await productService.getAllProducts();
    randomProduct = await productService.getRandomProduct(allProducts);
    productID = randomProduct.id;
  });

  test.beforeEach(async ({ practiceSoftwareTestingAuth, favouritesService }) => {
    productPage = practiceSoftwareTestingAuth.createProductPage(productID);
    await productPage.navigate();
    await productPage.waitForPageLoaded();
    //clear SessionStorageCompareIDs
    await productPage.page.evaluate(() => {
      sessionStorage.clear();
    });
    //clear favourite list
    await favouritesService.cleanFavoritesList();
  });

  test('Verify header', async () => {
    await expect(productPage.header.appLogo).toBeVisible();
    await expect(productPage.header.menu.menuContainer).toBeVisible();
  });

  test('Verify footer', async () => {
    await expect(productPage.footer.gitHubRepoLink).toHaveAttribute('href', 'https://github.com/testsmith-io/practice-software-testing');
    await expect(productPage.footer.privacyPolicyLink).toHaveAttribute('href', '/privacy');
    await expect(productPage.footer.barnImagesLink).toHaveAttribute('href', 'https://unsplash.com/@barnimages');
    await expect(productPage.footer.unsplashLink).toHaveAttribute('href', 'https://unsplash.com/photos/t5YUoHW6zRo');
  });

  test('Verify page title', async () => {
    const title = await productPage.getTitle();
    expect(title).toBe(randomProduct.name + ' - Practice Software Testing - Toolshop - v5.0');
  });

  test('Verify page elements', async () => {
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.productName).toHaveText(randomProduct.name);
    await expect(productPage.price).toBeVisible();
    await expect(productPage.price).toHaveText(randomProduct.price.toString());
    await expect(productPage.co2raiting).toBeVisible();
    //можно проверить какой выделяется
    await expect(productPage.productDescription).toBeVisible();
    await expect(productPage.productDescription).toHaveText(randomProduct.description);
    await expect(productPage.inputQantityContainer).toBeVisible();
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavouritesButton).toBeVisible();
    await expect(productPage.addToFavouritesButton).toBeEnabled();
    await expect(productPage.compareButton).toBeVisible();
    await expect(productPage.compareButton).toBeEnabled();
    await expect(productPage.specificationSection).toBeVisible();
    await expect(productPage.specificationTitle).toHaveText('Specifications');
  });

  test('Verify adding product to favourites', async ({ favouritesService }) => {
    await productPage.addToFavouritesButton.click();
    await expect(productPage.favouriteConfirm).toBeVisible();
    await expect(productPage.favouriteConfirm).toHaveText('Product added to your favorites list.');
    const allFavoritesProducts = await favouritesService.getAllFavoritesProducts();
    await productPage.expectProductInFavorites(allFavoritesProducts, productID);
  });

  test('Verify double adding product to favourites', async ({ favouritesService }) => {
    await favouritesService.addToFavoritesList(productID);
    await productPage.addToFavouritesButton.click();
    await expect(productPage.toastContainer).toBeVisible();
    await expect(productPage.favouriteError).toHaveText('Product already in your favorites list.');
  });

  test('Verify adding product to compare', async () => {
    await expect(productPage.compareButton).toHaveAttribute('class', 'btn btn-outline-primary');
    await productPage.compareButton.click();
    await expect(productPage.compareButton).toHaveAttribute('class', 'btn btn-primary');
    const compare_IDs = await productPage.getSessionStorageCompareIDs();
    expect(compare_IDs).toContain(productID);
  });

  test('Verify removing product from compare', async () => {
    //add compare
    await expect(productPage.compareButton).toHaveAttribute('class', 'btn btn-outline-primary');
    await productPage.compareButton.click();
    await expect(productPage.compareButton).toHaveAttribute('class', 'btn btn-primary');
    let compare_IDs = await productPage.getSessionStorageCompareIDs();
    expect(compare_IDs).toContain(productID);
    //remove compare
    await productPage.compareButton.click();
    await expect(productPage.compareButton).toHaveAttribute('class', 'btn btn-outline-primary');
    compare_IDs = await productPage.getSessionStorageCompareIDs();
    expect(compare_IDs).not.toContain(productID);
  });
});

test.describe('Product page - In Stock product', async () => {
  let inStockProductID: string;
  let productPage: any;

  test.beforeAll(async ({ productService }) => {
    let allProducts = await productService.getAllProducts();
    let allInOfStockProducts = await productService.filterInStockProducts(allProducts, true);
    inStockProductID = (await productService.getRandomProductIDs(allInOfStockProducts))[0];
  });

  test.beforeEach(async ({ practiceSoftwareTestingAuth }) => {
    productPage = practiceSoftwareTestingAuth.createProductPage(inStockProductID);
    await productPage.navigate();
    await productPage.waitForPageLoaded();
  });

  test('In Stock product: Verify specific elements', async () => {
    await expect(productPage.inputQantityContainer).toBeVisible();
    await expect(productPage.quantityInput).toBeEnabled();
    await expect(productPage.increaseQuantityButton).toBeEnabled();
    await expect(productPage.decreaseQuantityButton).toBeEnabled();
    await expect(productPage.addToFavouritesButton).toBeVisible();
    await expect(productPage.addToFavouritesButton).toBeEnabled();
    await expect(productPage.compareButton).toBeVisible();
    await expect(productPage.compareButton).toBeEnabled();
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToCartButton).toBeEnabled();
  });

  test('Verify adding one product to cart', async () => {
    await productPage.addToCartButton.click();
    const currentCartQuantity = Number(await productPage.getSessionStorageCartQuantity());
    await expect(productPage.toastContainer).toBeVisible();
    await expect(productPage.toastContainer).toHaveText('Product added to shopping cart.');
    const updatedCartQuantity = Number(await productPage.getSessionStorageCartQuantity());
    expect(updatedCartQuantity - currentCartQuantity === 1).toBe(true);
  });

  test('Verify two products to cart', async () => {
    await productPage.increaseQuantityButton.click();
    await productPage.addToCartButton.click();
    const currentCartQuantity = Number(await productPage.getSessionStorageCartQuantity());
    await expect(productPage.toastContainer).toBeVisible();
    await expect(productPage.toastContainer).toHaveText('Product added to shopping cart.');
    const updatedCartQuantity = Number(await productPage.getSessionStorageCartQuantity());
    expect(updatedCartQuantity - currentCartQuantity === 2).toBe(true);
  });
});

test.describe('Product page - Out of Stock product', async () => {
  let outOfStockProductID: string;
  let productPage: any;

  test.beforeAll(async ({ productService }) => {
    let allProducts = await productService.getAllProducts();
    let allOutOfStockProducts = await productService.filterInStockProducts(allProducts, false);
    outOfStockProductID = (await productService.getRandomProductIDs(allOutOfStockProducts))[0];
  });

  test.beforeEach(async ({ practiceSoftwareTestingAuth }) => {
    productPage = practiceSoftwareTestingAuth.createProductPage(outOfStockProductID);
    await productPage.navigate();
    await productPage.waitForPageLoaded();
  });

  test(`Out of Stock product: Verify specific elements`, async () => {
    await expect(productPage.inputQantityContainer).toBeVisible();
    await expect(productPage.quantityInput).toBeDisabled();
    await expect(productPage.increaseQuantityButton).toBeDisabled();
    await expect(productPage.decreaseQuantityButton).toBeDisabled();
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToCartButton).toBeDisabled();
    await expect(productPage.addToFavouritesButton).toBeVisible();
    await expect(productPage.addToFavouritesButton).toBeEnabled();
    await expect(productPage.compareButton).toBeVisible();
    await expect(productPage.compareButton).toBeEnabled();
    await expect(productPage.outOfStockLabel).toBeVisible();
  });
});
