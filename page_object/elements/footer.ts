import { Locator, Page } from '@playwright/test';

export class Footer {
  readonly footerContainer: Locator;
  readonly gitHubRepoLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly barnImagesLink: Locator;
  readonly unsplashLink: Locator;
  constructor(page: Page) {
    this.footerContainer = page.locator('app-footer');
    this.gitHubRepoLink = this.footerContainer.getByRole('link', { name: 'GitHub repo' });
    this.privacyPolicyLink = this.footerContainer.getByRole('link', { name: 'Privacy Policy' });
    this.barnImagesLink = this.footerContainer.getByRole('link', { name: 'Barn Images' });
    this.unsplashLink = this.footerContainer.getByRole('link', { name: 'Unsplash' });
  }
}
