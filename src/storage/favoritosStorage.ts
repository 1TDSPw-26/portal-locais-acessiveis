import type { Local } from '../types/Local'

export const CHAVE_FAVORITOS = 'favoritos'
export const FAVORITOS_INDISPONIVEIS = 'favoritos:indisponiveis'
const EVENTO_FAVORITOS = 'favoritos-atualizados'

export function lerSnapshotFavoritos(): string | null {
  try {
    return window.localStorage.getItem(CHAVE_FAVORITOS)
  } catch {
    return FAVORITOS_INDISPONIVEIS
  }
}

function ehLocal(valor: unknown): valor is Local {
  if (typeof valor !== 'object' || valor === null) return false
  const local = valor as Record<string, unknown>
  return typeof local.id === 'number' && Number.isSafeInteger(local.id) && local.id > 0 &&
    ['nome', 'categoria', 'descricao', 'endereco'].every((campo) => typeof local[campo] === 'string') &&
    Array.isArray(local.acessibilidades) && local.acessibilidades.every((item) => typeof item === 'string')
}

export function lerFavoritos(snapshot: string | null): Local[] {
  try {
    const dados: unknown = JSON.parse(snapshot ?? '[]')
    if (!Array.isArray(dados)) return []
    const ids = new Set<number>()
    return dados.filter((local): local is Local => {
      if (!ehLocal(local) || ids.has(local.id)) return false
      ids.add(local.id)
      return true
    })
  } catch {
    return []
  }
}

export function assinarFavoritos(aoAtualizar: () => void): () => void {
  function aoAlterarArmazenamento(evento: StorageEvent) {
    if (evento.key === CHAVE_FAVORITOS || evento.key === null) aoAtualizar()
  }

  window.addEventListener('storage', aoAlterarArmazenamento)
  window.addEventListener(EVENTO_FAVORITOS, aoAtualizar)
  return () => {
    window.removeEventListener('storage', aoAlterarArmazenamento)
    window.removeEventListener(EVENTO_FAVORITOS, aoAtualizar)
  }
}

export function atualizarFavorito(
  valor: number | Local,
  acao: 'alternar' | 'remover' | 'adicionar',
): void {
  const id = typeof valor === 'number' ? valor : valor.id
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('Identificador de local inválido.')
  }

  const snapshot = lerSnapshotFavoritos()
  if (snapshot === FAVORITOS_INDISPONIVEIS) {
    throw new Error('Não foi possível acessar os favoritos neste navegador.')
  }

  const atuais = lerFavoritos(snapshot)
  if (acao === 'adicionar' && atuais.some((local) => local.id === id)) return

  let proximos: Local[]
  if (acao === 'remover' || atuais.some((local) => local.id === id)) {
    proximos = atuais.filter((local) => local.id !== id)
  } else {
    if (typeof valor === 'number' || !ehLocal(valor)) {
      throw new Error('Dados de local inválidos.')
    }
    proximos = [...atuais, valor]
  }

  window.localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(proximos))
  window.dispatchEvent(new Event(EVENTO_FAVORITOS))
}
