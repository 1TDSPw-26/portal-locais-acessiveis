import type { Campo } from '../../src/pages/Cadastro/validacao'
import type { LocalPersistido } from '../utils/localStorage'

/** Campos de texto do formulário de cadastro: `nome`, `categoria`, `endereco` e `descricao`. */
export type CampoCadastro = Campo

/**
 * Recursos exibidos como caixas de seleção no grupo "Recursos de acessibilidade",
 * na ordem da tela (src/pages/Cadastro/RecursosAcessibilidade.tsx).
 */
export const recursosAcessibilidade = [
  'Acesso para cadeirantes',
  'Banheiro acessível',
  'Elevador',
  'Piso tátil',
  'Rampas de acesso',
  'Vagas acessíveis',
] as const

export type RecursoAcessibilidade = (typeof recursosAcessibilidade)[number]

/** Valores digitados e recursos marcados no formulário de cadastro. */
export type DadosFormularioCadastro = Readonly<Record<CampoCadastro, string>> & {
  /** Recursos marcados; os demais ficam desmarcados. */
  readonly acessibilidades: readonly RecursoAcessibilidade[]
}

/**
 * Cenário de envio rejeitado pela validação do formulário (src/pages/Cadastro/validacao.ts).
 */
export type CenarioCadastroInvalido = {
  /** Descrição curta, usada no título do teste. */
  readonly titulo: string
  /** Valores preenchidos antes do envio. */
  readonly dados: DadosFormularioCadastro
  /** Campos que devem exibir erro, na ordem do formulário. O primeiro recebe o foco após o envio. */
  readonly camposInvalidos: readonly [CampoCadastro, ...CampoCadastro[]]
}

/**
 * Cadastro completo e válido. Não coincide com nenhum dos locais iniciais do serviço,
 * então a confirmação não aciona a regra de duplicidade. Os textos não têm espaços nas
 * extremidades, portanto o local persistido é idêntico ao que foi digitado.
 */
export const cadastroValido: DadosFormularioCadastro = {
  nome: 'Biblioteca Parque das Acácias',
  categoria: 'Educação',
  endereco: 'Rua das Acácias, 120 - Centro - Santo André/SP',
  descricao: 'Entrada principal com rampa, banheiro adaptado e balcão de atendimento rebaixado.',
  acessibilidades: ['Banheiro acessível', 'Rampas de acesso'],
}

/** Envios que a validação do formulário deve bloquear antes de abrir a confirmação. */
export const cadastrosInvalidos: readonly CenarioCadastroInvalido[] = [
  {
    titulo: 'todos os campos vazios',
    dados: { nome: '', categoria: '', endereco: '', descricao: '', acessibilidades: [] },
    camposInvalidos: ['nome', 'categoria', 'endereco', 'descricao'],
  },
  {
    titulo: 'campos preenchidos somente com espaços',
    dados: { nome: '   ', categoria: '   ', endereco: '   ', descricao: '   ', acessibilidades: ['Elevador'] },
    camposInvalidos: ['nome', 'categoria', 'endereco', 'descricao'],
  },
  {
    titulo: 'endereço e descrição ausentes',
    dados: { ...cadastroValido, endereco: '', descricao: '' },
    camposInvalidos: ['endereco', 'descricao'],
  },
]

/**
 * Local usado para preparar o localStorage com um estado conhecido, sem depender dos
 * locais iniciais do serviço. Com somente ele persistido, o próximo ID gerado é 8.
 */
export const localPersistido: LocalPersistido = {
  id: 7,
  nome: 'Centro Cultural Vila Esperança',
  categoria: 'Cultura',
  endereco: 'Avenida Brasil, 450 - Jardim - Santo André/SP',
  descricao: 'Espaço cultural com teatro térreo e acesso sem degraus.',
  acessibilidades: ['Acesso para cadeirantes', 'Piso tátil'],
}

/** Mensagem exibida abaixo de cada campo inválido e associada a ele por `aria-describedby`. */
export const mensagensErroCampo: Readonly<Record<CampoCadastro, string>> = {
  nome: 'Informe o nome do local.',
  categoria: 'Informe a categoria do local.',
  endereco: 'Informe o endereço do local.',
  descricao: 'Descreva o local e suas condições de acessibilidade.',
}

/** Textos anunciados na região `role="status"` do formulário. */
export const mensagensStatusCadastro = {
  /** Envio com ao menos um campo inválido. */
  revisarCampos: 'Revise os campos indicados antes de continuar.',
  /** Envio válido: o diálogo de confirmação está aberto e nada foi salvo ainda. */
  aguardandoConfirmacao: 'Dados validados. Revise os dados no diálogo de confirmação antes de concluir.',
  /** Cadastro confirmado e persistido. */
  sucesso: (nome: string) => `Local "${nome}" cadastrado com sucesso.`,
} as const
