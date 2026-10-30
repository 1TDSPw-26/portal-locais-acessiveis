import { renderHook } from "@testing-library/react";
import { expect, it } from "vitest";
import useFavoritos from "./useFavoritos";
import { act } from "react";

    const local = {
        id: 1,
    nome: 'Biblioteca',
    categoria: 'Cultura',
    descricao: 'Biblioteca acessível',
    endereco: 'Rua Central',
    acessibilidades: ['Rampa', 'Elevador'],
  }

  it('deve adicionar um local aos favoritos', () => {
    const { result }  = renderHook(() => useFavoritos())
    
    act(() => {
        result.current.adicionarFavorito(local)
    })

    expect(result.current.favoritos).toHaveLength(1)
    expect(result.current.ehFavorito(1)).toBe(true)
    })

    it('deve remover um local dos favoritos', () => {
    const { result } = renderHook(() => useFavoritos())

    act(() => {
      result.current.adicionarFavorito(local)
    })

    act(() => {
      result.current.removerFavorito(1)
    })

    expect(result.current.favoritos).toHaveLength(0)
  })

  it('deve salvar os favoritos no localStorage', () => {
    const { result } = renderHook(() => useFavoritos())

    act(() => {
      result.current.adicionarFavorito(local)
    })

    const salvos = JSON.parse(
        localStorage.getItem('favoritos')?? '[]'
    )

    expect(salvos).toHaveLength(1)
    expect(salvos[0].nome).toBe('Biblioteca')
  })
