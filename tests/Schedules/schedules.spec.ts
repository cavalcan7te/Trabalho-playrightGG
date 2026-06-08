import { test, expect } from '@playwright/test';
test.describe('Casos Felizes', () => {
test('deve criar e editar um horário com sucesso', async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/');
  
  // 1. Criar novo horário
  await page.getByRole('link', { name: 'Horários', exact: true }).click();
  await page.getByRole('button', { name: 'Adicionar horário' }).click();
  
  await page.getByRole('textbox', { name: /Ex: Grade/ }).fill('Teste de Horário');
  await page.locator('.w-6.h-6.text-pink-500').click();
  await page.setInputFiles('input[type="file"]', '1000_F_200662748_nJZc35hg1jv0WoXxxSsLDheLfhZo1arf.jpg');
  await page.getByRole('button', { name: 'Enviar horário' }).click();

  // Validação: Verificar se a mensagem de sucesso aparece
  await expect(page.getByText('Horário enviado com sucesso!')).toBeVisible();

 test('edita horario com sucesso', async ({ page }) => {
  await page.locator('.w-7').first().click();
  await page.locator('#editTitle').fill('Teste de Horário Editado');
  await page.getByRole('button', { name: 'Salvar' }).click();

  // Validação: Verificar se a atualização foi concluída
  await expect(page.getByText('Horário atualizado!')).toBeVisible();
 });
test.describe('Casos Tristes', () => {
test('não deve criar horário sem imagem', async ({ page }) => {
  await page.getByRole('link', { name: 'Horários' }).click();
  await page.getByRole('button', { name: 'Adicionar horário' }).click();

  await page.getByRole('textbox').fill('Teste');
  await page.getByRole('button', { name: 'Enviar horário' }).click();

  await expect(
    page.getByText('Selecione uma imagem.')
  ).toBeVisible();
});

test('não deve salvar planner vazio', async ({ page }) => {
  await page.getByRole('link', { name: 'Horários' }).click();
  await page.locator('.w-7').first().click();

  await page.getByRole('link', { name: 'Novo Planner' }).click();
  await page.getByRole('button', { name: 'Salvar Planner' }).click();

  await expect(
    page.getByText('O planner está vazio!')
  ).toBeVisible();
});
test.describe.serial('Casos de Borda - Trabalhos', () => {
test('não deve permitir título acima do limite de caracteres', async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/');

  await page.getByRole('link', { name: 'Horários' }).click();
  await page.getByRole('button', { name: 'Adicionar horário' }).click();

  await page.getByRole('textbox').fill('a'.repeat(1001));

  await page.locator('input[type="file"]').setInputFiles('download (3).jpg');

  await page.getByRole('button', { name: 'Enviar horário' }).click();

  await expect(
    page.getByText('O título pode ter no máximo')
  ).toBeVisible();
});
test('não deve permitir editar com título acima do limite', async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/');

  await page.getByRole('link', { name: 'Horários' }).click();
  await page.locator('.w-7').first().click();

  await page.locator('#editTitle').fill('a'.repeat(1001));

  await page.getByRole('button', { name: 'Salvar' }).click();

  await expect(
    page.getByText('Erro ao atualizar.')
  ).toBeVisible();
});
});
});
});
});
