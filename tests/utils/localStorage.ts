import type { Page } from '@playwright/test'
import { CHAVE_LOCAIS } from '../../src/services/locaisService'
import type { Local } from '../../src/types/Local'

/** Local no formato gravado pelo serviço, aceito também como dado somente leitura. */
export type LocalPersistido = Readonly<Omit<Local, 'acessibilidades'>> & {
  readonly acessibilidades: readonly string[]
}

/** Estrutura gravada em `CHAVE_LOCAIS` por src/services/locaisService.ts. */
export type EstadoLocaisPersistido = {
  proximoId: number
  locais: Local[]
}

const PREFIXO_MARCADOR = 'portal-locais-acessiveis:e2e:preparacao:'
let preparacoes = 0

/**
 * Substitui todo o localStorage da aba pelos itens informados antes que qualquer script
 * da aplicação seja executado no próximo carregamento de documento. Chame antes de `page.goto`.
 *
 * Cada chamada é aplicada uma única vez por aba: recarregar ou navegar depois disso preserva
 * o que a aplicação gravou durante o teste. Em chamadas sucessivas, prevalece a última.
 */
export async function prepararLocalStorage(
  page: Page,
  itens: Readonly<Record<string, string>> = {},
): Promise<void> {
  preparacoes += 1
  await page.addInitScript(
    ({ marcador, itens }) => {
      if (!location.protocol.startsWith('http') || sessionStorage.getItem(marcador) !== null) return
      sessionStorage.setItem(marcador, 'aplicada')
      localStorage.clear()
      for (const [chave, valor] of Object.entries(itens)) localStorage.setItem(chave, valor)
    },
    { marcador: `${PREFIXO_MARCADOR}${preparacoes}`, itens },
  )
}

/** Garante que a aplicação carregue sem nenhum dado persistido no localStorage. */
export async function iniciarComLocalStorageLimpo(page: Page): Promise<void> {
  await prepararLocalStorage(page)
}

/**
 * Faz a aplicação carregar exatamente os locais informados, em vez dos dados iniciais do
 * serviço. O `proximoId` gravado é o maior ID informado mais 1.
 */
export async function prepararLocaisPersistidos(
  page: Page,
  locais: readonly LocalPersistido[],
): Promise<void> {
  const estado: EstadoLocaisPersistido = {
    proximoId: Math.max(0, ...locais.map((local) => local.id)) + 1,
    locais: locais.map((local) => ({ ...local, acessibilidades: [...local.acessibilidades] })),
  }
  await prepararLocalStorage(page, { [CHAVE_LOCAIS]: JSON.stringify(estado) })
}

/**
 * Limpa imediatamente o localStorage do documento aberto, que precisa estar na origem da
 * aplicação (depois de `page.goto`). Telas já renderizadas só refletem a limpeza ao recarregar.
 */
export async function limparLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.clear())
}

/** Lê o estado gravado pelo serviço de locais, ou `null` quando nada foi gravado. */
export async function lerLocaisPersistidos(page: Page): Promise<EstadoLocaisPersistido | null> {
  const salvo = await page.evaluate((chave) => localStorage.getItem(chave), CHAVE_LOCAIS)
  return salvo === null ? null : (JSON.parse(salvo) as EstadoLocaisPersistido)
}
