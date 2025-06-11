// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication
  await page.goto('http://localhost:8000/');
  await page.getByRole('link', { name: /se connecter/i }).click();
  
  await page.getByRole('textbox', { name: /monemail@gmail.com/i }).fill('mohanad.bikai95@gmail.com');
  await page.locator('input[name="password"]').fill('Mohanadbikai95$');
  
  await page.getByRole('button', { name: /connexion/i }).click();
  
  // Wait for login completion
  await page.waitForURL('http://localhost:8000/');
  await expect(page.getByRole('button', { name: /mon compte\s*/i })).toBeVisible({ timeout: 10000 });

  // Save authentication state
  await page.context().storageState({ path: authFile });
});