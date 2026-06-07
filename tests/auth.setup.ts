import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('autenticar', async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/');
  await page.getByRole('link', { name: 'Entrar' }).click();
  await page.getByRole('textbox', { name: 'nome@exemplo.com' }).fill('gabrielgirao760@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).fill('12345678gG');
  await page.getByRole('button', { name: 'Entrar na plataforma' }).click();

  await page.waitForURL('**/dashboard');

  await page.context().storageState({ path: authFile });
});
