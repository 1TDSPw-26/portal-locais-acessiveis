import { expect, test } from '@playwright/test'
import {
  cadastroValido,
  cadastrosInvalidos,
  localPersistido,
  mensagensErroCampo,
  mensagensStatusCadastro,
  recursosAcessibilidade,
} from './fixtures/cadastro'
import {
  abrirCadastro,
  cadastrarPeloFormulario,
  campoCadastro,
  camposCadastro,
  dialogoConfirmacaoCadastro,
  enviarCadastro,
  preencherCadastro,
  recursoCadastro,
  statusCadastro,
} from './utils/formulario'
import {
  iniciarComLocalStorageLimpo,
  lerLocaisPersistidos,
  limparLocalStorage,
  prepararLocaisPersistidos,
} from './utils/localStorage'

test.describe('Utilitários E2E do cadastro', () => {
  test.beforeEach(async ({ page }) => {
    await iniciarComLocalStorageLimpo(page)
  })

  test('inicia limpo, preenche pelos helpers e não salva antes da confirmação', async ({ page }) => {
    await abrirCadastro(page)
    expect(await lerLocaisPersistidos(page)).toBeNull()

    await preencherCadastro(page, cadastroValido)

    for (const campo of camposCadastro) {
      await expect(campoCadastro(page, campo)).toHaveValue(cadastroValido[campo])
    }
    for (const recurso of recursosAcessibilidade) {
      await expect(recursoCadastro(page, recurso)).toBeChecked({
        checked: cadastroValido.acessibilidades.includes(recurso),
      })
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

    await enviarCadastro(page)

    await expect(dialogoConfirmacaoCadastro(page)).toBeVisible()
    await expect(statusCadastro(page)).toHaveText(mensagensStatusCadastro.aguardandoConfirmacao)
    expect(await lerLocaisPersistidos(page)).toBeNull()
  })

  test('cadastra sobre um estado preparado e preserva os dados ao recarregar', async ({ page }) => {
    await prepararLocaisPersistidos(page, [localPersistido])
    await abrirCadastro(page)

    await cadastrarPeloFormulario(page, cadastroValido)

    await expect(dialogoConfirmacaoCadastro(page)).toHaveCount(0)
    await expect(statusCadastro(page)).toHaveText(mensagensStatusCadastro.sucesso(cadastroValido.nome))
    const esperado = {
      proximoId: localPersistido.id + 2,
      locais: [localPersistido, { id: localPersistido.id + 1, ...cadastroValido }],
    }
    expect(await lerLocaisPersistidos(page)).toEqual(esperado)

    await page.reload()
    expect(await lerLocaisPersistidos(page)).toEqual(esperado)

    await limparLocalStorage(page)
    expect(await lerLocaisPersistidos(page)).toBeNull()
  })

  for (const cenario of cadastrosInvalidos) {
    test(`rejeita ${cenario.titulo} sem persistir dados`, async ({ page }) => {
      await abrirCadastro(page)
      await preencherCadastro(page, cenario.dados)
      await enviarCadastro(page)

      await expect(campoCadastro(page, cenario.camposInvalidos[0])).toBeFocused()
      for (const campo of camposCadastro) {
        const controle = campoCadastro(page, campo)
        if (cenario.camposInvalidos.includes(campo)) {
          await expect(controle).toHaveAttribute('aria-invalid', 'true')
          await expect(controle).toHaveAccessibleDescription(mensagensErroCampo[campo])
        } else {
          await expect(controle).not.toHaveAttribute('aria-invalid')
        }
      }
      await expect(statusCadastro(page)).toHaveText(mensagensStatusCadastro.revisarCampos)
      await expect(dialogoConfirmacaoCadastro(page)).toHaveCount(0)
      expect(await lerLocaisPersistidos(page)).toBeNull()
    })
  }
})
