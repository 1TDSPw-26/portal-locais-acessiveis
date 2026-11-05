import { validarCadastro } from '../../utils/validarCadastro'
import type { DadosCadastro, ErrosCadastro, CampoCadastro } from '../../utils/validarCadastro'

export const campos = [
  { nome: 'nome', rotulo: 'Nome do local', mensagem: 'Informe o nome do local.' },
  { nome: 'categoria', rotulo: 'Categoria', mensagem: 'Informe a categoria do local.' },
  { nome: 'endereco', rotulo: 'Endereço', mensagem: 'Informe o endereço do local.' },
  { nome: 'descricao', rotulo: 'Descrição', mensagem: 'Descreva o local e suas condições de acessibilidade.' },
] as const

export type Campo = (typeof campos)[number]['nome']
export type { DadosCadastro, ErrosCadastro }
export { validarCadastro }
export type CampoObrigatorio = CampoCadastro
