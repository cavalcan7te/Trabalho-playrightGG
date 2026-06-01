import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/');
  await page.getByRole('link', { name: 'Entrar' }).click();
  await page.getByRole('textbox', { name: 'nome@exemplo.com' }).fill('gabrielgirao760@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).fill('12345678gG');
  await page.getByRole('button', { name: 'Entrar na plataforma' }).click();
});