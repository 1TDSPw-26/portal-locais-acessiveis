
export interface MetadadosPagina {
  titulo: string;
  descricao: string;
}

interface MetadadosEntrada {
  titulo?: string | null;
  descricao?: string | null;
}

const TITULO_PADRAO = 'Portal locais acessiveis';
const DESCRICAO_PADRAO = 'Portal de locais acessíveis.';

function normalizarTexto(
  texto: string | null | undefined,
  padrao: string,
): string {
  return texto?.trim() || padrao;
}

export function criarMetadadosPagina(
  entrada: MetadadosEntrada = {},
): MetadadosPagina {
  return {
    titulo: normalizarTexto(entrada.titulo, TITULO_PADRAO),
    descricao: normalizarTexto(entrada.descricao, DESCRICAO_PADRAO),
  };
}
