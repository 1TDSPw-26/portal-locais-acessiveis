import { locais } from '../components/Dados/Locais'
import type { Locais } from '../types/Locais'

// Dados enviados pelo formulário de cadastro. O id é gerado pelo serviço.
export type NovoLocal = Omit<Locais, 'id'>

// Tempo simulado de resposta enquanto a API real não estiver disponível.
const ATRASO_SIMULADO_MS = 800

function aguardar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Cadastra um novo local e devolve o registro criado com o id gerado.
 * Provisório: grava na lista em memória usada pela página Locais.
 * Quando o contrato da API for documentado, trocar pelo POST no endpoint.
 */
export async function cadastrarLocal(novoLocal: NovoLocal): Promise<Locais> {
  await aguardar(ATRASO_SIMULADO_MS)

  const nome = novoLocal.nome.trim()
  const endereco = novoLocal.endereco.trim()

  if (!nome || !endereco) {
    throw new Error('Nome e endereço são obrigatórios para o cadastro.')
  }

  const jaExiste = locais.some(
    (local) =>
      local.nome.toLowerCase() === nome.toLowerCase() &&
      local.endereco.toLowerCase() === endereco.toLowerCase(),
  )

  if (jaExiste) {
    throw new Error('Já existe um local cadastrado com este nome e endereço.')
  }

  const proximoId = Math.max(0, ...locais.map((local) => local.id)) + 1

  const localCriado: Locais = {
    id: proximoId,
    nome,
    descricao: novoLocal.descricao.trim(),
    endereco,
    accessibilidades: novoLocal.accessibilidades,
  }

  locais.push(localCriado)

  return localCriado
}
