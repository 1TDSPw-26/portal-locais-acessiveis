import type { Local } from '../types/Local'

const CHAVE_FAVORITOS = 'favoritos'

export function buscarFavoritos(): Local[] {
  const dados = localStorage.getItem(CHAVE_FAVORITOS)

  if (!dados) {
    return []
  }

  try {
    return JSON.parse(dados) as Local[]
  } catch {
    return []
  }
}

export function salvarFavoritos(favoritos: Local[]): void {
  localStorage.setItem(
    CHAVE_FAVORITOS,
    JSON.stringify(favoritos)
  )
}