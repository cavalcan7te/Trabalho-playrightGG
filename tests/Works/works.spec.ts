import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('https://studylab.free.laravel.cloud/');
  await page.getByRole('link', { name: 'Entrar' }).click();
  await page.getByRole('textbox', { name: 'nome@exemplo.com' }).fill('gabrielgirao760@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).fill('12345678gG');
  await page.getByRole('button', { name: 'Entrar na plataforma' }).click();
}

test.describe('Trabalhos - Casos Felizes', () => {

  test('deve criar um trabalho do tipo Seminário com sucesso', async ({ page }) => {
    await login(page);

    await page.getByRole('link', { name: 'Trabalhos', exact: true }).click();
    await page.getByRole('button', { name: 'Novo trabalho' }).click();
    await page.locator('#workType').selectOption('Seminário');
    await page.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill('gg');
    await page.locator('#workDueDate').fill('2026-06-06');
    await page.getByRole('button', { name: 'Salvar Trabalho' }).click();

    await expect(page.getByText('Trabalho criado com sucesso!')).toBeVisible({ timeout: 5000 });
  });

  test('deve editar um trabalho existente com sucesso', async ({ page }) => {
    await login(page);

    await page.getByRole('link', { name: 'Trabalhos', exact: true }).click();
    await page.getByRole('button', { name: 'Editar' }).first().click();
    await page.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill('ggk');
    await page.getByRole('button', { name: 'Salvar Trabalho' }).click();

    await expect(page.getByText('Trabalho atualizado!')).toBeVisible({ timeout: 5000 });
  });

});