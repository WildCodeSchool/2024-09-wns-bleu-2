import { test, expect } from '@playwright/test';

test('Login and publish a carpool trip', async ({ page }) => {
  await page.goto('http://localhost:8000/');

  await page.getByRole('link', { name: 'Se connecter' }).click();
  await expect(page.getByRole('heading', { name: 'Se connecter' })).toBeVisible();

  await page.getByRole('textbox', { name: 'monemail@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'monemail@gmail.com' }).fill('mohanad.bikai95@gmail.com');

  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('Mohanadbikai95$');

  await page.getByRole('button', { name: 'Connexion' }).click();
  await expect(page.getByText('Ravi de vous revoir !')).toBeVisible();

  await page.getByRole('button', { name: 'close' }).click();

  await page.getByRole('link', { name: 'Publier un Grumpy Trip' }).click();
  await expect(page.getByRole('heading', { name: 'Proposez votre Grumpy Trip' })).toBeVisible();

  await page.locator('div').filter({ hasText: /^Adresse de départParisLyonMarseilleBordeauxLilleNantesStrasbourg$/ }).click();
  await page.locator('div').filter({ hasText: /^Adresse de départParisLyonMarseilleBordeauxLilleNantesStrasbourg$/ }).getByRole('combobox').selectOption('Paris');

  await page.locator('div').filter({ hasText: /^Adresse d'arrivéeParisLyonMarseilleBordeauxLilleNantesStrasbourg$/ }).click();
  await page.locator('div').filter({ hasText: /^Adresse d'arrivéeParisLyonMarseilleBordeauxLilleNantesStrasbourg$/ }).getByRole('combobox').selectOption('Lyon');

  await page.locator('div:nth-child(6)').click();
  await page.getByRole('option', { name: 'Choose dimanche 6 juillet' }).click();

  await page.locator('div:nth-child(8)').click();
  await page.getByRole('option', { name: '16:00' }).click();

  await page.getByRole('combobox').nth(2).selectOption('8');

  await page.locator('div').filter({ hasText: /^Nombre de passagers1 Passager2 Passagers3 Passagers4 Passagers$/ }).first().click();
  await page.getByLabel('Nombre de passagers').selectOption('2');

  await expect(page.getByRole('heading', { name: 'Fixez votre prix par place' })).toBeVisible();
  await page.getByTestId('price-value').click();
  await page.getByTestId('price-value').fill('35');

  await expect(page.getByRole('heading', { name: 'Quelles sont vos préférences' })).toBeVisible();
  await page.getByRole('checkbox', { name: 'J’accepte les fumeurs' }).check();
  await page.getByRole('checkbox', { name: 'Ok pour écouter de la Grumpy’' }).check();

  await page.getByRole('button', { name: 'Publier mon trajet' }).click();
  await expect(page.getByText('Trajet bien publié !')).toBeVisible();

  await page.getByRole('button', { name: 'close' }).click();

  await expect(page.getByRole('heading', { name: 'Mes Grumpy trips à venir' })).toBeVisible();

  await expect(page.getByRole('button', { name: '16:00 8h00 00:00 Paris Lyon' }).first()).toBeVisible();
  //await page.getByRole('button', { name: 'ANNULER', exact: true }).nth(1).click();
});

