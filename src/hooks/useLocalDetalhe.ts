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
  const [versao, setVersao] = useState(0)

  const recarregar = useCallback(() => {
    setEstado({ dado: undefined, carregando: true, erro: null })
    setVersao((v) => v + 1)
  }, [])

  useEffect(() => {
    if (!id) {
      return
    }

    let cancelado = false
    buscarLocalPorId(id)
      .then((dado) => {
        if (!cancelado) setEstado({ dado, carregando: false, erro: null })
      })
      .catch(() => {
        if (!cancelado) {
          setEstado({
            dado: undefined,
            carregando: false,
            erro: 'Não foi possível carregar os detalhes do local. Tente novamente mais tarde.',
          })
        }
      })

    return () => {
      cancelado = true
    }
  }, [id, versao])

  return { ...estado, recarregar }
}
