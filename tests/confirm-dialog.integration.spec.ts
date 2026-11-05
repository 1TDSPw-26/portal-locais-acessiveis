import { test, expect, type Page } from '@playwright/test'

// Teste de integração do ConfirmDialog com a página Cadastro.
// É propositalmente separado de confirm-dialog.spec.ts, que deve permanecer
// isolado de páginas e serviços (critério da Issue #148).

async function preencherCadastro(page: Page) {
  await page.getByLabel('Nome do local').fill('Biblioteca')
  await page.getByLabel('Categoria').fill('Educação')
  await page.getByLabel(/Endere/).fill('Rua A, 10')
  await page.getByLabel(/Descri/).fill('Entrada com rampa')
}

test.describe('ConfirmDialog integrado ao Cadastro', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('banner').getByRole('link', { name: 'Cadastrar local', exact: true }).click()
    await preencherCadastro(page)
  })

  test('abre pela validação do cadastro com foco inicial no cancelamento', async ({ page }) => {
    await page.getByRole('button', { name: 'Validar dados' }).click()

    const dialog = page.getByRole('dialog', { name: 'Confirmar cadastro' })
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAccessibleDescription(/Confirme o cadastro/)
    await expect(page.getByRole('button', { name: 'Editar dados' })).toBeFocused()
  })

  test('devolve o foco ao botão de validação ao cancelar', async ({ page }) => {
    const abrir = page.getByRole('button', { name: 'Validar dados' })
    await abrir.click()

    await page.getByRole('button', { name: 'Editar dados' }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(abrir).toBeFocused()
  })

  test('confirma o cadastro e exibe a mensagem de sucesso', async ({ page }) => {
    await page.getByRole('button', { name: 'Validar dados' }).click()

    await page.getByRole('button', { name: 'Confirmar cadastro' }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(page.getByRole('status')).toContainText('cadastrado')
  })
})
