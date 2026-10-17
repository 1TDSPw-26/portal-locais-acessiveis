export type DadosCadastro = {
  nome: string
  categoria: string
  endereco: string
  descricao: string
}

export type CampoCadastro = keyof DadosCadastro
export type ErrosCadastro = Partial<Record<CampoCadastro, string>>

const mensagens: Record<CampoCadastro, string> = {
  nome: 'Informe o nome do local.',
  categoria: 'Informe a categoria do local.',
  endereco: 'Informe o endereço do local.',
  descricao: 'Descreva o local e suas condições de acessibilidade.',
}

export function validarCadastro(dados: DadosCadastro): ErrosCadastro {
  const erros: ErrosCadastro = {}
  for (const campo of Object.keys(mensagens) as CampoCadastro[]) {
    if (dados[campo].trim() === '') erros[campo] = mensagens[campo]
  }
  return erros
}
