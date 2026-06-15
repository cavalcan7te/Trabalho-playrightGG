import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/dashboard');
  await page.waitForLoadState('networkidle');
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: `screenshots/${testInfo.title}.png`,
      fullPage: true,
    });
  }
});

test.describe('Casos felizes', () => {
  test('deve cadastrar uma matéria', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias', exact: true }).click();

    await page
      .getByRole('button', { name: 'Adicionar matéria' })
      .first()
      .click();

    await expect(page.locator('#modalSubjectName')).toBeVisible();

    await page.waitForTimeout(2000);

    await page.locator('#modalSubjectName').selectOption({ index: 1 });

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('Prof. João');

    await page.locator('#modalSubjectSemester').selectOption({ index: 1 });

    await page
      .getByRole('button', { name: 'Salvar matéria' })
      .first()
      .click();
  });

  test('deve editar uma matéria', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias', exact: true }).click();

    const btnEditar = page.locator('button').filter({ hasText: /editar/i }).first();

    await expect(btnEditar).toBeVisible({ timeout: 15000 });

    await btnEditar.click();

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('Prof. João Atualizado');

    await page
      .getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();
  });
});

test.describe('Casos tristes', () => {
  test('não deve cadastrar matéria sem professor', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias', exact: true }).click();

    await page
      .getByRole('button', { name: 'Adicionar matéria' })
      .first()
      .click();

    await expect(page.locator('#modalSubjectName')).toBeVisible();

    await page.waitForTimeout(2000);

    await page.locator('#modalSubjectName').selectOption({ index: 1 });

    await page.locator('#modalSubjectSemester').selectOption({ index: 1 });

    await page
      .getByRole('button', { name: 'Salvar matéria' })
      .first()
      .click();
  });

  test('não deve editar matéria removendo o nome do professor', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias', exact: true }).click();

    const btnEditar = page.locator('button').filter({ hasText: /editar/i }).first();

    await expect(btnEditar).toBeVisible({ timeout: 15000 });

    await btnEditar.click();

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .clear();

    await page
      .getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();
  });
});

test.describe('Casos de borda', () => {
  test('não deve cadastrar matéria com nome muito grande', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias', exact: true }).click();

    await page
      .getByRole('button', { name: 'Adicionar matéria' })
      .first()
      .click();

    await expect(page.locator('#modalSubjectName')).toBeVisible();

    await page.waitForTimeout(2000);

    await page.locator('#modalSubjectName').selectOption({ index: 1 });

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('a'.repeat(255));

    await page.locator('#modalSubjectSemester').selectOption({ index: 1 });

    await page
      .getByRole('button', { name: 'Salvar matéria' })
      .first()
      .click();
  });

  test('não deve editar matéria com nome muito grande', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias', exact: true }).click();

    const btnEditar = page.locator('button').filter({ hasText: /editar/i }).first();

    await expect(btnEditar).toBeVisible({ timeout: 15000 });

    await btnEditar.click();

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('a'.repeat(1001));

    await page
      .getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();
  });
});