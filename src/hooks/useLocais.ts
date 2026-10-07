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

  const carregar = useCallback(() => {
    setEstado({ dados: [], carregando: true, erro: null })
    buscarLocais()
      .then((dados) => setEstado({ dados, carregando: false, erro: null }))
      .catch(() =>
        setEstado({
          dados: [],
          carregando: false,
          erro: 'Não foi possível carregar os locais. Tente novamente mais tarde.',
        }),
      )
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  return { ...estado, recarregar: carregar }
}
