import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/dashboard');
});

test.describe('Casos Felizes', () => {

  test('deve cadastrar uma matéria', async ({ page }) => {
    await page.goto('https://studylab.free.laravel.cloud/');

    await page.getByRole('link', { name: 'Matérias' }).click();
    await page.getByRole('button', { name: 'Adicionar matéria' })
      .first()
      .click({ timeout: 1000000 });

    await page.locator('#modalSubjectName').selectOption('Geografia');
    await page.getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('Prof. João');
    await page.locator('#modalSubjectSemester').selectOption('2');

    await page.getByRole('button', { name: 'Salvar matéria' })
      .first()
      .click({ timeout: 1000000 });

    await expect(
      page.getByText('Matéria cadastrada!')
    ).toBeVisible();
  });

  test('deve editar uma matéria', async ({ page }) => {
    await page.goto('https://studylab.free.laravel.cloud/');

    await page.getByRole('link', { name: 'Matérias' }).click();

    await page.getByRole('button', { name: 'Editar' })
      .first()
      .click();

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('Prof. João Atualizado');

    await page.getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click({ timeout: 1000000 });

    await expect(
      page.getByText('Matéria atualizada!')
    ).toBeVisible();
  });

});

test.describe('Casos Tristes', () => {

  test('não deve cadastrar matéria sem professor', async ({ page }) => {
    await page.goto('https://studylab.free.laravel.cloud/');

    await page.getByRole('link', { name: 'Matérias' }).click();

    await page.getByRole('button', { name: 'Adicionar matéria' })
      .first()
      .click({ timeout: 1000000 });

    await page.locator('#modalSubjectName').selectOption('Química');
    await page.locator('#modalSubjectSemester').selectOption('3');

    await page.getByRole('button', { name: 'Salvar matéria' })
      .first()
      .click({ timeout: 1000000 });

    await expect(
      page.getByText('Informe o nome do professor.')
    ).toBeVisible();
  });

  test('não deve editar matéria removendo o nome do professor', async ({ page }) => {
    await page.goto('https://studylab.free.laravel.cloud/');

    await page.getByRole('link', { name: 'Matérias' }).click();

    await page.getByRole('button', { name: 'Editar' })
      .first()
      .click();

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('');

    await page.getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click({ timeout: 1000000 });

    await expect(
      page.getByText('Informe o nome do professor.')
    ).toBeVisible();
  });

});

test.describe.serial('Casos de Borda - Trabalhos', () => {

  test('não deve cadastrar matéria com nome de professor acima do limite', async ({ page }) => {
    await page.goto('https://studylab.free.laravel.cloud/');

    await page.getByRole('link', { name: 'Matérias' }).click();

    await page.getByRole('button', { name: 'Adicionar matéria' })
      .first()
      .click({ timeout: 1000000 });

    await page.locator('#modalSubjectName').selectOption('Arte');

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('a'.repeat(1001));

    await page.locator('#modalSubjectSemester').selectOption('7');

    await page.getByRole('button', { name: 'Salvar matéria' })
      .first()
      .click({ timeout: 1000000 });

    await expect(
      page.getByText('O nome não pode ter mais de')
    ).toBeVisible();
  });

  test('não deve editar matéria com nome de professor acima do limite', async ({ page }) => {
    await page.goto('https://studylab.free.laravel.cloud/');

    await page.getByRole('link', { name: 'Matérias' }).click();

    await page.getByRole('button', { name: 'Editar' })
      .first()
      .click();

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('a'.repeat(1001));

    await page.getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click({ timeout: 1000000 });

    await expect(
      page.getByText('O nome não pode ter mais de')
    ).toBeVisible();
  });

});