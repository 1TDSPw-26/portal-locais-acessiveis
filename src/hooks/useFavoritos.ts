import { useMemo, useState, useSyncExternalStore } from 'react'
import {
  assinarFavoritos,
  atualizarFavorito,
  FAVORITOS_INDISPONIVEIS,
  lerFavoritos,
  lerSnapshotFavoritos,
} from '../storage/favoritosStorage'

const snapshotServidor = () => null

export function useFavoritos() {
  const snapshot = useSyncExternalStore(
    assinarFavoritos,
    lerSnapshotFavoritos,
    snapshotServidor,
  )
  const favoritos = useMemo(() => lerFavoritos(snapshot), [snapshot])
  const [erro, setErro] = useState<string | null>(null)

  function atualizar(id: number, acao: 'alternar' | 'remover'): boolean {
    try {
      atualizarFavorito(id, acao)
      setErro(null)
      return true
    } catch {
      setErro('Não foi possível salvar os favoritos neste navegador. Tente novamente.')
      return false
    }
  }

  return {
    favoritos,
    ehFavorito: (id: number) => favoritos.includes(id),
    alternarFavorito: (id: number) => atualizar(id, 'alternar'),
    removerFavorito: (id: number) => atualizar(id, 'remover'),
    erro: snapshot === FAVORITOS_INDISPONIVEIS
      ? 'Não foi possível acessar os favoritos neste navegador.'
      : erro,
  }
}
