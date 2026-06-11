import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/dashboard');
});

test.describe('Casos Felizes', () => {

  test('deve criar uma nota com sucesso', async ({ page }) => {

    await page.getByRole('link', { name: 'Boletim', exact: true }).click();

    await page.getByRole('button', { name: 'Nova nota' }).first().click();

    await page.locator('#gradeModalSubjectId').selectOption('325');
    await page.locator('#gradeModalBimester').selectOption('2');
    await page.locator('#gradeModalMidterm').fill('1');
    await page.locator('#gradeModalEndterm').fill('1');

    await page.getByRole('button', { name: 'Salvar nota' }).first().click();

    await page.screenshot({ path: 'erro.png', fullPage: true });
  });

  test('deve editar o boletim existente com sucesso', async ({ page }) => {

    await page.getByRole('link', { name: 'Boletim', exact: true }).click();

    const editarBoletim = page.locator('.w-7').first();

    await expect(editarBoletim).toBeVisible({ timeout: 10000 });
    await editarBoletim.click();

    await page.locator('#gradeModalMidterm').fill('2');

    await page.getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();

  await page.screenshot({ path: 'erro.png', fullPage: true });
  });

});

test.describe('Casos Tristes / Validações', () => {

  test('não deve salvar nota se o bimestre não for selecionado', async ({ page }) => {

    await page.getByRole('link', { name: 'Boletim', exact: true }).click();

    await page.getByRole('button', { name: 'Nova nota' }).first().click();

    await page.locator('#gradeModalSubjectId').selectOption('326');
    await page.locator('#gradeModalMidterm').fill('9');
    await page.locator('#gradeModalEndterm').fill('9');

    await page.getByRole('button', { name: 'Salvar nota' }).first().click();

    await expect(
      page.getByText('Selecione o bimestre.')
    ).toBeVisible();
  });

  test('não deve permitir salvar ano fora do intervalo permitido', async ({ page }) => {

    await page.getByRole('link', { name: 'Boletim', exact: true }).click();

    await page.locator('.w-7').first().click({ timeout: 100000000 });

    await page.getByPlaceholder('2026').fill('');

    await page.getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();

    await expect(
      page.getByText('Ano entre 2000 e')
    ).toBeVisible();
  });

});

test.describe.serial('Casos de Borda - Boletim', () => {

  test('exibe erro ao salvar nota com valor acima do permitido', async ({ page }) => {

    await page.getByRole('link', { name: 'Boletim', exact: true }).click();

    await page.getByRole('button', { name: 'Nova nota' }).first().click();

    await page.locator('#gradeModalEndterm').fill('222');
    await page.locator('#gradeModalMidterm').fill('222');
    await page.locator('#gradeModalBimester').selectOption('3');
    await page.locator('#gradeModalSubjectId').selectOption('325');

    await page.getByRole('button', { name: 'Salvar nota' }).first().click();

    await expect(
      page.locator('#err-gradeModalEndterm')
    ).toBeVisible();
  });

});