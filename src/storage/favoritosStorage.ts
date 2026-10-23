export const CHAVE_FAVORITOS = 'portal-locais-acessiveis:favoritos:v1'
export const FAVORITOS_INDISPONIVEIS = 'favoritos:indisponiveis'
const EVENTO_FAVORITOS = 'favoritos-atualizados'

export function lerSnapshotFavoritos(): string | null {
  try {
    return window.localStorage.getItem(CHAVE_FAVORITOS)
  } catch {
    return FAVORITOS_INDISPONIVEIS
  }
}

export function lerFavoritos(snapshot: string | null): number[] {
  try {
    const dados: unknown = JSON.parse(snapshot ?? '[]')
    if (!Array.isArray(dados)) return []

    return [...new Set(dados.filter(
      (id): id is number =>
        typeof id === 'number' && Number.isSafeInteger(id) && id > 0,
    ))]
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
  id: number,
  acao: 'alternar' | 'remover',
): void {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('Identificador de local inválido.')
  }

  const snapshot = lerSnapshotFavoritos()
  if (snapshot === FAVORITOS_INDISPONIVEIS) {
    throw new Error('Não foi possível acessar os favoritos neste navegador.')
  }

  const atuais = lerFavoritos(snapshot)
  const proximos = acao === 'remover' || atuais.includes(id)
    ? atuais.filter((atual) => atual !== id)
    : [...atuais, id]

  window.localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(proximos))
  window.dispatchEvent(new Event(EVENTO_FAVORITOS))
}
