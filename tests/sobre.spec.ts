import { expect, test } from '@playwright/test'

test('página Sobre integra conteúdo, navegação por teclado e layout responsivo', async ({ page }) => {
  await page.goto('/sobre')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Informação para tornar a cidade mais acessível',
    }),
  ).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(3)

  const explorar = page.getByRole('link', { name: 'Explorar locais' })
  await explorar.focus()
  await expect(explorar).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/locais$/)

  await page.goto('/sobre')
  const cadastrar = page.getByRole('link', { name: 'Cadastrar um local' })
  await cadastrar.focus()
  await expect(cadastrar).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/cadastro$/)

  await page.goto('/sobre')
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true)
})
