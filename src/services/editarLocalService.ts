import { locais } from '../components/Dados/Locais'
import type { Locais } from '../types/Locais'

// Campos que a edição altera. O id e as acessibilidades permanecem como estão.
export type DadosEdicao = Pick<Locais, 'nome' | 'categoria' | 'endereco' | 'descricao'>

// Tempo simulado de resposta enquanto a API real não estiver disponível.
export const ATRASO_SIMULADO_MS = 400

function aguardar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function obterLocal(id: number): Locais | undefined {
  return locais.find((local) => local.id === id)
}

/**
 * Atualiza o local informado e devolve o registro atualizado.
 * Provisório: altera a lista em memória usada pela página Locais.
 * Quando o contrato da API for documentado, trocar pelo PUT/PATCH no endpoint.
 */
export async function atualizarLocal(id: number, dados: DadosEdicao): Promise<Locais> {
  await aguardar(ATRASO_SIMULADO_MS)

  const indice = locais.findIndex((local) => local.id === id)
  if (indice === -1) {
    throw new Error('Local não encontrado.')
  }

  const nome = dados.nome.trim()
  const endereco = dados.endereco.trim()
  const categoria = dados.categoria.trim()
  const descricao = dados.descricao.trim()

  if (!nome || !endereco || !categoria || !descricao) {
    throw new Error('Preencha todos os campos obrigatórios.')
  }

  const jaExiste = locais.some(
    (local) =>
      local.id !== id &&
      local.nome.toLowerCase() === nome.toLowerCase() &&
      local.endereco.toLowerCase() === endereco.toLowerCase(),
  )
  if (jaExiste) {
    throw new Error('Já existe outro local cadastrado com este nome e endereço.')
  }

  const atualizado: Locais = { ...locais[indice], nome, categoria, endereco, descricao }
  locais[indice] = atualizado
  return atualizado
}