import { test, expect } from '@playwright/test';
 test.beforeEach(async ({ page }) => {
    // Todos os testes começam direto no dashboard logados
    await page.goto('https://studylab.free.laravel.cloud/dashboard');
  });

test.describe('Casos Felizes', () => {
test('cadastra prova com sucesso', async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/login');

  await page.getByRole('link', { name: 'Provas', exact: true }).click();
  await page.getByRole('button', { name: 'Adicionar' }).first().click();

  await page.locator('#modalType').selectOption('Prova Final');
  await page.locator('#modalDesc').selectOption('Português');
  await page.locator('#modalTimeStart').fill('12:00');
  await page.locator('#modalTimeEnd').fill('17:00');

  await page.getByRole('button', { name: 'Salvar prova' }).click();

  await expect(page.getByText('Prova cadastrada! ✓')).toBeVisible();
});
test('edita prova com sucesso', async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/login');

  await page.getByRole('link', { name: 'Provas', exact: true }).click();
  await page.locator('#calBody').getByText('Prova Final').click();

  await page.locator('#modalDesc').selectOption('Literatura');
  await page.locator('#modalTimeStart').fill('14:00');
  await page.locator('#modalTimeEnd').fill('18:00');

  await page.getByRole('button', { name: 'Salvar alterações' }).click();

  await expect(page.getByText('Prova atualizada! ✓')).toBeVisible();
});
test.describe('Casos Tristes / Validações', () => {
test('exibe erro ao cadastrar prova sem matéria', async ({ page }) => {
  await page.getByRole('link', { name: 'Provas', exact: true }).click();
  await page.locator('#nextWeek').click();
  await page.getByRole('button', { name: 'Adicionar' }).nth(1).click();

  await page.locator('#modalType').selectOption('Prova Final');
  await page.getByRole('button', { name: 'Salvar prova' }).click();

  await expect(page.getByText('Informe uma matéria (máx 40 char)')).toBeVisible();
});

test('exibe erro ao editar prova sem matéria', async ({ page }) => {


  await page.getByRole('link', { name: 'Provas', exact: true }).click();
  await page.locator('#nextWeek').click();
  await page.locator('#calBody').getByText('Prova Final').click();

  await page.locator('#modalDesc').selectOption('__outro__');
  await page.getByRole('button', { name: 'Salvar alterações' }).click();

  await expect(page.getByText('Informe uma matéria (máx 40 char)')).toBeVisible();
}); 
});
});


