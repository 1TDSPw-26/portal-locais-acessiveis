import { locais as locaisIniciais } from '../pages/LocalDetalhe/locaisMock'
import type { Local } from '../pages/LocalDetalhe/locaisMock'

// Enquanto a API não estiver disponível, os locais ficam no localStorage.
// Na primeira visita a lista parte dos dados fictícios de locaisMock.
export const CHAVE_LOCAIS = 'acessolocal:locais'

export class LocalNaoEncontradoError extends Error {
  constructor(id: string) {
    super(`Local com id "${id}" não encontrado.`)
    this.name = 'LocalNaoEncontradoError'
  }
}

function lerArmazenamento(): Local[] {
  const salvo = localStorage.getItem(CHAVE_LOCAIS)

  if (salvo === null) {
    return [...locaisIniciais]
  }

  try {
    const dados: unknown = JSON.parse(salvo)
    return Array.isArray(dados) ? (dados as Local[]) : [...locaisIniciais]
  } catch {
    return [...locaisIniciais]
  }
}

function salvarArmazenamento(locais: Local[]) {
  localStorage.setItem(CHAVE_LOCAIS, JSON.stringify(locais))
}

export function listarLocais(): Local[] {
  return lerArmazenamento()
}

export function buscarLocalPorId(id: string): Local | undefined {
  return lerArmazenamento().find((local) => local.id === id)
}

/**
 * Remove o local informado e devolve o registro excluído.
 * Lança LocalNaoEncontradoError quando o id não existe.
 */
export function excluirLocal(id: string): Local {
  const locais = lerArmazenamento()
  const local = locais.find((item) => item.id === id)

  if (!local) {
    throw new LocalNaoEncontradoError(id)
  }

  salvarArmazenamento(locais.filter((item) => item.id !== id))
  return local
}
