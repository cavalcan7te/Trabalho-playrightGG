import { test, expect } from '@playwright/test';
 test.beforeEach(async ({ page }) => {
    // Todos os testes começam direto no dashboard logados
    await page.goto('https://studylab.free.laravel.cloud/dashboard');
  });

test.describe('Casos Felizes', () => {
    test('deve cadastrar uma matéria', async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/');

  await page.getByRole('link', { name: 'Matérias' }).click();
  await page.getByRole('button', { name: 'Adicionar matéria' }).click();

  await page.locator('#modalSubjectName').selectOption('Geografia');
  await page.getByRole('textbox', { name: 'Ex: Prof. João Silva' }).fill('Prof. João');
  await page.locator('#modalSubjectSemester').selectOption('2');

  await page.getByRole('button', { name: 'Salvar matéria' }).click();

  await expect(
    page.getByText('Matéria cadastrada!')
  ).toBeVisible();
});

test('deve editar uma matéria', async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/');

  await page.getByRole('link', { name: 'Matérias' }).click();

  await page.getByRole('button', { name: 'Editar' }).first().click();

  await page
    .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
    .fill('Prof. João Atualizado');

  await page.getByRole('button', { name: 'Salvar alterações' }).click();

  await expect(
    page.getByText('Matéria atualizada!')
  ).toBeVisible();
test.describe('Casos Tristes', () => {

});
});