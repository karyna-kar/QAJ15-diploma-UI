import { Locator, Page } from '@playwright/test';
import { BasePage } from './base_page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly loginError: Locator;
  readonly pageHeader: Locator;
  readonly siginGoogleButton: Locator;
  readonly registerAccountLink: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page, 'https://practicesoftwaretesting.com/auth/login');
    this.pageHeader = page.locator('h3');
    this.siginGoogleButton = page.locator('.google-sign-in-button');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
    this.emailError = page.locator('[data-test="email-error"]');
    this.passwordError = page.locator('[data-test="password-error"]');
    this.loginError = page.locator('[data-test="login-error"]');
    this.registerAccountLink = page.locator('[data-test="register-link"]');
    this.forgotPasswordLink = page.locator('[data-test="forgot-password-link"]');
  }
}
