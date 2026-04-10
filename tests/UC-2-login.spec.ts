import { test, expect } from '@playwright/test';

const baseURL = 'https://hope52411.tech';
const loginUrl = `${baseURL}/`;

const validUser = {
  loginName: '123',
  password: '123123',
};

test.describe('UC-2 Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
  });

  test('Normal Flow: successful login', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(validUser.loginName);
    await page.getByPlaceholder('Password').fill(validUser.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/.*\/home/);
    await expect(page.locator('.el-message__content')).toContainText(`Welcome to home page`);
  });

  test('Alternate Flow A1: incorrect password', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(validUser.loginName);
    await page.getByPlaceholder('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.el-message__content')).toContainText('Incorrect password');
  });

  test('Alternate Flow A2: user does not exist', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('nonexistent_user');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.el-message__content')).toContainText('User not found');
  });
});
