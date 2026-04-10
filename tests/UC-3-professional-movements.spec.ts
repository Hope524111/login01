import { test, expect } from '@playwright/test';

test.describe('UC-3 Obtain professional movements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://hope52411.tech');

    await page.getByPlaceholder('Username').fill('Test');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('**/home', { timeout: 15000 });
  });

  test('Normal Flow: Click forearm part and navigate to recommendations', async ({ page }) => {
    await page.waitForSelector('svg');

    await page.locator('path.body-part').evaluateAll((nodes) => {
      const target = nodes.find(node =>
        node.getAttribute('@click')?.includes("selectPart('forearm')")
        || node.outerHTML.includes("selectPart('forearm')")
        || node.getAttribute('d')?.startsWith('M629.69') 
      );
      if (target) {
        target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
    await expect(page).toHaveURL(/.*\/forearm/i);

    await expect(page.getByText(/The forearm is a crucial muscle group/i)).toBeVisible();
  });
});
