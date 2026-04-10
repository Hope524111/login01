import { test, expect } from '@playwright/test';

test.describe('UC-7 Use Fitness Tools', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://hope52411.tech');
    await page.getByPlaceholder('Username').fill('Test');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/home');
  });

  test('Normal Flow: Navigate to BMI Calculator via Tools', async ({ page }) => {
    await page.getByRole('link', { name: 'Tools' }).click();
    await page.waitForURL('**/tools');

    await page.getByText('📏').click(); // Click BMI Calculator
    await expect(page).toHaveURL(/\/home\/tools\/bmi$/);

    await expect(page.getByRole('heading', { name: 'BMI Calculator' })).toBeVisible();
  });
});
