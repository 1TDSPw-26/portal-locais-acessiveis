import { describe, expect, it } from 'vitest'
import { validarCadastro } from './validacao'

describe('validarCadastro', () => {
  it('retorna um erro para cada campo obrigatório vazio', () => {
    expect(
      validarCadastro({
        nome: ' ',
        categoria: '',
        endereco: '\t',
        descricao: '\n',
      }),
    ).toEqual({
      nome: 'Informe o nome do local.',
      categoria: 'Informe a categoria do local.',
      endereco: 'Informe o endereço do local.',
      descricao: 'Descreva o local e suas condições de acessibilidade.',
    })
  })

  it('aceita todos os campos preenchidos', () => {
    expect(
      validarCadastro({
        nome: 'Biblioteca Central',
        categoria: 'Cultura',
        endereco: 'Rua das Flores, 100',
        descricao: 'Entrada com rampa e banheiro acessível.',
      }),
    ).toEqual({})
  })
})
