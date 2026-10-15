import { useCallback, useEffect, useState } from 'react'
import type { Local } from '../types/Local'
import { listarLocais } from '../services/locaisService'

type EstadoLocais = { dados: Local[]; carregando: boolean; erro: string | null }

export function useLocais() {
  const [estado, setEstado] = useState<EstadoLocais>({ dados: [], carregando: true, erro: null })
  const [versao, setVersao] = useState(0)
  const recarregar = useCallback(() => {
    setEstado({ dados: [], carregando: true, erro: null })
    setVersao((valor) => valor + 1)
  }, [])

  useEffect(() => {
    let cancelado = false
    try {
      const dados = listarLocais()
      // eslint-disable-next-line react/set-state-in-effect
      if (!cancelado) setEstado({ dados, carregando: false, erro: null })
    } catch {
      // eslint-disable-next-line react/set-state-in-effect
      if (!cancelado) setEstado({ dados: [], carregando: false, erro: 'Não foi possível carregar os locais. Tente novamente mais tarde.' })
    }
    return () => { cancelado = true }
  }, [versao])

  return { ...estado, recarregar }
}
