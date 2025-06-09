import { test, expect } from '@playwright/test';

test('New register', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page.getByRole('link', { name: 'S\'inscrire' })).toBeVisible();
  await page.getByRole('link', { name: 'S\'inscrire' }).click();

  await expect(page.getByRole('textbox', { name: 'Doe', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Doe', exact: true }).fill('Bikai');

  await page.getByRole('textbox', { name: 'John', exact: true }).fill('Mohanad');

  await page.locator('input[name="birthdate"]').fill('1995-08-16');
  await page.locator('select[name="gender"]').selectOption('Homme');

  await page.getByRole('textbox', { name: 'johndoe@gmail.com' }).fill('mohanad.bikai95@gmail.com');
  await page.getByRole('textbox', { name: '0675896158' }).fill('0615389724');

  await page.locator('input[name="password"]').fill('Mohanadbikai95$');
  await page.locator('input[name="confirmPassword"]').fill('Mohanadbikai95$');

  await page.locator('select[name="carBrand"]').selectOption('AC');
  await page.locator('select[name="carColor"]').selectOption('Marron');
  await page.locator('select[name="carYear"]').selectOption('2008');

  await page.getByRole('checkbox', { name: 'J’accepte les conditions géné' }).check();
  await page.getByRole('button', { name: 'S\'inscrire' }).click();

  await expect(page.getByText('Vous pouvez à présent')).toBeVisible();

  await expect(page.getByText('Confirmation de votre emailVeuillez saisir le code reçu par email.Confirmer')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Confirmation de votre email' })).toBeVisible();
  await expect(page.getByText('Veuillez saisir le code reçu')).toBeVisible();
});

test('Already registered', async ({ page }) => {
  // Go to homepage
  await page.goto('http://localhost:8000/');
  await expect(page.getByRole('link', { name: /s'inscrire/i })).toBeVisible();

  // Navigate to registration page
  await page.getByRole('link', { name: /s'inscrire/i }).click();
  await expect(page.getByRole('heading', { name: /inscription/i })).toBeVisible();

  // Fill in user info
  await page.getByRole('textbox', { name: 'Doe', exact: true }).fill('BIKAI');
  await page.getByRole('textbox', { name: 'John', exact: true }).fill('Mohanad');
  await page.locator('input[name="birthdate"]').fill('1995-08-16');
  await page.locator('select[name="gender"]').selectOption('Homme');

  // Use already registered email
  await page.getByRole('textbox', { name: 'johndoe@gmail.com' }).fill('mohanad.bikai95@gmail.com');
  await page.getByRole('textbox', { name: '0675896158' }).fill('0615389724');

  // Fill password and confirm
  await page.locator('input[name="password"]').fill('mohanadbikai95$');
  await page.locator('input[name="confirmPassword"]').fill('mohanadbikai95$');

  // Car info
  await page.locator('select[name="carBrand"]').selectOption('Amphicar');
  await page.locator('select[name="carColor"]').selectOption('Beige');
  await page.locator('select[name="carYear"]').selectOption('2010');

  // Accept terms and submit
  await page.getByRole('checkbox', { name: /conditions générales/i }).check();
  await page.getByRole('button', { name: /s'inscrire/i }).click();

  // Wait for error message
  await expect(page.getByText(/adresse e.?mail existe déjà/i)).toBeVisible({ timeout: 5000 });
});