import { test, expect } from '@playwright/test'

test('erros, correção, teclado e layout do cadastro', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Cadastro', exact: true }).click()
  await page.getByRole('button', { name: 'Validar dados' }).click()
  const nome = page.getByLabel('Nome do local')
  await expect(nome).toBeFocused()
  await expect(nome).toHaveAccessibleDescription('Informe o nome do local.')
  await page.keyboard.type('Biblioteca')
  await expect(nome).not.toHaveAttribute('aria-invalid')
  for (const valor of ['Cultura', 'Rua A, 10', 'Entrada com rampa']) {
    await page.keyboard.press('Tab')
    await page.keyboard.type(valor)
  }
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Validar dados' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toContainText('nenhum local foi salvo')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  for (const campo of ['Nome do local', 'Categoria', 'Endereço', 'Descrição']) {
    await expect(page.getByLabel(campo)).toBeVisible()
  }
})
