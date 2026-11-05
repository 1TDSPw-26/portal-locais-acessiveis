import { expect, test as base } from '@playwright/test'
import type { Local } from '../../src/types/Local'

const CHAVE_LOCAIS = 'portal-locais-acessiveis:locais:v1'

type ArmazenamentoLocais = {
  proximoId: number
  locais: Local[]
}

type ControleNoNavegador = {
  gravacoes: number
  falharProximaGravacao: boolean
  setItemOriginal: Storage['setItem']
}

type JanelaComControle = Window & {
  __controleExclusao?: ControleNoNavegador
}

export const locaisExclusao: Local[] = [
  {
    id: 101,
    nome: 'Local de teste para exclusão',
    categoria: 'Teste',
    descricao: 'Registro isolado usado no cenário de exclusão.',
    endereco: 'Rua de Teste, 101',
    acessibilidades: ['Acesso para cadeirantes'],
  },
  {
    id: 102,
    nome: 'Local de teste preservado',
    categoria: 'Teste',
    descricao: 'Registro isolado que deve permanecer disponível.',
    endereco: 'Rua de Teste, 102',
    acessibilidades: ['Piso tátil'],
  },
]

export type ControleExclusao = {
  falharProximaGravacao(): Promise<void>
  quantidadeDeGravacoes(): Promise<number>
  locaisPersistidos(): Promise<Local[]>
}

type Fixtures = {
  exclusao: ControleExclusao
}

export const test = base.extend<Fixtures>({
  exclusao: async ({ page }, provide) => {
    const estadoInicial: ArmazenamentoLocais = {
      proximoId: 103,
      locais: locaisExclusao,
    }

    await page.addInitScript(
      ({ chave, estado }) => {
        localStorage.setItem(chave, JSON.stringify(estado))

        const setItemOriginal = Storage.prototype.setItem
        const controle: ControleNoNavegador = {
          gravacoes: 0,
          falharProximaGravacao: false,
          setItemOriginal,
        }
        ;(window as JanelaComControle).__controleExclusao = controle

        Storage.prototype.setItem = function (key, value) {
          if (this === window.localStorage && key === chave) {
            controle.gravacoes += 1
            if (controle.falharProximaGravacao) {
              controle.falharProximaGravacao = false
              throw new DOMException(
                'Falha simulada ao gravar locais.',
                'QuotaExceededError',
              )
            }
          }

          return setItemOriginal.call(this, key, value)
        }
      },
      { chave: CHAVE_LOCAIS, estado: estadoInicial },
    )

    await provide({
      falharProximaGravacao: () =>
        page.evaluate(() => {
          const controle = (window as JanelaComControle).__controleExclusao
          if (controle) controle.falharProximaGravacao = true
        }),
      quantidadeDeGravacoes: () =>
        page.evaluate(
          () =>
            (window as JanelaComControle).__controleExclusao?.gravacoes ?? 0,
        ),
      locaisPersistidos: () =>
        page.evaluate((chave) => {
          const salvo = localStorage.getItem(chave)
          return salvo ? (JSON.parse(salvo) as ArmazenamentoLocais).locais : []
        }, CHAVE_LOCAIS),
    })
  },
})

export { expect }