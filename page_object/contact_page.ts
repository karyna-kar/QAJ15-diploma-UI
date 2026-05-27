import { Page } from '@playwright/test';
import { BasePage } from './base_page';

export class ContactPage extends BasePage {
  constructor(page: Page) {
    super(page, 'https://practicesoftwaretesting.com/contact');
  }
}
