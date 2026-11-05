import { expect } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'
import { recursosAcessibilidade } from '../fixtures/cadastro'
import type { CampoCadastro, DadosFormularioCadastro, RecursoAcessibilidade } from '../fixtures/cadastro'

/** Rota da página de cadastro. */
export const rotaCadastro = '/cadastro'

/** Campos de texto na ordem em que aparecem no formulário. */
export const camposCadastro: readonly CampoCadastro[] = ['nome', 'categoria', 'endereco', 'descricao']

/** Rótulo visível (nome acessível) de cada campo, o mesmo usado em tests/cadastro.spec.ts. */
export const rotulosCadastro = {
  nome: 'Nome do local',
  categoria: 'Categoria',
  endereco: 'Endereço',
  descricao: 'Descrição',
} as const satisfies Record<CampoCadastro, string>

export function campoCadastro(page: Page, campo: CampoCadastro): Locator {
  return page.getByLabel(rotulosCadastro[campo], { exact: true })
}

export function recursoCadastro(page: Page, recurso: RecursoAcessibilidade): Locator {
  return page
    .getByRole('group', { name: 'Recursos de acessibilidade' })
    .getByRole('checkbox', { name: recurso, exact: true })
}

export function botaoValidarCadastro(page: Page): Locator {
  return page.getByRole('button', { name: 'Validar dados' })
}

export function statusCadastro(page: Page): Locator {
  return page.getByRole('status')
}

export function dialogoConfirmacaoCadastro(page: Page): Locator {
  return page.getByRole('dialog', { name: 'Confirmar cadastro' })
}

/**
 * Sair de um campo de texto o valida, e a mensagem de erro inserida desloca os controles
 * abaixo dele. Focar antes do clique faz esse deslocamento ocorrer antes de o Playwright
 * calcular a posição do controle; sem isso, o clique pode cair fora dele.
 */
async function definirRecurso(page: Page, recurso: RecursoAcessibilidade, marcado: boolean): Promise<void> {
  const controle = recursoCadastro(page, recurso)
  await controle.focus()
  await controle.setChecked(marcado)
}

/** Acessa a página de cadastro diretamente e aguarda o formulário ser exibido. */
export async function abrirCadastro(page: Page): Promise<void> {
  await page.goto(rotaCadastro)
  await expect(page.getByRole('heading', { name: 'Cadastrar local', exact: true })).toBeVisible()
}

/**
 * Preenche somente os valores informados. Com `acessibilidades`, desmarca os recursos
 * ausentes e marca os informados nessa ordem, que é a ordem persistida pelo serviço.
 */
export async function preencherCadastro(
  page: Page,
  dados: Partial<DadosFormularioCadastro>,
): Promise<void> {
  for (const campo of camposCadastro) {
    const valor = dados[campo]
    if (valor !== undefined) await campoCadastro(page, campo).fill(valor)
  }

  const selecionados = dados.acessibilidades
  if (selecionados === undefined) return
  for (const recurso of recursosAcessibilidade) {
    if (!selecionados.includes(recurso)) await definirRecurso(page, recurso, false)
  }
  for (const recurso of selecionados) await definirRecurso(page, recurso, true)
}

/** Aciona "Validar dados": exibe os erros ou, com dados válidos, abre a confirmação. */
export async function enviarCadastro(page: Page): Promise<void> {
  const botao = botaoValidarCadastro(page)
  // Mesmo motivo de definirRecurso: o último campo é validado ao perder o foco.
  await botao.focus()
  await botao.click()
}

/** Confirma o cadastro no diálogo aberto por `enviarCadastro`. */
export async function confirmarCadastro(page: Page): Promise<void> {
  await dialogoConfirmacaoCadastro(page).getByRole('button', { name: 'Confirmar cadastro', exact: true }).click()
}

/** Preenche, valida e confirma o cadastro, deixando as verificações de resultado para a suíte. */
export async function cadastrarPeloFormulario(
  page: Page,
  dados: DadosFormularioCadastro,
): Promise<void> {
  await preencherCadastro(page, dados)
  await enviarCadastro(page)
  await confirmarCadastro(page)
}
