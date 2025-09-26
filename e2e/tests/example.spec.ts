import { test, expect } from "@playwright/test";

test("Go to home page", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.waitForLoadState("networkidle");

  // Wait 3 seconds before closing
  await page.waitForTimeout(3000);
  await page.close();
});

test("Verify Nginx Routing", async ({ page }) => {
  const response = await page.goto("http://localhost:8000/");
  expect(response?.status()).toBe(200);

  // Wait 3 seconds before closing
  await page.waitForTimeout(3000);
  await page.close();
});

