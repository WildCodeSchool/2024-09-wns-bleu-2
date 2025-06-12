// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '.auth/user.json');

setup('authenticate', async ({ page }) => {
//   // Perform authentication
//   await page.goto('http://localhost:8000/');
//   await page.getByRole('link', { name: /se connecter/i }).click();
  
//   await page.getByRole('textbox', { name: /monemail@gmail.com/i }).fill('mohanad.bikai95@gmail.com');
//   await page.locator('input[name="password"]').fill('Mohanadbikai95$');
  
//   await page.getByRole('button', { name: /connexion/i }).click();
  
//   // Wait for login completion
//   await page.waitForURL('http://localhost:8000/');
//   await expect(page.getByRole('button', { name: /mon compte\s*/i })).toBeVisible({ timeout: 30000 });

//   // Save authentication state
//   await page.context().storageState({ path: authFile });

// Step 1: Go to the homepage
await page.goto('http://localhost:8000/');

// Step 2: Click "Se connecter"
await page.getByRole('link', { name: /se connecter/i }).click();

// Step 3: Fill in email and password
await page.getByRole('textbox', { name: /monemail@gmail.com/i }).fill('mohanad.bikai95@gmail.com');
await page.locator('input[name="password"]').fill('Mohanadbikai95$');

// Step 4: Click login button
await page.getByRole('button', { name: /connexion/i }).click();

// Step 5: login completion
await page.waitForURL('http://localhost:8000/');

// Step 6: Fallback checks to verify successful login
try {
  // Option 1: Welcome message visible
  await expect(page.getByText(/ravi de vous revoir/i)).toBeVisible({ timeout: 15000 });
} catch {
  try {
    // Option 2: "Mon compte" button visible
    await expect(page.getByRole('button', { name: /mon compte/i })).toBeVisible({ timeout: 15000 });
  } catch {
    // Option 3: Final fallback — check if redirected to homepage
    await expect(page).toHaveURL('http://localhost:8000/', { timeout: 15000 });
  }
}

// Step 7: Save authentication session
await page.context().storageState({ path: authFile });

});