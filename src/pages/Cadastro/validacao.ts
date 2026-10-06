export const campos = [
  { nome: 'nome', rotulo: 'Nome do local', mensagem: 'Informe o nome do local.' },
  { nome: 'categoria', rotulo: 'Categoria', mensagem: 'Informe a categoria do local.' },
  { nome: 'endereco', rotulo: 'Endereço', mensagem: 'Informe o endereço do local.' },
  { nome: 'descricao', rotulo: 'Descrição', mensagem: 'Descreva o local e suas condições de acessibilidade.' },
] as const

export type Campo = (typeof campos)[number]['nome']
export type DadosCadastro = Record<Campo, string>
export type ErrosCadastro = Partial<Record<Campo, string>>

export function validarCadastro(dados: DadosCadastro): ErrosCadastro {
  const erros: ErrosCadastro = {}
  for (const campo of campos) {
    if (!dados[campo.nome].trim()) erros[campo.nome] = campo.mensagem
  }
  return erros
}
