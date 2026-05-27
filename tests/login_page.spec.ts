import { expect } from '@playwright/test';
import { test } from '../fixtures/custome-fixtures';
import 'dotenv/config';

test.describe('Login page', async () => {
  test.beforeEach(async ({ practiceSoftwareTesting }) => {
    await practiceSoftwareTesting.loginPage.navigate();
  });

  test('Verify header', async ({ practiceSoftwareTesting }) => {
    await expect(practiceSoftwareTesting.homePage.header.appLogo).toBeVisible();
    await expect(practiceSoftwareTesting.homePage.header.menu.menuContainer).toBeVisible();
  });

  test('Verify footer', async ({ practiceSoftwareTesting }) => {
    await expect(practiceSoftwareTesting.homePage.footer.gitHubRepoLink).toHaveAttribute(
      'href',
      'https://github.com/testsmith-io/practice-software-testing'
    );
    await expect(practiceSoftwareTesting.homePage.footer.privacyPolicyLink).toHaveAttribute('href', '/privacy');
    await expect(practiceSoftwareTesting.homePage.footer.barnImagesLink).toHaveAttribute('href', 'https://unsplash.com/@barnimages');
    await expect(practiceSoftwareTesting.homePage.footer.unsplashLink).toHaveAttribute('href', 'https://unsplash.com/photos/t5YUoHW6zRo');
  });

  test('Verify elements', async ({ practiceSoftwareTesting }) => {
    await expect(practiceSoftwareTesting.loginPage.pageHeader).toHaveText('Login');
    await expect(practiceSoftwareTesting.loginPage.siginGoogleButton).toHaveText('Sign in with Google');
    await expect(practiceSoftwareTesting.loginPage.emailInput).toHaveAttribute('placeholder', 'Your email');
    await expect(practiceSoftwareTesting.loginPage.passwordInput).toHaveAttribute('placeholder', 'Your password');
    await expect(practiceSoftwareTesting.loginPage.registerAccountLink).toHaveText('Register your account');
    await expect(practiceSoftwareTesting.loginPage.registerAccountLink).toHaveAttribute('href', '/auth/register');
    await expect(practiceSoftwareTesting.loginPage.forgotPasswordLink).toHaveText('Forgot your Password?');
    await expect(practiceSoftwareTesting.loginPage.forgotPasswordLink).toHaveAttribute('href', '/auth/forgot-password');
  });

  test('Verify mandatory inputs: Email', async ({ practiceSoftwareTesting }) => {
    await practiceSoftwareTesting.loginPage.passwordInput.fill('test');
    await practiceSoftwareTesting.loginPage.loginButton.click();
    await expect(practiceSoftwareTesting.loginPage.emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(practiceSoftwareTesting.loginPage.emailError).toBeVisible();
    await expect(practiceSoftwareTesting.loginPage.emailError).toHaveText('Email is required');
  });

  test('Verify mandatory inputs: Password', async ({ practiceSoftwareTesting }) => {
    await practiceSoftwareTesting.loginPage.emailInput.fill('test@test.com');
    await practiceSoftwareTesting.loginPage.loginButton.click();
    await expect(practiceSoftwareTesting.loginPage.passwordInput).toHaveAttribute('aria-invalid', 'true');
    await expect(practiceSoftwareTesting.loginPage.passwordError).toBeVisible();
    await expect(practiceSoftwareTesting.loginPage.passwordError).toHaveText('Password is required');
  });

  test('Verify Email format', async ({ practiceSoftwareTesting }) => {
    await practiceSoftwareTesting.loginPage.emailInput.fill('test');
    await practiceSoftwareTesting.loginPage.loginButton.click();
    await expect(practiceSoftwareTesting.loginPage.emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(practiceSoftwareTesting.loginPage.emailError).toBeVisible();
    await expect(practiceSoftwareTesting.loginPage.emailError).toHaveText('Email format is invalid');
  });

  test('Verify login with invalid credentials', async ({ practiceSoftwareTesting }) => {
    await practiceSoftwareTesting.loginPage.emailInput.fill('test@test.com');
    await practiceSoftwareTesting.loginPage.passwordInput.fill('test');
    await practiceSoftwareTesting.loginPage.loginButton.click();
    await expect(practiceSoftwareTesting.loginPage.loginError).toBeVisible();
    await expect(practiceSoftwareTesting.loginPage.loginError).toHaveText('Invalid email or password');
  });

  test('Verify login with valid credentials', async ({ page, practiceSoftwareTesting }) => {
    const email = process.env.TEST_EMAIL as string;
    const password = process.env.TEST_PASSWORD as string;
    await practiceSoftwareTesting.loginPage.emailInput.fill(email);
    await practiceSoftwareTesting.loginPage.passwordInput.fill(password);
    await practiceSoftwareTesting.loginPage.loginButton.click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  });

  test('Verify navigation to Register account page', async ({ page, practiceSoftwareTesting }) => {
    await practiceSoftwareTesting.loginPage.registerAccountLink.click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/register');
  });

  test('Verify navigation to Forgot Password page', async ({ page, practiceSoftwareTesting }) => {
    await practiceSoftwareTesting.loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/forgot-password');
  });
});
