import { test, expect } from '@playwright/test'

// Suíte isolada: monta apenas o ConfirmDialog real em uma página de apoio,
// sem depender de páginas do portal nem de locaisService.
// O cenário de integração com Cadastro fica em confirm-dialog.integration.spec.ts.
const HARNESS = '/tests/harness/confirm-dialog.html'

test.describe('ConfirmDialog (isolado)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HARNESS)
  })

  test('fechado, não disponibiliza o diálogo nem os botões para o teclado', async ({ page }) => {
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Cancelar' })).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Excluir' })).toHaveCount(0)
    await expect(page.locator('dialog')).toHaveCount(0)
  })

  test('abre com nomes acessíveis e foco inicial no cancelamento', async ({ page }) => {
    await page.getByRole('button', { name: 'Abrir confirmação' }).click()

    const dialog = page.getByRole('dialog', { name: 'Excluir local?' })
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAccessibleDescription('Esta ação não pode ser desfeita.')
    await expect(dialog).toHaveAttribute('aria-labelledby', /.+/)
    await expect(dialog).toHaveAttribute('aria-describedby', /.+/)
    await expect(page.getByRole('button', { name: 'Cancelar' })).toBeFocused()
    await expect(page.getByRole('button', { name: 'Excluir' })).toBeVisible()
  })

  test('não devolve o foco ao conteúdo de fundo ao navegar com Tab', async ({ page }) => {
    const abrir = page.getByRole('button', { name: 'Abrir confirmação' })
    await abrir.click()

    for (let i = 0; i < 4; i += 1) {
      await page.keyboard.press('Tab')
      await expect(abrir).not.toBeFocused()
    }
  })

  test('cancela uma única vez e devolve o foco ao controle que abriu', async ({ page }) => {
    const abrir = page.getByRole('button', { name: 'Abrir confirmação' })
    await abrir.click()

    await page.getByRole('button', { name: 'Cancelar' }).click()

    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(abrir).toBeFocused()
    await expect(page.getByRole('status')).toHaveText('Confirmações: 0 | Cancelamentos: 1')
  })

  test('fecha com Escape, cancela uma única vez e devolve o foco ao controle que abriu', async ({ page }) => {
    const abrir = page.getByRole('button', { name: 'Abrir confirmação' })
    await abrir.click()

    await page.keyboard.press('Escape')

    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(abrir).toBeFocused()
    await expect(page.getByRole('status')).toHaveText('Confirmações: 0 | Cancelamentos: 1')
  })

  test('confirma uma única vez, fecha o diálogo e devolve o foco ao controle que abriu', async ({ page }) => {
    const abrir = page.getByRole('button', { name: 'Abrir confirmação' })
    await abrir.click()

    await page.getByRole('button', { name: 'Excluir' }).click()

    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(abrir).toBeFocused()
    await expect(page.getByRole('status')).toHaveText('Confirmações: 1 | Cancelamentos: 0')
  })
})
