import { useEffect, useState } from 'react'
import type { Local } from '../types/Local'
import {
  buscarFavoritos,
  salvarFavoritos,
} from '../storage/favoritosStorage'

export default function useFavoritos() {
  const [favoritos, setFavoritos] = useState<Local[]>(() => {
    return buscarFavoritos()
  })

  useEffect(() => {
    salvarFavoritos(favoritos)

    window.dispatchEvent(new Event('favoritos-atualizados'))
  }, [favoritos])

  useEffect(() => {
    function atualizarFavoritos() {
      const favoritosSalvos = buscarFavoritos()

      setFavoritos((atuais) => {
        if (JSON.stringify(atuais) === JSON.stringify(favoritosSalvos)) {
          return atuais
        }

        return favoritosSalvos
      })
    }

    window.addEventListener('favoritos-atualizados', atualizarFavoritos)

    return () => {
      window.removeEventListener('favoritos-atualizados', atualizarFavoritos)
    }
  }, [])

  function ehFavorito(id: number): boolean {
    return favoritos.some((local) => local.id === id)
  }

  function adicionarFavorito(local: Local): void {
    setFavoritos((atuais) => {
      if (atuais.some((item) => item.id === local.id)) {
        return atuais
      }

      return [...atuais, local]
    })
  }

  function removerFavorito(id: number): void {
    setFavoritos((atuais) =>
      atuais.filter((local) => local.id !== id)
    )
  }

  function alternarFavorito(local: Local): void {
    if (ehFavorito(local.id)) {
      removerFavorito(local.id)
    } else {
      adicionarFavorito(local)
    }
  }

  return {
    favoritos,
    ehFavorito,
    adicionarFavorito,
    removerFavorito,
    alternarFavorito,
  }
}