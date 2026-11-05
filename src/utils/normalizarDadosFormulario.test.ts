// Tests for normalizarDadosFormulario
import { expect, test, describe } from 'vitest';
import { normalizarDadosFormulario } from './normalizarDadosFormulario';

describe('normalizarDadosFormulario', () => {
  test('trims string fields and preserves other types', () => {
    const input = {
      nome: '  João Silva  ',
      idade: 30,
      ativo: true,
    } as const;
    const expected = {
      nome: 'João Silva',
      idade: 30,
      ativo: true,
    } as const;
    const output = normalizarDadosFormulario(input);
    expect(output).toEqual(expected);
  });

  test('trims strings inside arrays and keeps non‑string elements', () => {
    const input = {
      tags: ['  tag1 ', 'tag2  ', 123, null],
    } as const;
    const expected = {
      tags: ['tag1', 'tag2', 123, null],
    } as const;
    const output = normalizarDadosFormulario(input);
    expect(output).toEqual(expected);
  });

  test('preserves undefined fields and empty arrays', () => {
    const input = {
      descricao: undefined,
      listaVazia: [],
    } as const;
    const expected = {
      descricao: undefined,
      listaVazia: [],
    } as const;
    const output = normalizarDadosFormulario(input);
    expect(output).toEqual(expected);
  });

  test('does not mutate the original object', () => {
    const input = { texto: '  foo  ', arr: ['  bar '] } as const;
    const copy = JSON.parse(JSON.stringify(input));
    normalizarDadosFormulario(input);
    expect(input).toEqual(copy);
  });
});
