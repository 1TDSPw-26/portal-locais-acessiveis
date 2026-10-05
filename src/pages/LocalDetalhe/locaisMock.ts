// Os locais abaixo são fictícios.

export type Local = {
  id: string
  nome: string
  categoria: string
  endereco: string
  descricao: string
  recursos: string[]
}

export const locais: Local[] = [
  {
    id: '1',
    nome: 'Biblioteca Comunitária Jardim das Letras',
    categoria: 'Cultura',
    endereco: 'Rua das Acácias, 120 - Centro, São Paulo - SP',
    descricao:
      'Biblioteca com acervo em braile, audiolivros e espaço de leitura com mesas em altura acessível.',
    recursos: [
      'Rampa de acesso',
      'Elevador',
      'Banheiro adaptado',
      'Piso tátil',
      'Atendimento em Libras',
    ],
  },
  {
    id: '2',
    nome: 'Parque Linear Vila Serena',
    categoria: 'Lazer',
    endereco: 'Avenida dos Ipês, 800 - Vila Serena, São Paulo - SP',
    descricao:
      'Parque com trilha pavimentada, bancos com encosto e área de descanso sombreada.',
    recursos: ['Rampa de acesso', 'Banheiro adaptado', 'Piso tátil'],
  },
  {
    id: '3',
    nome: 'Unidade de Atendimento ao Cidadão Norte',
    categoria: 'Serviço público',
    endereco: 'Praça da Matriz, 45 - Santana, São Paulo - SP',
    descricao:
      'Posto de atendimento com guichê rebaixado e senha com aviso sonoro e visual.',
    recursos: ['Elevador', 'Banheiro adaptado', 'Atendimento em Libras'],
  },
]

export function buscarLocalPorId(id: string): Local | undefined {
  return locais.find((local) => local.id === id)
}