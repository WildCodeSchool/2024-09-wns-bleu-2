import { test, expect } from "@playwright/test";

test("Carpool Publish", async ({ page }) => {
  // Step 1: Go to the homepage
  await page.goto("http://localhost:8000/");

  // Step 2: Click "Publier un Grumpy Trip"
  await page.getByRole('link', { name: /Publier un Grumpy Trip/i }).click();
  
  // Step 3: check if the page is loaded
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole('heading', { name: 'Proposez votre Grumpy Trip' })).toBeVisible({ timeout: 15000 });

  // Step 4: Fill in the form
  //-- Select cities from the dropdowns
  await page.locator('div').filter({ hasText: /^Adresse de départParisLyonMarseilleBordeauxLilleNantesStrasbourg$/ }).click();
  await page.locator('div').filter({ hasText: /^Adresse de départParisLyonMarseilleBordeauxLilleNantesStrasbourg$/ }).getByRole('combobox').selectOption('Paris');
  await page.locator('div').filter({ hasText: /^Adresse d'arrivéeParisLyonMarseilleBordeauxLilleNantesStrasbourg$/ }).click();
  await page.locator('div').filter({ hasText: /^Adresse d'arrivéeParisLyonMarseilleBordeauxLilleNantesStrasbourg$/ }).getByRole('combobox').selectOption('Lyon');
  //-- Select the date and time
  await page.locator('div:nth-child(6)').click();
  await page.getByRole('option', { name: 'Choose dimanche 6 juillet' }).click();
  await page.locator('div:nth-child(8)').click();
  await page.getByRole('option', { name: '09:45' }).click();
  //-- Select the trip duration
  await page.getByRole('combobox').nth(2).selectOption('8');
  //-- Selcet the number of passengers
  await page.locator('div').filter({ hasText: /^Nombre de passagers1 Passager2 Passagers3 Passagers4 Passagers$/ }).first().click();
  await page.getByLabel('Nombre de passagers').selectOption('2');
  //-- write the Price 
  await page.getByTestId('price-value').click();
  await page.getByTestId('price-value').fill('35');
  //-- Select the carpool options
  await page.getByRole('checkbox', { name: 'J’accepte les fumeurs' }).check();
  await page.getByRole('checkbox', { name: 'Ok pour écouter de la Grumpy’' }).check();
  
  // Step 5: Click "Publier mon trajet"
  await page.getByRole('button', { name: 'Publier mon trajet' }).click();

  // Step 6: login completion
  
  await expect(page.locator('.Toastify__toast--success', { hasText: 'Trajet bien publié !' })).toBeVisible({ timeout: 10000 });
  //await page.waitForURL(/\/mytrips\/\d+$/);
  await page.waitForTimeout(1000);

  await page.waitForLoadState("networkidle");
  await expect(page.getByRole('heading', { name: 'Mes Grumpy trips à venir' })).toBeVisible();
});

