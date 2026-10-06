import type { Local } from '../types/types'

const API_URL = 'http://localhost:8080/locais'

export async function buscarLocais(): Promise<Local[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Erro ao buscar os locais')
  }

  const locais: Local[] = await response.json()

  return locais
}