import type { Locais } from '../../types/Locais'

export function obterCategorias(locais: Locais[]): string[] {
  return [...new Set(locais.map((local) => local.categoria))]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

// O valor vazio representa todas as categorias.
export function filtrarPorCategoria(locais: Locais[], categoria: string): Locais[] {
  return locais.filter((local) => !categoria || local.categoria === categoria)
}
