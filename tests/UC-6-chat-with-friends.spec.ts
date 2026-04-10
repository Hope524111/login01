// tests/UC-6-chat-with-friends.spec.ts
import { test, expect } from '@playwright/test';

test.describe('UC-6 Chat with Friends', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://hope52411.tech');
    await page.getByPlaceholder('Username').fill('Test');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/home');
    await page.getByRole('link', { name: 'Friends' }).click();
    await expect(page).toHaveURL(/\/friends$/);
  });

  test('Normal Flow: Open chat popup and send message to a friend', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Your Friends:/ })).toBeVisible();

    const chatButtons = await page.getByRole('button', { name: /💬 Chat/ }).all();
    expect(chatButtons.length).toBeGreaterThan(0);
    await chatButtons[0].click();

    const popup = page.locator('.chat-popup');
    await expect(popup).toBeVisible();
    await popup.getByPlaceholder('Type a message...').fill('Hi there!');
    await popup.getByRole('button', { name: 'Send' }).click();

    await expect(popup.locator('.sent').last()).toContainText('Hi there!');
  });
});
