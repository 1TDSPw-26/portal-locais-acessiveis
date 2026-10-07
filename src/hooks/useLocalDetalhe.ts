import { useCallback, useEffect, useState } from 'react'
import { buscarLocalPorId } from '../services/locaisService'
import type { Local } from '../pages/LocalDetalhe/locaisMock'

type EstadoLocalDetalhe = {
  dado: Local | undefined
  carregando: boolean
  erro: string | null
}

/**
 * Hook que encapsula a busca assíncrona de um local por id,
 * expondo os estados de carregamento, erro e dado.
 */
export function useLocalDetalhe(id: string | undefined) {
  const [estado, setEstado] = useState<EstadoLocalDetalhe>({
    dado: undefined,
    carregando: true,
    erro: null,
  })

  const carregar = useCallback(() => {
    if (!id) {
      setEstado({ dado: undefined, carregando: false, erro: null })
      return
    }
    setEstado({ dado: undefined, carregando: true, erro: null })
    buscarLocalPorId(id)
      .then((dado) => setEstado({ dado, carregando: false, erro: null }))
      .catch(() =>
        setEstado({
          dado: undefined,
          carregando: false,
          erro: 'Não foi possível carregar os detalhes do local. Tente novamente mais tarde.',
        }),
      )
  }, [id])

  useEffect(() => {
    carregar()
  }, [carregar])

  return { ...estado, recarregar: carregar }
}
