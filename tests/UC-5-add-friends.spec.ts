import { test, expect } from '@playwright/test';

test.describe('UC-5 Add Friends', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://hope52411.tech');
    await page.getByPlaceholder('Username').fill('Test');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/home');
    await page.getByRole('link', { name: 'Friends' }).click();
    await page.waitForURL('**/friends');
  });

  test('Normal Flow: Search for existing user "Olivia"', async ({ page }) => {
    await page.getByPlaceholder('Enter username to search').fill('Olivia');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('heading', { name: 'Search Results:' })).toBeVisible();
    await expect(page.locator('li', { hasText: 'Olivia - q@w.com' })).toBeVisible();
  });

  test('Alternate Flow: Search for non-existent user "890"', async ({ page }) => {
    await page.getByPlaceholder('Enter username to search').fill('890');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('❌ The user was not found')).toBeVisible();
  });
});
