import { test, expect } from '@playwright/test';


  test.beforeEach(async ({ page }) => {
    await page.goto('https://studylab.free.laravel.cloud/dashboard');
  });

  test.describe('Casos Felizes', () => {

    test('deve editar um trabalho existente com sucesso', async ({ page }) => {
      await page.getByRole('link', { name: 'Trabalhos', exact: true }).first().click();

      await page.getByRole('button', { name: 'Editar' }).first().click();

      await page
        .getByRole('textbox', { name: 'Ex: Pesquisa de História...' })
        .fill('ggk');

      await page
        .getByRole('button', { name: 'Salvar Trabalho' })
        .first()
        .click();

      await expect(
        page.getByText('Trabalho atualizado!')
      ).toBeVisible();
    });

    test('deve criar um trabalho do tipo Artigo com sucesso', async ({ page }) => {
      await page.getByRole('link', { name: 'Trabalhos', exact: true }).first().click();

      await page
        .getByRole('button', { name: 'Novo trabalho' })
        .first()
        .click();

      await page.locator('#workType').selectOption('Artigo');

      await page
        .getByRole('textbox', { name: 'Ex: Pesquisa de História...' })
        .fill('Descrição do meu artigo');

      await page.locator('#workDueDate').fill('2026-11-11');

      await page
        .getByRole('button', { name: 'Salvar Trabalho' })
        .first()
        .click();

      await expect(
        page.getByText('Trabalho criado com sucesso!')
      ).toBeVisible();
    });

  });

  test.describe('Casos Tristes / Validações', () => {

    test('não deve permitir criar trabalho sem descrição', async ({ page }) => {
      await page.getByRole('link', { name: 'Trabalhos', exact: true }).first().click();

      await page
        .getByRole('button', { name: 'Novo trabalho' })
        .first()
        .click();

      await page.locator('#workType').selectOption('Seminário');

      await page
        .getByRole('button', { name: 'Salvar Trabalho' })
        .first()
        .click();

      await expect(
        page.getByText('A descrição é obrigatória.')
      ).toBeVisible();
    });

    test('exibe erro ao salvar trabalho sem descrição', async ({ page }) => {
      await page.getByRole('link', { name: 'Trabalhos', exact: true }).first().click();

      await page.getByRole('button', { name: 'Editar' }).first().click();

      await page
        .getByRole('textbox', { name: 'Ex: Pesquisa de História...' })
        .fill('');

      await page
        .getByRole('button', { name: 'Salvar Trabalho' })
        .first()
        .click();

      await expect(
        page.getByText('A descrição é obrigatória.')
      ).toBeVisible();
    });

  });


const dataFutura = () => '2026-12-12';

test.describe.serial('Casos de Borda - Trabalhos', () => {

  test('Cadastrar trabalho com descrição de 1 caractere', async ({ page }) => {

    await page.getByRole('link', { name: 'Trabalhos', exact: true })
      .first()
      .click();

    await page
      .getByRole('button', { name: 'Novo trabalho' })
      .first()
      .click();

    await expect(page.locator('#workType')).toBeVisible();

    await page.locator('#workType').selectOption('Artigo');

    await page
      .getByRole('textbox', { name: 'Ex: Pesquisa de História...' })
      .fill('a');

    await page.locator('#workDueDate').fill(dataFutura());

    await page
      .getByRole('button', { name: 'Salvar Trabalho' })
      .first()
      .click();

    await expect(
      page.getByText('Trabalho criado com sucesso!')
    ).toBeVisible({ timeout: 10000 });
  });

  test('Cadastrar trabalho com descrição no limite máximo de caracteres', async ({ page }) => {

    await page.getByRole('link', { name: 'Trabalhos', exact: true })
      .first()
      .click();

    await page
      .getByRole('button', { name: 'Novo trabalho' })
      .first()
      .click();

    await expect(page.locator('#workType')).toBeVisible();

    await page.locator('#workType').selectOption('Artigo');

    const descricao = 'a'.repeat(500);

    await page
      .getByRole('textbox', { name: 'Ex: Pesquisa de História...' })
      .fill(descricao);

    await page.locator('#workDueDate').fill(dataFutura());

    await page
      .getByRole('button', { name: 'Salvar Trabalho' })
      .first()
      .click();

    const valor = await page
      .getByRole('textbox', { name: 'Ex: Pesquisa de História...' })
      .inputValue();

    expect(valor.length).toBeLessThanOrEqual(500);
  });

});