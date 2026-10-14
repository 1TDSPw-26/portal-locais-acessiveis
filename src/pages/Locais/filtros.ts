import type { Local } from '../../types/Local'

export function obterCategorias(locais: Local[]): string[] {
  return [...new Set(locais.map((local) => local.categoria))]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

// O valor vazio representa todas as categorias.
export function filtrarPorCategoria(locais: Local[], categoria: string): Local[] {
  return locais.filter((local) => !categoria || local.categoria === categoria)
}
