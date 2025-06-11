import { test, expect } from '@playwright/test';


test('User login', async ({ page }) => {
  // Go to homepage
  await page.goto('http://localhost:8000/');
  //await expect(page.getByRole('link', { name: /se connecter/i })).toBeVisible();


//   // Navigate to login page
//   //await page.getByRole('link', { name: /se connecter/i }).click();
//   //await expect(page.getByRole('heading', { name: /connexion/i })).toBeVisible();


//   // Fill login form
//   await page.getByRole('textbox', { name: /monemail@gmail.com/i }).fill('mohanad.bikai95@gmail.com');
//   await page.locator('input[name="password"]').fill('Mohanadbikai95$');


//   // Submit login
//   await page.getByRole('button', { name: /connexion/i }).click();

// // Optional: wait for redirection after login
// await page.waitForURL('http://localhost:8000/');



//   // Confirm welcome message
//   //await expect(page.getByText(/ravi de vous revoir/i)).toBeVisible({ timeout: 1000 });
  
//   // Take screenshot before check
//   //await page.screenshot({ path: 'login-debug.png', fullPage: true });

//   // Open user account menu
//   //await expect(page.getByRole('button', { name: /mon compte/i })).toBeVisible({ timeout: 1000 });
//   //await page.getByRole('button', { name: /mon compte/i }).click();
await expect(page.getByRole('button', { name: /mon compte\s*/i })).toBeVisible({ timeout: 10000 });

//   await page.close();


//   // Navigate to profile
//   //await page.getByRole('link', { name: /mon profil/i }).click();
//   //await expect(page.getByRole('heading', { name: /bienvenue mohanad bikai/i })).toBeVisible();
});
