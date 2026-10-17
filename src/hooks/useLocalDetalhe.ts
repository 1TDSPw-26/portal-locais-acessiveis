import { useCallback, useEffect, useState } from 'react'
import type { Local } from '../types/Local'
import { buscarLocalPorId } from '../services/locaisService'

type EstadoLocalDetalhe = { dado: Local | undefined; carregando: boolean; erro: string | null }

export function useLocalDetalhe(id: string | undefined) {
  const [estado, setEstado] = useState<EstadoLocalDetalhe>({ dado: undefined, carregando: true, erro: null })
  const [versao, setVersao] = useState(0)
  const recarregar = useCallback(() => {
    setEstado({ dado: undefined, carregando: true, erro: null })
    setVersao((valor) => valor + 1)
  }, [])

  useEffect(() => {
    if (!id) {
      // eslint-disable-next-line react/set-state-in-effect
      setEstado({ dado: undefined, carregando: false, erro: null })
      return
    }
    try {
      const idNumerico = Number(id)
      const dado = Number.isSafeInteger(idNumerico) ? buscarLocalPorId(idNumerico) : undefined
      // eslint-disable-next-line react/set-state-in-effect
      setEstado({ dado, carregando: false, erro: null })
    } catch {
      // eslint-disable-next-line react/set-state-in-effect
      setEstado({ dado: undefined, carregando: false, erro: 'Não foi possível carregar os detalhes do local. Tente novamente mais tarde.' })
    }
  }, [id, versao])

  return { ...estado, recarregar }
}
