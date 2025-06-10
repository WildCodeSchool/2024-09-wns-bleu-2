import { test, expect } from "@playwright/test";

test("Go to home page", async ({ page }) => {
  await page.goto("http://api_gateway:80/");
  await page.waitForLoadState("networkidle");

  // Expect homepage image is visible
  //const image = page.getByRole('img', { name: 'Image en homepage' });
  //await expect(image).toBeVisible(    { timeout: 15000 });
});
test("Verify Nginx Routing", async ({ page }) => {
  const response = await page.goto("http://api_gateway:80/");
  expect(response?.status()).toBe(200);  // Should now pass
});
