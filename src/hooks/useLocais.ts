import { useCallback, useRef, useState } from 'react'
import type { Local } from '../types/Local'
import { listarLocais } from '../services/locaisService'

type EstadoLocais = {
  dados: Local[]
  carregando: boolean
  erro: string | null
}

const MENSAGEM_ERRO = 'Não foi possível carregar os locais. Tente novamente.'

function carregarLocais(): EstadoLocais {
  try {
    return { dados: listarLocais(), carregando: false, erro: null }
  } catch {
    return { dados: [], carregando: false, erro: MENSAGEM_ERRO }
  }
}

export function useLocais() {
  const [estado, setEstado] = useState<EstadoLocais>(carregarLocais)
  const tentativaEmAndamento = useRef(false)

  const recarregar = useCallback(() => {
    if (tentativaEmAndamento.current) return
    tentativaEmAndamento.current = true
    setEstado((anterior) => ({ ...anterior, carregando: true }))

    Promise.resolve()
      .then(() => carregarLocais())
      .then((resultado) => setEstado(resultado))
      .finally(() => {
        tentativaEmAndamento.current = false
      })
  }, [])

  return { ...estado, recarregar }
}