
import { Page, expect } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async verifyDashboard() {
    await expect(
      this.page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
  }

  async goToAdmin() {
    await this.page.getByRole('link', { name: 'Admin' }).click();
  }
}
