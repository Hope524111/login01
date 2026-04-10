import { test, expect } from '@playwright/test';

test.describe('UC-11 Log out', () => {
  test('Normal Flow: Click Logout and return to login page', async ({ page }) => {

    await page.goto('https://hope52411.tech');
    await page.getByPlaceholder('Username').fill('Test');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('**/home');

    await page.getByRole('button', { name: 'Logout' }).click();

    await page.waitForURL('**/');

    await expect(page.getByPlaceholder('Username')).toBeVisible();
  });
});
