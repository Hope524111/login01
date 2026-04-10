import { test, expect } from '@playwright/test';
import axios from 'axios';

const baseURL = 'https://api.hope52411.tech';
const testUser = {
  loginName: 'Test',
  password: '123456',
  identity: 'User'
};

const testPost = {
  content: 'UC-9 test post'
};

const testComment = {
  content: 'UC-9 test comment'
};

let postId: number;


test.describe('UC-9 Comment on Post', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://hope52411.tech');
    await page.getByPlaceholder('Username').fill(testUser.loginName);
    await page.getByPlaceholder('Password').fill(testUser.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/home');

    await page.getByRole('link', { name: 'Community' }).click();
    await expect(page).toHaveURL(/.*\/community/);
  });

  test('Normal Flow: Create post, comment, then delete post', async ({ page }) => {
    await page.locator('textarea[placeholder*="Share your fitness experiences"]').fill(testPost.content);
    await page.getByRole('button', { name: 'Publish' }).click();

    await page.waitForTimeout(2000);

    const res = await axios.get(`${baseURL}/api/posts`, {
      params: { userName: testUser.loginName }
    });
    const posts = res.data;
    const latest = posts.find((p: any) => p.content === testPost.content);
    postId = latest?.id;
    expect(postId).toBeTruthy();

    await page.locator(`.post-card:has-text("${testPost.content}") >> .fa-comment`).click();

    await page.getByPlaceholder('Add a comment...').fill(testComment.content);
    await page.locator(`.post-card:has-text("${testPost.content}") >> .fa-paper-plane`).click();

    await expect(page.locator(`.post-card:has-text("${testComment.content}")`)).toBeVisible();

    await page.locator(`.post-card:has-text("${testPost.content}") >> button:has-text("Delete")`).click();
    await page.waitForTimeout(1000);
    await expect(page.locator(`.post-card:has-text("${testPost.content}")`)).toHaveCount(0);
  });
});
