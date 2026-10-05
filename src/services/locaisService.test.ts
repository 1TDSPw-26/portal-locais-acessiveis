import { describe, expect, it } from 'vitest'
import { locais as locaisIniciais } from '../pages/LocalDetalhe/locaisMock'
import {
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
    const removido = excluirLocal('2')

    expect(removido.nome).toBe('Parque Linear Vila Serena')
    expect(listarLocais().map((local) => local.id)).toEqual(['1', '3'])
    expect(buscarLocalPorId('2')).toBeUndefined()
    expect(JSON.parse(localStorage.getItem(CHAVE_LOCAIS) ?? '[]')).toHaveLength(2)
  })

  it('lança erro ao excluir um id inexistente sem alterar a lista', () => {
    expect(() => excluirLocal('999')).toThrow(LocalNaoEncontradoError)
    expect(listarLocais()).toHaveLength(locaisIniciais.length)
  })

  it('volta aos dados iniciais se o armazenamento estiver corrompido', () => {
    localStorage.setItem(CHAVE_LOCAIS, '{inválido')
    expect(listarLocais()).toEqual(locaisIniciais)
  })
})
