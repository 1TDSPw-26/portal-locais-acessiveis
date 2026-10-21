import { test, expect, type Page } from '@playwright/test'

async function preencherCadastro(page: Page) {
  await page.getByLabel('Nome do local').fill('Biblioteca')
  await page.getByLabel('Categoria').fill('Educação')
  await page.getByLabel(/Endere/).fill('Rua A, 10')
  await page.getByLabel(/Descri/).fill('Entrada com rampa')
}

test.describe('ConfirmDialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('banner').getByRole('link', { name: 'Cadastrar local', exact: true }).click()
    await preencherCadastro(page)
  })

  test('abre com nomes acessíveis e foco inicial no cancelamento', async ({ page }) => {
    await page.getByRole('button', { name: 'Validar dados' }).click()

    const dialog = page.getByRole('dialog', { name: 'Confirmar cadastro' })
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAccessibleDescription(/Confirme o cadastro/)
    await expect(page.getByRole('button', { name: 'Editar dados' })).toBeFocused()
    await expect(page.getByRole('button', { name: 'Confirmar cadastro' })).toBeVisible()
    await expect(dialog).toHaveAttribute('aria-labelledby', /.+/)
    await expect(dialog).toHaveAttribute('aria-describedby', /.+/)
  })

  test('fecha pelo cancelamento e devolve o foco ao controle que abriu', async ({ page }) => {
    const abrir = page.getByRole('button', { name: 'Validar dados' })
    await abrir.click()

    await page.getByRole('button', { name: 'Editar dados' }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(abrir).toBeFocused()
  })

  test('fecha com Escape e mantém o foco no controle de abertura', async ({ page }) => {
    const abrir = page.getByRole('button', { name: 'Validar dados' })
    await abrir.click()

    await page.keyboard.press('Escape')

    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(abrir).toBeFocused()
  })

  test('confirma uma única vez e fecha o diálogo', async ({ page }) => {
    await page.getByRole('button', { name: 'Validar dados' }).click()

    await page.getByRole('button', { name: 'Confirmar cadastro' }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(page.getByRole('status')).toContainText('cadastrado')
  })

  test('o diálogo fechado não disponibiliza seus botões para teclado', async ({ page }) => {
    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'Editar dados' })).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Confirmar cadastro' })).toHaveCount(0)
  })
})
