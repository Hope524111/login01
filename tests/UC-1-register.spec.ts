import { test, expect, request } from '@playwright/test';

const baseURL = 'https://hope52411.tech/register';
const apiURL = 'https://api.hope52411.tech/sys-user';
const testUsername = 'playwright_user';

test.describe('UC-1 Register', () => {

  test('Normal Flow: successful registration', async ({ page }) => {
    await page.goto(baseURL);

    await page.getByPlaceholder('Username').fill(testUsername);
    await page.getByPlaceholder('Email').fill('test@example.com');
    await page.getByPlaceholder('Password').nth(0).fill('testpass');
    await page.getByPlaceholder('Confirm Password').fill('testpass');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('.el-message__content')).toHaveText('Registration successful!');
  });

  test('Alternate Flow A1: username already exists', async ({ page }) => {
    await page.goto(baseURL);

    await page.getByPlaceholder('Username').fill(testUsername);
    await page.getByPlaceholder('Email').fill('another@example.com');
    await page.getByPlaceholder('Password').nth(0).fill('testpass');
    await page.getByPlaceholder('Confirm Password').fill('testpass');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('.el-message__content')).toContainText('already taken');
  });

  test('Alternate Flow A2: passwords do not match', async ({ page }) => {
    await page.goto(baseURL);

    await page.getByPlaceholder('Username').fill('user_mismatch');
    await page.getByPlaceholder('Email').fill('mismatch@example.com');
    await page.getByPlaceholder('Password').nth(0).fill('123456');
    await page.getByPlaceholder('Confirm Password').fill('654321');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('.el-form-item__error')).toContainText('Passwords do not match!');
  });

  test('Alternate Flow A3: password too weak', async ({ page }) => {
    await page.goto(baseURL);

    await page.getByPlaceholder('Username').fill('user_weakpass');
    await page.getByPlaceholder('Email').fill('weak@example.com');
    await page.getByPlaceholder('Password').nth(0).fill('1');
    await page.getByPlaceholder('Confirm Password').fill('1');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('.el-form-item__error')).toContainText('Length should be between 6 and 12 characters');
  });

  test.afterAll(async () => {
    const reqContext = await request.newContext();
    const res = await reqContext.get(`${apiURL}/search?name=${testUsername}`);
    const users = await res.json();

    if (users.length > 0) {
      const userId = users[0].id;

      const delRes = await reqContext.delete(`${apiURL}/${userId}`);

      expect(delRes.status()).toBe(200);
    } else {
      console.log('⚠️ Test user not found, skipping delete');
    }

    await reqContext.dispose();
  });

});
