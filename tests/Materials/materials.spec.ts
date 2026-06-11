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

    await page.locator('#modalSubjectName').selectOption({ label: 'Geografia' });

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('Prof. João');

    await page.locator('#modalSubjectSemester').selectOption('2');

    await page
      .getByRole('button', { name: 'Salvar matéria' })
      .first()
      .click();

    await expect(
      page.getByText('Matéria cadastrada!')
    ).toBeVisible();
  });

  test('deve editar uma matéria', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias', exact: true }).click();

    const btnEditar = page
      .getByRole('button', { name: /editar/i })
      .first();

    await expect(btnEditar).toBeVisible({ timeout: 10000 });

    await btnEditar.click();

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('Prof. João Atualizado');

    await page
      .getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();

    await expect(
      page.getByText('Matéria atualizada!')
    ).toBeVisible();
  });
});

test.describe('Casos tristes', () => {
  test('não deve cadastrar matéria sem professor', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias', exact: true }).click();

    await page
      .getByRole('button', { name: 'Adicionar matéria' })
      .first()
      .click();

    await page.locator('#modalSubjectName').selectOption({ label: 'Química' });

    await page.locator('#modalSubjectSemester').selectOption('3');

    await page
      .getByRole('button', { name: 'Salvar matéria' })
      .first()
      .click();

    await expect(
      page.getByText('Informe o nome do professor.')
    ).toBeVisible();
  });

  test('não deve editar matéria removendo o nome do professor', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias', exact: true }).click();

    const btnEditar = page
      .getByRole('button', { name: /editar/i })
      .first();

    await expect(btnEditar).toBeVisible({ timeout: 10000 });

    await btnEditar.click();

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('');

    await page
      .getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();

    await expect(
      page.getByText('Informe o nome do professor.')
    ).toBeVisible();
  });
});

test.describe('Casos de borda', () => {
  test('não deve cadastrar matéria com nome de professor acima do limite', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias', exact: true }).click();

    await page
      .getByRole('button', { name: 'Adicionar matéria' })
      .first()
      .click();

    await page.locator('#modalSubjectName').selectOption({ label: 'Arte' });

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('a'.repeat(255));

    await page.locator('#modalSubjectSemester').selectOption('7');

    await page
      .getByRole('button', { name: 'Salvar matéria' })
      .first()
      .click();

    await expect(
      page.getByText(/O nome não pode ter mais de/i)
    ).toBeVisible();
  });

  test('não deve editar matéria com nome de professor acima do limite', async ({ page }) => {
    await page.getByRole('link', { name: 'Matérias', exact: true }).click();

    const btnEditar = page
      .getByRole('button', { name: /editar/i })
      .first();

    await expect(btnEditar).toBeVisible({ timeout: 10000 });

    await btnEditar.click();

    await page
      .getByRole('textbox', { name: 'Ex: Prof. João Silva' })
      .fill('a'.repeat(1001));

    await page
      .getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();

    await expect(
      page.getByText(/O nome não pode ter mais de/i)
    ).toBeVisible();
  });
});