import { expect, test } from '@playwright/test'

const CHAVE_FAVORITOS = 'portal-locais-acessiveis:favoritos:v1'

test('consulta favoritos pela navegação e remove com teclado sem perder o estado', async ({ page }, testInfo) => {
  await page.goto('/')
  await page.evaluate((chave) => {
    localStorage.clear()
    localStorage.setItem(chave, '[1, 4, 999999]')
  }, CHAVE_FAVORITOS)

  const abrirMenu = page.getByRole('button', { name: 'Abrir menu' })
  if (await abrirMenu.isVisible()) await abrirMenu.click()
  await page.getByRole('link', { name: 'Favoritos', exact: true }).click()

  await expect(page).toHaveURL(/\/favoritos$/)
  await expect(page).toHaveTitle('Favoritos | AcessoLocal')
  await expect(page.getByRole('heading', { level: 1, name: 'Favoritos' })).toBeFocused()
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(2)
  await expect(page.getByText(/Alguns locais salvos não estão mais disponíveis/)).toBeVisible()
  await expect(page.getByRole('main')).toHaveCount(1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.screenshot({ path: testInfo.outputPath('favoritos-lista.png'), fullPage: true })

  const remover = page.getByRole('button', { name: /Remover .+ dos favoritos/ })
  await remover.first().focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(1)
  await expect(page.getByRole('heading', { level: 1, name: 'Favoritos' })).toBeFocused()
  await expect(page.getByRole('status')).toHaveText('1 local favorito disponível.')

  await page.reload()
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(1)
  await remover.first().click()
  await expect(page.getByRole('heading', { name: 'Nenhum favorito por aqui' })).toBeVisible()
  await expect(page.getByRole('status')).toHaveText('0 locais favoritos disponíveis.')
  await page.screenshot({ path: testInfo.outputPath('favoritos-vazio.png'), fullPage: true })

  await page.getByRole('link', { name: 'Explorar locais' }).click()
  await expect(page).toHaveURL(/\/locais$/)
  await expect(page.getByRole('heading', { name: 'Locais acessíveis' })).toBeVisible()
})

for (const [cenario, dados] of [
  ['sem favoritos', '[]'],
  ['armazenamento corrompido', '{'],
  ['dados inválidos e locais inexistentes', '[null, "1", -1, 999999]'],
]) {
  test(`acesso direto: ${cenario}`, async ({ page }) => {
    await page.goto('/')
    await page.evaluate(({ chave, valor }) => {
      localStorage.clear()
      localStorage.setItem(chave, valor)
    }, { chave: CHAVE_FAVORITOS, valor: dados })
    await page.goto('/favoritos')

    await expect(page).toHaveTitle('Favoritos | AcessoLocal')
    await expect(page.getByRole('heading', { name: 'Nenhum favorito por aqui' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Explorar locais' })).toHaveAttribute('href', '/locais')
    await expect(page.getByRole('heading', { level: 3 })).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Nenhum favorito por aqui' })).toBeVisible()
  })
}
