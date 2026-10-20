
import { describe, expect, it } from 'vitest';
import { criarMetadadosPagina } from './metadadosPagina';

describe('criarMetadadosPagina', () => {
  it('deve retornar os valores informados', () => {
    expect(
      criarMetadadosPagina({
        titulo: 'Página Inicial',
        descricao: 'Locais acessíveis.',
      }),
    ).toEqual({
      titulo: 'Página Inicial',
      descricao: 'Locais acessíveis.',
    });
  });

  it('deve usar os valores padrão quando não houver entrada', () => {
    expect(criarMetadadosPagina()).toEqual({
      titulo: 'Portal locais acessiveis',
      descricao: 'Portal de locais acessíveis.',
    });
  });

  it('deve usar os valores padrão para textos vazios', () => {
    expect(
      criarMetadadosPagina({
        titulo: ' ',
        descricao: '',
      }),
    ).toEqual({
      titulo: 'Portal locais acessiveis',
      descricao: 'Portal de locais acessíveis.',
    });
  });

  it('deve remover espaços extras', () => {
    expect(
      criarMetadadosPagina({
        titulo: '  Início  ',
        descricao: '  Conheça os locais  ',
      }),
    ).toEqual({
      titulo: 'Início',
      descricao: 'Conheça os locais',
    });
  });

  it('deve aceitar valores nulos e indefinidos', () => {
    expect(
      criarMetadadosPagina({
        titulo: null,
        descricao: undefined,
      }),
    ).toEqual({
      titulo: 'Portal locais acessiveis',
      descricao: 'Portal de locais acessíveis.',
    });
  });

  it('deve manter caracteres especiais', () => {
    expect(
      criarMetadadosPagina({
        titulo: 'Ação & inclusão!',
        descricao: 'Locais acessíveis — para todos.',
      }),
    ).toEqual({
      titulo: 'Ação & inclusão!',
      descricao: 'Locais acessíveis — para todos.',
    });
  });
});
