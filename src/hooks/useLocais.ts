import { useCallback, useEffect, useState } from 'react'
import type { Locais } from '../types/Locais'
import { buscarLocais } from '../services/locaisService'

type EstadoLocais = {
  dados: Locais[]
  carregando: boolean
  erro: string | null
}

/**
 * Hook que encapsula a busca assíncrona de locais,
 * expondo os estados de carregamento, erro e dados.
 */
export function useLocais() {
  const [estado, setEstado] = useState<EstadoLocais>({
    dados: [],
    carregando: true,
    erro: null,
  })
  const [versao, setVersao] = useState(0)

  const recarregar = useCallback(() => {
    setEstado({ dados: [], carregando: true, erro: null })
    setVersao((v) => v + 1)
  }, [])

  useEffect(() => {
    let cancelado = false
    buscarLocais()
      .then((dados) => {
        if (!cancelado) setEstado({ dados, carregando: false, erro: null })
      })
      .catch(() => {
        if (!cancelado) {
          setEstado({
            dados: [],
            carregando: false,
            erro: 'Não foi possível carregar os locais. Tente novamente mais tarde.',
          })
        }
      })

    return () => {
      cancelado = true
    }
  }, [versao])

  return { ...estado, recarregar }
}
