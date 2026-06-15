import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/dashboard');
  await page.waitForLoadState('networkidle');
});

test.describe('Casos Felizes', () => {

  test('cadastra prova com sucesso', async ({ page }) => {
    await page.getByRole('link', { name: 'Provas', exact: true }).first().click();

    // Garante que a prova será criada em uma semana futura
    await page.locator('#nextWeek').click();

    await page.getByRole('button', { name: 'Adicionar' })
      .first()
      .click();

    await page.locator('#modalType').selectOption('Prova Final');
    await page.locator('#modalDesc').selectOption('Português');
    await page.locator('#modalTimeStart').fill('12:00');
    await page.locator('#modalTimeEnd').fill('17:00');

    await page.getByRole('button', { name: 'Salvar prova' })
      .first()
      .click();

    await expect(
      page.getByText('Prova cadastrada! ✓')
    ).toBeVisible({ timeout: 10000 });
  });

  test('edita prova com sucesso', async ({ page }) => {
    await page.getByRole('link', { name: 'Provas', exact: true }).first().click();

    await page.locator('#nextWeek').click();

    await page.locator('#calBody')
      .getByText('Prova Final')
      .first()
      .click();

    await page.locator('#modalDesc').selectOption('Literatura');
    await page.locator('#modalTimeStart').fill('14:00');
    await page.locator('#modalTimeEnd').fill('18:00');

    await page.getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();

    await expect(
      page.getByText('Prova atualizada! ✓')
    ).toBeVisible({ timeout: 10000 });
  });

});

test.describe('Casos Tristes / Validações', () => {

  test('exibe erro ao cadastrar prova sem matéria', async ({ page }) => {
    await page.getByRole('link', { name: 'Provas', exact: true }).first().click();

    await page.locator('#nextWeek').click();

    await page.getByRole('button', { name: 'Adicionar' })
      .nth(1)
      .click();

    await page.locator('#modalType').selectOption('Prova Final');

    await page.getByRole('button', { name: 'Salvar prova' })
      .first()
      .click();

    await expect(
      page.getByText('Informe uma matéria (máx 40 char)')
    ).toBeVisible();
  });

  test('exibe erro ao editar prova sem matéria', async ({ page }) => {
    await page.getByRole('link', { name: 'Provas', exact: true }).first().click();

    await page.locator('#nextWeek').click();

    await page.locator('#calBody')
      .getByText('Prova Final')
      .first()
      .click();

    await page.locator('#modalDesc').selectOption('__outro__');

    await page.getByRole('button', { name: 'Salvar alterações' })
      .first()
      .click();

    await expect(
      page.getByText('Informe uma matéria (máx 40 char)')
    ).toBeVisible();
  });

});
test.describe.serial('Casos de Borda - Provas', () => {

  test('não deve permitir matéria acima do limite', async ({ page }) => {
    await page.getByRole('link', { name: 'Provas', exact: true })
      .first()
      .click();

    await page.locator('#nextWeek').click();

    await page.getByRole('button', { name: 'Adicionar' })
      .first()
      .click();

    await expect(page.locator('#modalType')).toBeVisible();

    await page.locator('#modalType').selectOption('Prova Final');

    // Mostra no terminal todas as opções do select
    const options = await page
      .locator('#modalDesc option')
      .evaluateAll(options =>
        options.map(option => ({
          value: option.value,
          text: option.textContent
        }))
      );

    console.log('OPÇÕES ENCONTRADAS:', options);

    // Pausa o teste para inspeção
    await page.pause();
  });

});