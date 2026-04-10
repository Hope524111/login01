import { test, expect } from '@playwright/test';

test.describe('UC-4 Chat with AI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://hope52411.tech');
    await page.getByPlaceholder('Username').fill('Test');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/home');
  });

  test('Normal Flow: User sends message and receives AI response', async ({ page }) => {
    await page.goto('https://hope52411.tech/home/fitness-planner');

    await page.locator('.chat-input').fill('Give me a fitness plan');
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.locator('.message-assistant')).toHaveCount(1, { timeout: 10000 });
    await expect(page.locator('.message-assistant').first()).toContainText('plan', { timeout: 10000 });
  });
});
