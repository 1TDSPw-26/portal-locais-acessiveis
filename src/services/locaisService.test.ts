import { beforeEach, describe, expect, it } from 'vitest'
import { locais as locaisIniciais } from '../components/Dados/Locais'
import type { NovoLocal } from '../types/Local'
import {
  ArmazenamentoLocaisError,
  CHAVE_LOCAIS,
  atualizarLocal,
  buscarLocalPorId,
  cadastrarLocal,
  excluirLocal,
  listarLocais,
  LocalNaoEncontradoError,
} from './locaisService'

const novoLocal: NovoLocal = {
  nome: 'Museu Acessível',
  categoria: 'Cultura',
  endereco: 'Av. Paulista, 1000',
  descricao: 'Museu com rampa',
  acessibilidades: ['Rampa'],
}

beforeEach(() => {
  localStorage.clear()
})

describe('locaisService', () => {
  it('lista os locais iniciais quando não há dados salvos', () => {
    expect(listarLocais()).toEqual(locaisIniciais)
  })

  it('busca por ID e valida IDs inválidos', () => {
    expect(buscarLocalPorId(1)?.nome).toBe('Biblioteca Municipal')
    expect(buscarLocalPorId(9999)).toBeUndefined()
    expect(() => buscarLocalPorId(0)).toThrow()
  })

  it('cadastra e persiste um local novo', () => {
    const cadastrado = cadastrarLocal(novoLocal)

    expect(cadastrado.id).toBeGreaterThan(locaisIniciais.length)
    expect(cadastrado.acessibilidades).toEqual(['Rampa'])
    expect(buscarLocalPorId(cadastrado.id)).toEqual(cadastrado)
  })

  it('recusa cadastro sem dados obrigatórios', () => {
    expect(() => cadastrarLocal({ ...novoLocal, nome: ' ' })).toThrow()
    expect(() => cadastrarLocal({ ...novoLocal, acessibilidades: [' '] })).toThrow()
  })

  it('atualiza um local existente e mantém o ID', () => {
    const atualizado = atualizarLocal(1, novoLocal)

    expect(atualizado).toEqual({ ...novoLocal, id: 1 })
    expect(buscarLocalPorId(1)).toEqual(atualizado)
  })

  it('lança erro ao atualizar um local inexistente', () => {
    expect(() => atualizarLocal(9999, novoLocal)).toThrow(LocalNaoEncontradoError)
  })

  it('exclui e persiste a remoção de um local', () => {
    const removido = excluirLocal(4)

    expect(removido.nome).toBe('Parque Municipal')
    expect(buscarLocalPorId(4)).toBeUndefined()
    expect(listarLocais()).toHaveLength(locaisIniciais.length - 1)
  })

  it('lança erro ao excluir um local inexistente sem alterar a lista', () => {
    expect(() => excluirLocal(9999)).toThrow(LocalNaoEncontradoError)
    expect(listarLocais()).toHaveLength(locaisIniciais.length)
  })

  it('detecta armazenamento corrompido', () => {
    localStorage.setItem(CHAVE_LOCAIS, '{json inválido}')

    expect(() => listarLocais()).toThrow(ArmazenamentoLocaisError)
  })
})
