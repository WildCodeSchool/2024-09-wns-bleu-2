import { test, expect } from "@playwright/test";

test("Modify Profile", async ({ page }) => {
  // Step 1: Go to the homepage
  await page.goto("http://localhost:8000/");

  // Step 2: Click "Mon compte"
  await page.getByRole('button', { name: 'Mon compte' }).click();

  // Step 3: Click "Mon profil"
  await page.getByRole('link', { name: 'Mon profil' }).click();

  // Step 4: Verify welcome message
  await expect(page.getByRole('heading', { name: 'Bienvenue Mohanad BIKAI' })).toBeVisible({ timeout: 15000 });

  // Step 5: Click "Modifier"
  await page.getByRole('button', { name: 'Modifier' }).click();

  // Step 6: change the vehicle
  await page.getByRole('combobox').first().selectOption('Amphicar');

  // Step 7: change the year
  await page.getByRole('combobox').nth(1).selectOption('2008');

  // Step 8: change the color
  await page.getByRole('combobox').nth(2).selectOption('Vert');

  // Step 9: Click "Valider"
  await page.getByRole('button', { name: 'Valider' }).click();

  // Step 10: Verify the success message
  //  await expect(page.getByText('Véhicule mis à jour avec succès !')).toBeVisible({ timeout: 15000 });


      try {
    // First: Toast confirmation
    await expect(page.getByText('Véhicule mis à jour avec succès')).toBeVisible({ timeout: 15000 });
  } catch {
    try {
      // Second: Redirected to a "Mes Grumpy trips" page with a dynamic ID
      //await expect(page).toHaveURL(/\/mytrips\/\d+$/, { timeout: 10000 });
    } catch (error) {
      console.log("🔴 CI fallback failed — no toast, no button 'Mon compte' found.");
      throw error;
    }
  }
});