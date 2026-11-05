import { renderHook, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useFavoritos from './useFavoritos'

const local = {
  id: 1,
  nome: 'Biblioteca',
  categoria: 'Cultura',
  descricao: 'Biblioteca acessível',
  endereco: 'Rua Central',
  acessibilidades: ['Rampa', 'Elevador'],
}

beforeEach(() => localStorage.clear())
afterEach(() => vi.restoreAllMocks())

describe('operações básicas', () => {
  it('deve adicionar um local aos favoritos', () => {
    const { result } = renderHook(() => useFavoritos())

    act(() => result.current.adicionarFavorito(local))

    expect(result.current.favoritos).toHaveLength(1)
    expect(result.current.ehFavorito(1)).toBe(true)
  })

  it('deve remover um local dos favoritos', () => {
    const { result } = renderHook(() => useFavoritos())

    act(() => result.current.adicionarFavorito(local))
    act(() => result.current.removerFavorito(1))

    expect(result.current.favoritos).toHaveLength(0)
  })

  it('deve salvar os favoritos no localStorage', () => {
    const { result } = renderHook(() => useFavoritos())

    act(() => result.current.adicionarFavorito(local))

    const salvos = JSON.parse(localStorage.getItem('favoritos') ?? '[]')
    expect(salvos).toHaveLength(1)
    expect(salvos[0].nome).toBe('Biblioteca')
  })
})

describe('remontagem e recarregamento', () => {
  it('mantém os favoritos após desmontar e montar de novo', () => {
    const primeiro = renderHook(() => useFavoritos())
    act(() => primeiro.result.current.adicionarFavorito(local))
    primeiro.unmount()

    const segundo = renderHook(() => useFavoritos())

    expect(segundo.result.current.favoritos).toEqual([local])
    expect(segundo.result.current.ehFavorito(1)).toBe(true)
  })

  it('carrega favoritos já existentes no storage', () => {
    localStorage.setItem('favoritos', JSON.stringify([local]))

    const { result } = renderHook(() => useFavoritos())

    expect(result.current.ehFavorito(1)).toBe(true)
    expect(result.current.erro).toBeNull()
  })

  it('sincroniza duas instâncias do hook', () => {
    const a = renderHook(() => useFavoritos())
    const b = renderHook(() => useFavoritos())

    act(() => a.result.current.adicionarFavorito(local))

    expect(b.result.current.ehFavorito(1)).toBe(true)
  })
})

describe('dados inválidos no storage', () => {
  it('não quebra com JSON malformado', () => {
    localStorage.setItem('favoritos', '{quebrado')

    const { result } = renderHook(() => useFavoritos())

    expect(result.current.favoritos).toEqual([])
    expect(() => result.current.ehFavorito(1)).not.toThrow()
    expect(result.current.erro).toMatch(/corrompidos/)
  })

  it.each(['null', '{}', '"texto"', '42'])(
    'não quebra com JSON válido de formato inválido: %s',
    (valor) => {
      localStorage.setItem('favoritos', valor)

      const { result } = renderHook(() => useFavoritos())

      expect(result.current.favoritos).toEqual([])
      expect(result.current.ehFavorito(1)).toBe(false)
      expect(result.current.erro).toMatch(/corrompidos/)
    },
  )

  it('ignora itens inválidos e mantém os válidos', () => {
    localStorage.setItem(
      'favoritos',
      JSON.stringify([local, null, { id: 2 }, 'x']),
    )

    const { result } = renderHook(() => useFavoritos())

    expect(result.current.favoritos).toEqual([local])
    expect(result.current.erro).toMatch(/corrompidos/)
  })

  it('não sobrescreve o storage só por montar o hook', () => {
    localStorage.setItem('favoritos', '{quebrado')

    renderHook(() => useFavoritos())

    expect(localStorage.getItem('favoritos')).toBe('{quebrado')
  })
})

describe('falhas de armazenamento', () => {
  it('expõe erro e começa vazio quando a leitura falha', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('bloqueado', 'SecurityError')
    })
    const setItem = vi.spyOn(Storage.prototype, 'setItem')

    const { result } = renderHook(() => useFavoritos())

    expect(result.current.favoritos).toEqual([])
    expect(result.current.erro).toMatch(/ler/)
    expect(setItem).not.toHaveBeenCalled()
  })

  it('expõe erro e mantém a alteração em memória quando a escrita falha', () => {
    const { result } = renderHook(() => useFavoritos())
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('cheio', 'QuotaExceededError')
    })

    act(() => result.current.adicionarFavorito(local))

    expect(result.current.ehFavorito(1)).toBe(true)
    expect(result.current.erro).toMatch(/salvar/)
  })

  it('limpa o erro depois de uma escrita bem-sucedida', () => {
    const { result } = renderHook(() => useFavoritos())
    const setItem = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementationOnce(() => {
        throw new DOMException('cheio', 'QuotaExceededError')
      })

    act(() => result.current.adicionarFavorito(local))
    expect(result.current.erro).toMatch(/salvar/)

    act(() => result.current.removerFavorito(1))
    expect(result.current.erro).toBeNull()
    expect(setItem).toHaveBeenCalledTimes(2)
  })
})