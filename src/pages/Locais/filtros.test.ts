import { describe, expect, it } from 'vitest'
import type { Local } from '../../types/Local'
import { filtrarPorCategoria, obterCategorias } from './filtros'

const locais: Local[] = [
  {
    id: 1,
    nome: 'Biblioteca Central',
    categoria: 'Cultura',
    endereco: 'Rua A, 1',
    descricao: 'Acesso por rampa',
    acessibilidades: ['Rampa'],
  },
  {
    id: 2,
    nome: 'Praça da Cidade',
    categoria: 'Lazer',
    endereco: 'Rua B, 2',
    descricao: 'Piso tátil',
    acessibilidades: ['Piso tátil'],
  },
  {
    id: 3,
    nome: 'Museu Municipal',
    categoria: 'Cultura',
    endereco: 'Rua C, 3',
    descricao: 'Elevador',
    acessibilidades: ['Elevador'],
  },
]

describe('filtros de locais', () => {
  it('obtém categorias únicas em ordem alfabética', () => {
    expect(obterCategorias(locais)).toEqual(['Cultura', 'Lazer'])
  })

  it('retorna todos os locais quando nenhuma categoria é selecionada', () => {
    expect(filtrarPorCategoria(locais, '')).toEqual(locais)
  })

  it('filtra somente os locais da categoria informada', () => {
    expect(filtrarPorCategoria(locais, 'Cultura')).toEqual([
      locais[0],
      locais[2],
    ])
  })
})
