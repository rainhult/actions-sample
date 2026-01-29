import { test, expect } from '@playwright/test';

test('「Vite + React」の表記があることを確認', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toContainText('Vite + React');
});
