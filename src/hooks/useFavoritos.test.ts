import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useFavoritos from './useFavoritos'
import { listarLocais } from '../services/locaisService'
import { CHAVE_FAVORITOS } from '../storage/favoritosStorage'

const [primeiroLocal, segundoLocal] = listarLocais()
const primeiroId = primeiroLocal!.id

afterEach(() => { vi.restoreAllMocks() })

describe('useFavoritos', () => {
  it('adiciona, remove e mantém os favoritos após remontar', () => {
    const primeiro = renderHook(() => useFavoritos())
    expect(primeiro.result.current.favoritos).toEqual([])

    act(() => { primeiro.result.current.alternarFavorito(primeiroLocal!) })
    expect(primeiro.result.current.ehFavorito(primeiroId)).toBe(true)
    expect(JSON.parse(localStorage.getItem(CHAVE_FAVORITOS)!)).toEqual([primeiroLocal])
    primeiro.unmount()

    const segundo = renderHook(() => useFavoritos())
    expect(segundo.result.current.favoritos).toEqual([primeiroLocal])
    act(() => { segundo.result.current.removerFavorito(primeiroId) })
    expect(segundo.result.current.favoritos).toEqual([])
    expect(localStorage.getItem(CHAVE_FAVORITOS)).toBe('[]')
  })

  it('não remove um favorito ao adicioná-lo duas vezes antes de renderizar', () => {
    const { result } = renderHook(() => useFavoritos())
    act(() => {
      result.current.adicionarFavorito(primeiroLocal!)
      result.current.adicionarFavorito(primeiroLocal!)
    })
    expect(result.current.favoritos).toEqual([primeiroLocal])
  })

  it('sincroniza consumidores sem perder alterações sucessivas', () => {
    const primeiro = renderHook(() => useFavoritos())
    const segundo = renderHook(() => useFavoritos())

    act(() => {
      primeiro.result.current.alternarFavorito(primeiroLocal!)
      segundo.result.current.alternarFavorito(segundoLocal!)
    })
    expect(primeiro.result.current.favoritos).toEqual([primeiroLocal, segundoLocal])
    expect(segundo.result.current.favoritos).toEqual([primeiroLocal, segundoLocal])

    act(() => { segundo.result.current.alternarFavorito(primeiroLocal!) })
    expect(primeiro.result.current.favoritos).toEqual([segundoLocal])
  })

  it('reflete alterações e limpeza vindas de outra aba', () => {
    const { result } = renderHook(() => useFavoritos())
    act(() => {
      localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([segundoLocal]))
      window.dispatchEvent(new StorageEvent('storage', {
        key: CHAVE_FAVORITOS, storageArea: localStorage,
      }))
    })
    expect(result.current.favoritos).toEqual([segundoLocal])

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
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([primeiroLocal, primeiroLocal, "2", segundoLocal, -3, null]))
    const { result } = renderHook(() => useFavoritos())
    expect(result.current.favoritos).toEqual([primeiroLocal, segundoLocal])
  })

  it('informa falha de gravação e mantém os favoritos anteriores', () => {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([primeiroLocal]))
    const { result } = renderHook(() => useFavoritos())
    const gravacao = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Sem espaço')
    })

    act(() => { expect(result.current.removerFavorito(primeiroId)).toBe(false) })
    expect(result.current.favoritos).toEqual([primeiroLocal])
    expect(result.current.erro).toMatch(/Não foi possível salvar/)

    gravacao.mockRestore()
    act(() => { expect(result.current.removerFavorito(primeiroId)).toBe(true) })
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
    act(() => { expect(result.current.alternarFavorito({ ...primeiroLocal!, id: 0 })).toBe(false) })
    expect(localStorage.getItem(CHAVE_FAVORITOS)).toBeNull()
  })
})
