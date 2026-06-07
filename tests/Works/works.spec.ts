import { test, expect } from '@playwright/test';



test.describe('Gestão de Trabalhos', () => {

  test.beforeEach(async ({ page }) => {
    // Todos os testes começam direto no dashboard logados
    await page.goto('https://studylab.free.laravel.cloud/dashboard');
  });

  test.describe('Casos Felizes', () => {

    test('deve editar um trabalho existente com sucesso', async ({ page }) => {
      await page.getByRole('link', { name: 'Trabalhos', exact: true }).click();
      await page.getByRole('button', { name: 'Editar' }).first().click();
      await page.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill('ggk');
      await page.getByRole('button', { name: 'Salvar Trabalho' }).click();
      await expect(page.getByText('Trabalho atualizado!')).toBeVisible();
    });

    test('deve criar um trabalho do tipo Artigo com sucesso', async ({ page }) => {
      await page.getByRole('link', { name: 'Trabalhos', exact: true }).click();
      await page.getByRole('button', { name: 'Novo trabalho' }).click();
      await page.locator('#workType').selectOption('Artigo');
      await page.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill('Descrição do meu artigo');
      await page.locator('#workDueDate').fill('2026-11-11');
      await page.getByRole('button', { name: 'Salvar Trabalho' }).click();
      await expect(page.getByText('Trabalho criado com sucesso!')).toBeVisible();
    });
  });

  test.describe('Casos Tristes / Validações', () => {
    test('não deve permitir criar trabalho sem descrição', async ({ page }) => {
      await page.getByRole('link', { name: 'Trabalhos', exact: true }).click();
      await page.getByRole('button', { name: 'Novo trabalho' }).click();
      await page.locator('#workType').selectOption('Seminário');
      // Deixamos a descrição vazia propositalmente
      await page.getByRole('button', { name: 'Salvar Trabalho' }).click();
      
      // Valida que o erro aparece
      await expect(page.getByText('A descrição é obrigatória.')).toBeVisible();
    });
  });
});

const dataFutura = () => '2026-12-12';

test.describe.serial('Casos de Borda - Trabalhos', () => {

  // O beforeAll garante que o login seja feito apenas uma vez antes dos testes
  test.beforeAll(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Entrar' }).click();
    await page.getByRole('textbox', { name: 'nome@exemplo.com' }).fill('gabrielgirao760@gmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('12345678gG');
    await page.getByRole('button', { name: 'Entrar na plataforma' }).click();
    
    // Opcional: Aguardar o carregamento da dashboard ou página inicial logada
    await expect(page).toHaveURL(/.*dashboard/); 
  });

  test('Cadastrar trabalho com descrição de 1 caractere', async ({ page }) => {
    await page.goto('/works');
    await page.getByRole('button', { name: 'Novo trabalho' }).click();
    await page.locator('#workType').selectOption('Artigo');
    await page.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill('a');
    await page.locator('#workDueDate').fill(dataFutura());
    await page.getByRole('button', { name: 'Salvar Trabalho' }).click();
    
    await expect(page.getByText('Trabalho criado com sucesso!')).toBeVisible({ timeout: 100000 });
  });

  test('Cadastrar trabalho com descrição no limite máximo de caracteres', async ({ page }) => {
    await page.goto('/works');
    await page.getByRole('button', { name: 'Novo trabalho' }).click();
    await page.locator('#workType').selectOption('Artigo');
    // Preenche com 500 caracteres (ou o limite correto do seu sistema)
    await page.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).fill('a'.repeat(500));
    await page.locator('#workDueDate').fill(dataFutura());
    await page.getByRole('button', { name: 'Salvar Trabalho' }).click();
    
    const valor = await page.getByRole('textbox', { name: 'Ex: Pesquisa de História...' }).inputValue();
    expect(valor.length).toBeLessThanOrEqual(500);
  });

});