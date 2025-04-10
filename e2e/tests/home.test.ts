import { test, expect } from "@playwright/test";

// const baseUrl = process.env.LOCAL
//   ? "http://localhost:8000"
//   : "http://api_gateway/";

// test("Go to home page", async ({ page }) => {
//   await page.goto("/", { waitUntil: 'domcontentloaded' });
//   await page.waitForLoadState("networkidle");

//   // Expect homepage image is visible
//   const image = page.getByRole('img', { name: 'Image en homepage' });
//   await expect(image).toBeVisible(    { timeout: 15000 });
// });
test("Verify Nginx Routing", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);  // Should now pass
});
