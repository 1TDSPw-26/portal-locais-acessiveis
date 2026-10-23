import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useFavoritos } from './useFavoritos'
import { CHAVE_FAVORITOS } from '../storage/favoritosStorage'

afterEach(() => { vi.restoreAllMocks() })

describe('useFavoritos', () => {
  it('adiciona, remove e mantém os favoritos após remontar', () => {
    const primeiro = renderHook(() => useFavoritos())
    expect(primeiro.result.current.favoritos).toEqual([])

    act(() => { primeiro.result.current.alternarFavorito(1) })
    expect(primeiro.result.current.ehFavorito(1)).toBe(true)
    expect(JSON.parse(localStorage.getItem(CHAVE_FAVORITOS)!)).toEqual([1])
    primeiro.unmount()

    const segundo = renderHook(() => useFavoritos())
    expect(segundo.result.current.favoritos).toEqual([1])
    act(() => { segundo.result.current.removerFavorito(1) })
    expect(segundo.result.current.favoritos).toEqual([])
    expect(localStorage.getItem(CHAVE_FAVORITOS)).toBe('[]')
  })

  it('sincroniza consumidores sem perder alterações sucessivas', () => {
    const primeiro = renderHook(() => useFavoritos())
    const segundo = renderHook(() => useFavoritos())

    act(() => {
      primeiro.result.current.alternarFavorito(1)
      segundo.result.current.alternarFavorito(2)
    })
    expect(primeiro.result.current.favoritos).toEqual([1, 2])
    expect(segundo.result.current.favoritos).toEqual([1, 2])

    act(() => { segundo.result.current.alternarFavorito(1) })
    expect(primeiro.result.current.favoritos).toEqual([2])
  })

  it('reflete alterações e limpeza vindas de outra aba', () => {
    const { result } = renderHook(() => useFavoritos())
    act(() => {
      localStorage.setItem(CHAVE_FAVORITOS, '[2]')
      window.dispatchEvent(new StorageEvent('storage', {
        key: CHAVE_FAVORITOS, storageArea: localStorage,
      }))
    })
    expect(result.current.favoritos).toEqual([2])

    act(() => {
      localStorage.clear()
      window.dispatchEvent(new StorageEvent('storage', { key: null }))
    })
    expect(result.current.favoritos).toEqual([])
  })

  it.each(['{', 'null', '{}', '"1"', '[null, "1", -1, 0, 1.5, {}]'])(
    'ignora armazenamento inválido: %s',
    (valor) => {
      localStorage.setItem(CHAVE_FAVORITOS, valor)
      const { result } = renderHook(() => useFavoritos())
      expect(result.current.favoritos).toEqual([])
    },
  )

  it('preserva somente identificadores válidos e sem duplicação', () => {
    localStorage.setItem(CHAVE_FAVORITOS, '[1, 1, "2", 2, -3, null]')
    const { result } = renderHook(() => useFavoritos())
    expect(result.current.favoritos).toEqual([1, 2])
  })

  it('informa falha de gravação e mantém os favoritos anteriores', () => {
    localStorage.setItem(CHAVE_FAVORITOS, '[1]')
    const { result } = renderHook(() => useFavoritos())
    const gravacao = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Sem espaço')
    })

    act(() => { expect(result.current.removerFavorito(1)).toBe(false) })
    expect(result.current.favoritos).toEqual([1])
    expect(result.current.erro).toMatch(/Não foi possível salvar/)

    gravacao.mockRestore()
    act(() => { expect(result.current.removerFavorito(1)).toBe(true) })
    expect(result.current.favoritos).toEqual([])
    expect(result.current.erro).toBeNull()
  })

  it('trata armazenamento indisponível sem quebrar a renderização', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Acesso negado')
    })
    const { result } = renderHook(() => useFavoritos())
    expect(result.current.favoritos).toEqual([])
    expect(result.current.erro).toMatch(/Não foi possível acessar/)
  })

  it('não grava identificadores inválidos', () => {
    const { result } = renderHook(() => useFavoritos())
    act(() => { expect(result.current.alternarFavorito(0)).toBe(false) })
    expect(localStorage.getItem(CHAVE_FAVORITOS)).toBeNull()
  })
})
