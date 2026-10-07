import type { Locais } from '../types/Locais'
import { locais as dadosMock } from '../components/Dados/Locais'
import { buscarLocalPorId as buscarMock } from '../pages/LocalDetalhe/locaisMock'
import type { Local } from '../pages/LocalDetalhe/locaisMock'

/**
 * Simula o tempo de resposta de uma API real.
 * Em produção será substituído por fetch/axios.
 */
const LATENCIA_MS = 800

function simularLatencia<T>(dados: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(dados), LATENCIA_MS))
}

/** Busca todos os locais (simulação assíncrona). */
export async function buscarLocais(): Promise<Locais[]> {
  return simularLatencia(dadosMock)
}

/** Busca um local pelo id (simulação assíncrona). */
export async function buscarLocalPorId(id: string): Promise<Local | undefined> {
  return simularLatencia(buscarMock(id))
}
