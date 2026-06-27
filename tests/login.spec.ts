
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
import { loginData } from '../data/loginData';

for (const data of loginData) {

  test(`OrangeHRM Login Test - ${data.expected}`, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const adminPage = new AdminPage(page);

    await loginPage.goto();
    await loginPage.login(data.username, data.password);

    if (data.expected === 'success') {

      // Dashboard validation
      await dashboardPage.verifyDashboard();

      // Navigate to Admin
      await dashboardPage.goToAdmin();

      // Admin page validation
      await adminPage.verifySystemUsers();

      // Search user
      await adminPage.searchUser('Admin');

      // Validate result
      await adminPage.verifySearchResult('Admin');

    } else {

      // Error validation
      await expect(
        page.getByText('Invalid credentials')
      ).toBeVisible();
    }

  });
}
