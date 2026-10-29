
import { describe, expect, it } from 'vitest'
import type { Local } from '../../types/Local'
import {
    filtrarPorCategoria,
    ordenarPorNome,
    obterCategorias,
} from './filtros'

function criarLocal(
    id: number,
    nome: string,
    categoria = 'Parque',
): Local {
    return {
        id,
        nome,
        categoria,
        endereco: 'Rua de teste',
        descricao: 'Local de teste',
    } as Local
}

describe('ordenarPorNome', () => {
    it('ordena os locais alfabeticamente pelo nome', () => {
        const locais = [
            criarLocal(1, 'Zoológico'),
            criarLocal(2, 'Biblioteca'),
            criarLocal(3, 'Academia'),
        ]

        expect(ordenarPorNome(locais).map((local) => local.nome)).toEqual([
            'Academia',
            'Biblioteca',
            'Zoológico',
        ])
    })

    it('considera acentos e diferenças entre maiúsculas e minúsculas', () => {
        const locais = [
            criarLocal(1, 'Árvore'),
            criarLocal(2, 'biblioteca'),
            criarLocal(3, 'Academia'),
        ]

        expect(ordenarPorNome(locais).map((local) => local.nome)).toEqual([
            'Academia',
            'Árvore',
            'biblioteca',
        ])
    })

    it('mantém todos os locais com nomes iguais', () => {
        const locais = [
            criarLocal(1, 'Biblioteca'),
            criarLocal(2, 'Biblioteca'),
        ]

        const resultado = ordenarPorNome(locais)

        expect(resultado).toHaveLength(2)
        expect(resultado.map((local) => local.id)).toEqual([1, 2])
    })

    it('ordena nomes vazios sem remover locais', () => {
        const locais = [
            criarLocal(1, 'Biblioteca'),
            criarLocal(2, ''),
            criarLocal(3, 'Academia'),
        ]

        expect(ordenarPorNome(locais).map((local) => local.nome)).toEqual([
            '',
            'Academia',
            'Biblioteca',
        ])
    })

    it('retorna uma lista vazia quando não há locais', () => {
        expect(ordenarPorNome([])).toEqual([])
    })

    it('não modifica a lista original', () => {
        const locais = [
            criarLocal(1, 'Zoológico'),
            criarLocal(2, 'Academia'),
        ]

        const resultado = ordenarPorNome(locais)

        expect(resultado.map((local) => local.nome)).toEqual([
            'Academia',
            'Zoológico',
        ])
        expect(locais.map((local) => local.nome)).toEqual([
            'Zoológico',
            'Academia',
        ])
    })
})

describe('obterCategorias', () => {
    it('retorna categorias únicas em ordem alfabética', () => {
        const locais = [
            criarLocal(1, 'Local A', 'Serviço público'),
            criarLocal(2, 'Local B', 'Cultura'),
            criarLocal(3, 'Local C', 'Educação'),
            criarLocal(4, 'Local D', 'Cultura'),
        ]

        expect(obterCategorias(locais)).toEqual([
            'Cultura',
            'Educação',
            'Serviço público',
        ])
    })

    it('retorna uma lista vazia quando não há locais', () => {
        expect(obterCategorias([])).toEqual([])
    })
})

describe('filtrarPorCategoria', () => {
    it('retorna somente os locais da categoria escolhida', () => {
        const locais = [
            criarLocal(1, 'Biblioteca', 'Educação'),
            criarLocal(2, 'Parque', 'Lazer'),
            criarLocal(3, 'Escola', 'Educação'),
        ]

        expect(
            filtrarPorCategoria(locais, 'Educação').map((local) => local.nome),
        ).toEqual(['Biblioteca', 'Escola'])
    })

    it('retorna todos os locais quando a categoria está vazia', () => {
        const locais = [
            criarLocal(1, 'Biblioteca', 'Educação'),
            criarLocal(2, 'Parque', 'Lazer'),
        ]

        expect(filtrarPorCategoria(locais, '')).toEqual(locais)
    })
})
