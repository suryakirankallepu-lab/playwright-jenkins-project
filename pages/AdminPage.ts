
import { Page, expect } from '@playwright/test';

export class AdminPage {
  constructor(private page: Page) {}

  async verifySystemUsers() {
    await expect(
      this.page.getByRole('heading', { name: 'System Users' })
    ).toBeVisible();
  }

  async searchUser(username: string) {
    await this.page.locator('.oxd-input').first().fill(username);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async verifySearchResult(username: string) {
    await expect(
      this.page.locator('.oxd-table-body')
    ).toContainText(username);
  }
}
