import { Page } from '@playwright/test';
import { Footer } from './elements/footer';
import { Header } from './elements/header';

export class BasePage {
  readonly page: Page;
  readonly url: string;
  readonly footer: Footer;
  readonly header: Header;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
    this.footer = new Footer(page);
    this.header = new Header(page);
  }
  async navigate() {
    if (!this.url) {
      throw new Error('URL is not defined');
    }
    await this.page.goto(this.url);
  }

  async getTitle() {
    const title = this.page.title();
    return title;
  }
}
