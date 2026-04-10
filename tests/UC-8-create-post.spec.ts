import { test, expect } from '@playwright/test';

const testContent = 'Automated test post at 2025-05-03 20:52:10';

test.describe('UC-8 Create Post', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://hope52411.tech');
    await page.getByPlaceholder('Username').fill('Test');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/home');
    await page.getByRole('link', { name: 'Community' }).click();
    await expect(page).toHaveURL(/.*\/home\/community/);
  });

  test('Normal Flow: Create and delete post', async ({ page }) => {
    await page.locator('textarea').fill(testContent);
    await page.getByRole('button', { name: 'Publish' }).click();

    await expect(page.getByText(testContent)).toBeVisible();

    const postCard = page.locator('.post-card', { hasText: testContent });

    const deleteButton = postCard.getByRole('button', { name: 'Delete' });
    await deleteButton.click();

    await expect(page.getByText(testContent)).not.toBeVisible();
  });
});
