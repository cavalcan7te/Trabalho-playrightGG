import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/dashboard');
  await page.waitForLoadState('networkidle');
});


test.describe('Casos felizes', () => {
  test('deve cadastrar um conteúdo', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias Matérias' }).click();

    await page.getByRole('link', { name: 'Ver conteúdos' }).click();

    await page.getByRole('button', { name: 'Adicionar conteúdo' }).click();

    await page
      .getByRole('textbox', {
        name: 'Ex: Derivadas e integrais,'
      })
      .fill('orações subordinadas');

    await page.locator('#modalContentSubject').selectOption('325');

    await page.locator('#modalContentSemester').selectOption('1');

    await page.getByRole('button', { name: 'Salvar conteúdo' }).click();

    await expect(
      page.getByText('Conteúdo cadastrado!')
    ).toBeVisible();
  });

  test('deve editar um conteúdo', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias Matérias' }).click();

    await page.getByRole('link', { name: 'Ver conteúdos' }).click();

    await page.getByRole('button', { name: 'Editar' }).first().click();

    await page
      .getByRole('textbox', {
        name: 'Ex: Derivadas e integrais,'
      })
      .fill('orações subordinadas adjetivas');

    await page
      .getByRole('button', { name: 'Salvar alterações' })
      .click();

    await expect(
      page.getByText('Conteúdo atualizado!')
    ).toBeVisible();
  });
});

test.describe('Casos tristes', () => {
  test('não deve cadastrar conteúdo sem nome', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias Matérias' }).click();

    await page.getByRole('link', { name: 'Ver conteúdos' }).click();

    await page.getByRole('button', { name: 'Adicionar conteúdo' }).click();

    await page.locator('#modalContentSubject').selectOption('325');

    await page.locator('#modalContentSemester').selectOption('1');

    await page.getByRole('button', { name: 'Salvar conteúdo' }).click();

    await expect(
      page.getByText('Informe o nome do conteúdo.')
    ).toBeVisible();
  });

  test('não deve cadastrar conteúdo sem semestre', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias Matérias' }).click();

    await page.getByRole('link', { name: 'Ver conteúdos' }).click();

    await page.getByRole('button', { name: 'Adicionar conteúdo' }).click();

    await page
      .getByRole('textbox', {
        name: 'Ex: Derivadas e integrais,'
      })
      .fill('pronome');

    await page.locator('#modalContentSubject').selectOption('325');

    await page.getByRole('button', { name: 'Salvar conteúdo' }).click();

    await expect(
      page.getByText('Selecione ou informe o semestre.')
    ).toBeVisible();
  });
});

test.describe('Casos de borda', () => {
  test('deve cadastrar conteúdo com 1 caractere', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias Matérias' }).click();

    await page.getByRole('link', { name: 'Ver conteúdos' }).click();

    await page.getByRole('button', { name: 'Adicionar conteúdo' }).click();

    await page
      .getByRole('textbox', {
        name: 'Ex: Derivadas e integrais,'
      })
      .fill('A');

    await page.locator('#modalContentSubject').selectOption('325');

    await page.locator('#modalContentSemester').selectOption('1');

    await page.getByRole('button', { name: 'Salvar conteúdo' }).click();
  });

  test('deve cadastrar conteúdo com 255 caracteres', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias Matérias' }).click();

    await page.getByRole('link', { name: 'Ver conteúdos' }).click();

    await page.getByRole('button', { name: 'Adicionar conteúdo' }).click();

    await page
      .getByRole('textbox', {
        name: 'Ex: Derivadas e integrais,'
      })
      .fill('a'.repeat(255));

    await page.locator('#modalContentSubject').selectOption('325');

    await page.locator('#modalContentSemester').selectOption('1');

    await page.getByRole('button', { name: 'Salvar conteúdo' }).click();
  });
});