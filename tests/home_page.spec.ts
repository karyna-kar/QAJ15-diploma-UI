import { expect } from '@playwright/test';
import { test } from '../fixtures/custome-fixtures';

test.describe('Home page', async () => {
  test.beforeEach(async ({ practiceSoftwareTestingAuth }) => {
    await practiceSoftwareTestingAuth.homePage.navigate();
  });

  test('Verify title', async ({ practiceSoftwareTestingAuth }) => {
    const title = await practiceSoftwareTestingAuth.homePage.getTitle();
    expect(title).toBe('Practice Software Testing - Toolshop - v5.0');
  });

  test('Verify banner image', async ({ practiceSoftwareTestingAuth }) => {
    await expect(practiceSoftwareTestingAuth.homePage.banner).toHaveScreenshot();
  });

  test('Verify header', async ({ practiceSoftwareTestingAuth }) => {
    await expect(practiceSoftwareTestingAuth.homePage.header.appLogo).toBeVisible();
    await expect(practiceSoftwareTestingAuth.homePage.header.menu.menuContainer).toBeVisible();
  });

  test('Verify footer', async ({ practiceSoftwareTestingAuth }) => {
    await expect(practiceSoftwareTestingAuth.homePage.footer.gitHubRepoLink).toHaveAttribute(
      'href',
      'https://github.com/testsmith-io/practice-software-testing'
    );
    await expect(practiceSoftwareTestingAuth.homePage.footer.privacyPolicyLink).toHaveAttribute('href', '/privacy');
    await expect(practiceSoftwareTestingAuth.homePage.footer.barnImagesLink).toHaveAttribute('href', 'https://unsplash.com/@barnimages');
    await expect(practiceSoftwareTestingAuth.homePage.footer.unsplashLink).toHaveAttribute('href', 'https://unsplash.com/photos/t5YUoHW6zRo');
  });

  test('Verify number of items', async ({ practiceSoftwareTestingAuth }) => {
    await expect(practiceSoftwareTestingAuth.homePage.items).toHaveCount(9);
  });

  test('Verify opening product page', async ({ practiceSoftwareTestingAuth }) => {
    const randomProductID = await practiceSoftwareTestingAuth.homePage.getRandomProductID();
    await practiceSoftwareTestingAuth.homePage.openProductPage(randomProductID);
    await expect(practiceSoftwareTestingAuth.homePage.page).toHaveURL(`https://practicesoftwaretesting.com/product/${randomProductID}`);
  });
});
