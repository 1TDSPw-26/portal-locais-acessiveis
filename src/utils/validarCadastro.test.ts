import { describe, expect, it } from 'vitest'
import { validarCadastro } from './validarCadastro'

describe('validarCadastro', () => {
  it('retorna erro para cada campo vazio ou preenchido somente com espaços', () => {
    expect(validarCadastro({ nome: ' ', categoria: '', endereco: '\t', descricao: '' })).toEqual({
      nome: 'Informe o nome do local.',
      categoria: 'Informe a categoria do local.',
      endereco: 'Informe o endereço do local.',
      descricao: 'Descreva o local e suas condições de acessibilidade.',
    })
  })

  it('não retorna erros quando todos os campos têm conteúdo', () => {
    expect(validarCadastro({
      nome: 'Biblioteca',
      categoria: 'Cultura',
      endereco: 'Rua A, 10',
      descricao: 'Entrada com rampa',
    })).toEqual({})
  })
})
