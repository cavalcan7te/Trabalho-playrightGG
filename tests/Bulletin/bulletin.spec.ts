import { test, expect } from '@playwright/test';
 test.beforeEach(async ({ page }) => {
    // Todos os testes começam direto no dashboard logados
    await page.goto('https://studylab.free.laravel.cloud/dashboard');
  });

test.describe('Casos Felizes', () => {
  test('deve criar uma nota com sucesso', async ({ page }) => {
    
  await page.getByRole('link', { name: 'Boletim', exact: true }).click();
  await page.getByRole('button', { name: 'Nova nota' }).click();
  
  await page.locator('#gradeModalSubjectId').selectOption('325');
  await page.locator('#gradeModalBimester').selectOption('2');
  await page.locator('#gradeModalMidterm').fill('1');
  await page.locator('#gradeModalEndterm').fill('1');
  
  await page.getByRole('button', { name: 'Salvar nota' }).click();''
  
  // Validação (substitui o clique no texto)
  await expect(page.getByText('Nota cadastrada!')).toBeVisible();
  });
});
test('deve editar o boletim existente com sucesso', async ({ page }) => {
  await page.getByRole('link', { name: 'Boletim', exact: true }).click();
  
  await page.locator('.w-7').first().click();
  await page.locator('#gradeModalMidterm').fill('2');
  await page.getByRole('button', { name: 'Salvar alterações' }).click();
  
  await expect(page.getByText('Nota atualizada!')).toBeVisible();
  await expect(page.locator('#gradeModalMidterm')).not.toBeVisible();
});


test.describe('Casos Tristes / Validações', () => {
  test('não deve salvar nota se o bimestre não for selecionado', async ({ page }) => {
    await page.goto('https://studylab.free.laravel.cloud/');
  
    await page.getByRole('button', { name: 'Nova nota' }).click();
  
  // Preenche dados válidos, mas deixa o bimestre sem seleção (padrão)
    await page.locator('#gradeModalSubjectId').selectOption('326');
    await page.locator('#gradeModalMidterm').fill('9');
   await page.locator('#gradeModalEndterm').fill('9');
  
  // Tenta salvar sem selecionar o bimestre
   await page.getByRole('button', { name: 'Salvar nota' }).click();
  
  // Validação: confirma que a mensagem de erro específica aparece
    await expect(page.getByText('Selecione o bimestre.')).toBeVisible();
  });
 test('não deve permitir salvar ano fora do intervalo permitido', async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/');
  await page.getByRole('link', { name: 'Boletim', exact: true }).click();
  
  // Seleciona a nota e limpa o ano
  await page.locator('.w-7').first().click();
  await page.getByPlaceholder('2026').fill('');
  
  // Tenta salvar com o campo vazio
  await page.getByRole('button', { name: 'Salvar alterações' }).click();
  
  // Valida que o erro é exibido
  await expect(page.getByText('Ano entre 2000 e')).toBeVisible();
 });
 test.describe.serial('Casos de Borda - Trabalhos', () => {
  test('exibe erro ao salvar nota com valor acima do permitido', async ({ page }) => {
  await page.goto('https://studylab.free.laravel.cloud/login');

  await page.getByRole('link', { name: 'Boletim', exact: true }).click();
  await page.getByRole('button', { name: 'Nova nota' }).click();

  await page.locator('#gradeModalEndterm').fill('222');
  await page.locator('#gradeModalMidterm').fill('222');
  await page.locator('#gradeModalBimester').selectOption('3');
  await page.locator('#gradeModalSubjectId').selectOption('325');

  await page.getByRole('button', { name: 'Salvar nota' }).click();

  await expect(page.locator('#err-gradeModalEndterm')).toBeVisible();
  });
});
});


