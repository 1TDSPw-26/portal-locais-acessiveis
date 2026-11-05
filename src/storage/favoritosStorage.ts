import type { Local } from '../types/Local'

const CHAVE_FAVORITOS = 'favoritos'

export type ErroStorage = 'leitura' | 'dados-invalidos' | 'escrita'

export type ResultadoLeitura = {
  favoritos: Local[]
  erro: ErroStorage | null
}

export type ResultadoEscrita = { ok: true } | { ok: false; erro: ErroStorage }

function ehLocal(valor: unknown): valor is Local {
  if (typeof valor !== 'object' || valor === null || Array.isArray(valor)) {
    return false
  }

  const v = valor as Record<keyof Local, unknown>

  return (
    typeof v.id === 'number' &&
    Number.isSafeInteger(v.id) &&
    typeof v.nome === 'string' &&
    typeof v.categoria === 'string' &&
    typeof v.descricao === 'string' &&
    typeof v.endereco === 'string' &&
    Array.isArray(v.acessibilidades) &&
    v.acessibilidades.every((a) => typeof a === 'string')
  )
}

export function lerFavoritos(): ResultadoLeitura {
  let dados: string | null

  try {
    dados = localStorage.getItem(CHAVE_FAVORITOS)
  } catch {
    return { favoritos: [], erro: 'leitura' }
  }

  if (dados === null) {
    return { favoritos: [], erro: null }
  }

  let parsed: unknown

  try {
    parsed = JSON.parse(dados)
  } catch {
    return { favoritos: [], erro: 'dados-invalidos' }
  }

  if (!Array.isArray(parsed)) {
    return { favoritos: [], erro: 'dados-invalidos' }
  }

  const validos: Local[] = []
  const ids = new Set<number>()

  for (const item of parsed) {
    if (ehLocal(item) && !ids.has(item.id)) {
      ids.add(item.id)
      validos.push(item)
    }
  }

  return {
    favoritos: validos,
    erro: validos.length === parsed.length ? null : 'dados-invalidos',
  }
}

export function buscarFavoritos(): Local[] {
  return lerFavoritos().favoritos
}

export function salvarFavoritos(favoritos: Local[]): ResultadoEscrita {
  try {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos))
    return { ok: true }
  } catch {
    return { ok: false, erro: 'escrita' }
  }
}