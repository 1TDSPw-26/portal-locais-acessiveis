import { describe, expect, it } from 'vitest'
import { locais as locaisIniciais } from '../components/Dados/Locais'
import {
  ArmazenamentoLocaisError,
  CHAVE_LOCAIS,
  LocalNaoEncontradoError,
  buscarLocalPorId,
  excluirLocal,
  listarLocais,
} from './locaisService'

describe('locaisService', () => {
  it('lista os locais iniciais quando não há nada salvo', () => {
    expect(listarLocais()).toEqual(locaisIniciais)
  })

  it('exclui o local e persiste a remoção', () => {
    const removido = excluirLocal(4)

    expect(removido.nome).toBe('Parque Municipal')
    expect(listarLocais()).toHaveLength(locaisIniciais.length - 1)
    expect(listarLocais().map((local) => local.id)).not.toContain(4)
    expect(buscarLocalPorId(4)).toBeUndefined()

    const armazenamento = JSON.parse(
      localStorage.getItem(CHAVE_LOCAIS) ?? '{}',
    )
    expect(armazenamento.locais).toHaveLength(locaisIniciais.length - 1)
  })

  it('lança erro ao excluir um id inexistente sem alterar a lista', () => {
    expect(() => excluirLocal(999)).toThrow(LocalNaoEncontradoError)
    expect(listarLocais()).toHaveLength(locaisIniciais.length)
  })

  it('lança erro quando o armazenamento está corrompido', () => {
    localStorage.setItem(CHAVE_LOCAIS, '{inválido')
    expect(() => listarLocais()).toThrow(ArmazenamentoLocaisError)
  })
})
