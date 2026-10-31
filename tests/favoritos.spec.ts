import { expect, test } from '@playwright/test'
import { locais } from '../src/components/Dados/Locais'

const CHAVE_FAVORITOS = 'favoritos'

test('consulta favoritos pela navegação e remove com teclado sem perder o estado', async ({ page }, testInfo) => {
  await page.goto('/')
  await page.evaluate((chave) => {
    localStorage.clear()
    localStorage.setItem(chave.chave, JSON.stringify(chave.locais))
  }, { chave: CHAVE_FAVORITOS, locais: [locais[0], locais[3], { ...locais[0], id: 999999 }] })

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


test('integra inclusão nos detalhes, consulta, recarga e remoção', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.goto(`/locais/${locais[0]!.id}`)
  const favoritar = page.getByRole('button', { name: 'Favoritar', exact: true })
  await favoritar.click()
  await expect(page.getByRole('button', { name: 'Desfavoritar', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.goto('/favoritos')
  await expect(page.getByRole('heading', { level: 3, name: locais[0]!.nome })).toBeVisible()
  await page.reload()
  const remover = page.getByRole('button', { name: /Remover .+ dos favoritos/ })
  await remover.focus()
  await page.keyboard.press('Enter')
  const titulo = page.getByRole('heading', { level: 1, name: 'Favoritos' })
  await expect(titulo).toBeFocused()
  await expect(titulo).toHaveCSS('outline-style', 'solid')
  await expect(page.getByRole('heading', { name: 'Nenhum favorito por aqui' })).toBeVisible()
  await page.goto(`/locais/${locais[0]!.id}`)
  await expect(page.getByRole('button', { name: 'Favoritar', exact: true })).toHaveAttribute('aria-pressed', 'false')
})
