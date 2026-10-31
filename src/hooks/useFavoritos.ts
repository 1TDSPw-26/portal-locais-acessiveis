import type { Local } from '../types/Local'
import { useMemo, useState, useSyncExternalStore } from 'react'
import {
  assinarFavoritos,
  atualizarFavorito,
  FAVORITOS_INDISPONIVEIS,
  lerFavoritos,
  lerSnapshotFavoritos,
} from '../storage/favoritosStorage'

const snapshotServidor = () => null

export default function useFavoritos() {
  const snapshot = useSyncExternalStore(
    assinarFavoritos,
    lerSnapshotFavoritos,
    snapshotServidor,
  )
  const favoritos = useMemo(() => lerFavoritos(snapshot), [snapshot])
  const [erro, setErro] = useState<string | null>(null)

  function atualizar(valor: number | Local, acao: 'alternar' | 'remover' | 'adicionar'): boolean {
    try {
      atualizarFavorito(valor, acao)
      setErro(null)
      return true
    } catch {
      setErro('Não foi possível salvar os favoritos neste navegador. Tente novamente.')
      return false
    }
  }

  return {
    favoritos,
    ehFavorito: (id: number) => favoritos.some((local) => local.id === id),
    adicionarFavorito: (local: Local) => atualizar(local, 'adicionar'),
    alternarFavorito: (local: Local) => atualizar(local, 'alternar'),
    removerFavorito: (id: number) => atualizar(id, 'remover'),
    erro: snapshot === FAVORITOS_INDISPONIVEIS
      ? 'Não foi possível acessar os favoritos neste navegador.'
      : erro,
  }
}
