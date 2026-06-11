import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/dashboard');
  await page.waitForLoadState('networkidle');
});

test.describe('Casos Felizes', () => {

test('deve criar um horário com sucesso', async ({ page }) => {

    await page.getByRole('link', { name: 'Horários', exact: true })
      .first()
      .click();

    await page.getByRole('button', { name: 'Adicionar horário' })
      .first()
      .click();

    await page.getByRole('textbox', { name: /Ex: Grade/ })
      .fill('Teste de Horário');

    await page.locator('.w-6.h-6.text-pink-500').first().click();

    await page.setInputFiles(
      'input[type="file"]',
      '1000_F_200662748_nJZc35hg1jv0WoXxxSsLDheLfhZo1arf.jpg'
    );

    await page.getByRole('button', { name: 'Enviar horário' })
      .first()
      .click();

    await expect(
      page.getByText('Horário enviado com sucesso!')
    ).toBeVisible();
  });

  test('edita horário com sucesso', async ({ page }) => {

    await page.getByRole('link', { name: 'Horários', exact: true })
      .first()
      .click();

    await page.locator('.w-7').first().click();

    await page.locator('#editTitle')
      .fill('Teste de Horário Editado');

    await page.getByRole('button', { name: 'Salvar' })
      .first()
      .click();

    await expect(
      page.getByText('Horário atualizado!')
    ).toBeVisible();
  });

});

test.describe('Casos Tristes', () => {

  test('não deve criar horário sem imagem', async ({ page }) => {

    await page.getByRole('link', { name: 'Horários' })
      .first()
      .click();

    await page.getByRole('button', { name: 'Adicionar horário' })
      .first()
      .click();

    await page.getByRole('textbox')
      .first()
      .fill('Teste');

    await page.getByRole('button', { name: 'Enviar horário' })
      .first()
      .click();

    await expect(
      page.getByText('Selecione uma imagem.')
    ).toBeVisible();
  });

  test('não deve salvar planner vazio', async ({ page }) => {

    await page.getByRole('link', { name: 'Horários' })
      .first()
      .click();

    await page.locator('.w-7').first().click();

    await page.getByRole('link', { name: 'Novo Planner' })
      .first()
      .click();

    await page.getByRole('button', { name: 'Salvar Planner' })
      .first()
      .click();

    await expect(
      page.getByText('O planner está vazio!')
    ).toBeVisible();
  });

});

test.describe.serial('Casos de Borda - Horários', () => {

  test('não deve permitir título acima do limite de caracteres', async ({ page }) => {

    await page.getByRole('link', { name: 'Horários' })
      .first()
      .click();

    await page.getByRole('button', { name: 'Adicionar horário' })
      .first()
      .click();

    await page.getByRole('textbox')
      .first()
      .fill('a'.repeat(1001));

    await page.locator('input[type="file"]')
      .setInputFiles('download (3).jpg');

    await page.getByRole('button', { name: 'Enviar horário' })
      .first()
      .click();

    await expect(
      page.getByText('O título pode ter no máximo')
    ).toBeVisible();
  });

  test('não deve permitir editar com título acima do limite', async ({ page }) => {

    await page.getByRole('link', { name: 'Horários' })
      .first()
      .click();

    await page.locator('.w-7').first().click();

    await page.locator('#editTitle')
      .fill('a'.repeat(1001));

    await page.getByRole('button', { name: 'Salvar' })
      .first()
      .click();

    await expect(
      page.getByText('Erro ao atualizar.')
    ).toBeVisible();
  });

});