import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/dashboard');
  await page.waitForLoadState('networkidle');
});

test.describe('Casos felizes', () => {

  test('deve criar uma nota com sucesso', async ({ page }) => {
    await page.getByRole('link', { name: 'Boletim', exact: true }).click();

    const btnNovaNota = page.getByRole('button', { name: 'Nova nota' }).first();

    await expect(btnNovaNota).toBeVisible();
    await btnNovaNota.click();

    await expect(page.locator('#gradeModalSubjectId')).toBeVisible();
    await expect(page.locator('#gradeModalBimester')).toBeVisible();

    await page.waitForTimeout(2000);

    await page.locator('#gradeModalSubjectId').selectOption({ index: 1 });
    await page.locator('#gradeModalBimester').selectOption('2');

    await page.locator('#gradeModalMidterm').fill('1');
    await page.locator('#gradeModalEndterm').fill('1');

    await page.getByRole('button', { name: 'Salvar nota' }).first().click();

    await page.screenshot({
      path: 'screenshots/criar-nota.png',
      fullPage: true,
    });
  });

  test('deve editar o boletim existente com sucesso', async ({ page }) => {
    await page.getByRole('link', { name: 'Boletim', exact: true }).click();

    const editarBoletim = page.locator('.w-7').first();

    await expect(editarBoletim).toBeVisible({ timeout: 15000 });

    await editarBoletim.click();

    await expect(page.locator('#gradeModalMidterm')).toBeVisible();

    await page.locator('#gradeModalMidterm').fill('2');

    await page
      .getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();

    await page.screenshot({
      path: 'screenshots/editar-boletim.png',
      fullPage: true,
    });
  });

});

test.describe('Casos tristes', () => {

  test('não deve salvar nota se o bimestre não for selecionado', async ({ page }) => {
    await page.getByRole('link', { name: 'Boletim', exact: true }).click();

    await page.getByRole('button', { name: 'Nova nota' }).first().click();

    await expect(page.locator('#gradeModalSubjectId')).toBeVisible();

    await page.waitForTimeout(2000);

    await page.locator('#gradeModalSubjectId').selectOption({ index: 1 });

    await page.locator('#gradeModalMidterm').fill('9');
    await page.locator('#gradeModalEndterm').fill('9');

    await page.getByRole('button', { name: 'Salvar nota' }).first().click();

    await expect(
      page.getByText('Selecione o bimestre.')
    ).toBeVisible();
  });

  test('não deve permitir salvar ano fora do intervalo permitido', async ({ page }) => {
    await page.getByRole('link', { name: 'Boletim', exact: true }).click();

    const editarBoletim = page.locator('.w-7').first();

    await expect(editarBoletim).toBeVisible({ timeout: 15000 });

    await editarBoletim.click();

    await page.getByPlaceholder('2026').clear();

    await page
      .getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();

    await expect(
      page.getByText('Ano entre 2000 e')
    ).toBeVisible();
  });

});

test.describe('Casos de borda', () => {

  test('exibe erro ao salvar nota com valor acima do permitido', async ({ page }) => {
    await page.getByRole('link', { name: 'Boletim', exact: true }).click();

    await page.getByRole('button', { name: 'Nova nota' }).first().click();

    await expect(page.locator('#gradeModalSubjectId')).toBeVisible();

    await page.waitForTimeout(2000);

    await page.locator('#gradeModalSubjectId').selectOption({ index: 1 });
    await page.locator('#gradeModalBimester').selectOption('3');

    await page.locator('#gradeModalMidterm').fill('222');
    await page.locator('#gradeModalEndterm').fill('222');

    await page.getByRole('button', { name: 'Salvar nota' }).first().click();

    await expect(
      page.locator('#err-gradeModalEndterm')
    ).toBeVisible();
  });

});