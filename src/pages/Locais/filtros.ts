import type { Local } from '../../types/Local'

export function obterCategorias(locais: Local[]): string[] {
  return [...new Set(locais.map((local) => local.categoria))]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

// O valor vazio representa todas as categorias.
export function filtrarPorCategoria(locais: Local[], categoria: string): Local[] {
  return locais.filter((local) => !categoria || local.categoria === categoria)
}


//parametros de consulta da url.

//Centralizar os nomes num objeto evita erro de digitação. Se a equipe decidir trocar ''q'' por ''busca'', muda só aqui!!
export const PARAMETROS_CONSULTA = {
  busca: 'q',
  categoria: 'categoria',
  pagina: 'pagina',
} as const

export type ConsultaLocais = {
  busca: string
  categoria: string
  pagina: number
}

export const CONSULTA_PADRAO: ConsultaLocais = {
  busca: '',
  categoria: '',
  pagina: 1,
}


// Normaliza o texto para comparação, removendo acentos, convertendo para minúsculas e removendo espaços em branco no início e no fim.
function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

//Lê o número da página da URL. Parâmetros inválidos voltam ao valor padrão.
function lerPagina(valor: string | null): number {
  //Aceita somente dígitos: recusa "abc", "-1", "2.5", "1e3" e vazio.
  if (!valor || !/^\d+$/.test(valor)) {
    return CONSULTA_PADRAO.pagina
  }
  const pagina = Number(valor)
  return Number.isSafeInteger(pagina) && pagina >= 1
    ? pagina
    : CONSULTA_PADRAO.pagina
}

//Lê a categoria da URL. Parâmetros inválidos voltam ao valor padrão.
function lerCategoria(valor: string | null, categoriasValidas: string[]): string {
  if (!valor) {
    return CONSULTA_PADRAO.categoria
  }
  //aceita diferença de maiúsculas e acentos ("lazer" -> "Lazer"),
  //só aceita categorias que existem na listagem.
  const procurada = normalizarTexto(valor)
  return (
    categoriasValidas.find(
      (categoria) => normalizarTexto(categoria) === procurada,
    ) ?? CONSULTA_PADRAO.categoria
  )
}

//Lê a consulta da URL. Parâmetros inválidos voltam ao valor padrão.
export function lerConsulta(
  parametros: URLSearchParams,
  categoriasValidas: string[],
): ConsultaLocais {
  return {
    busca: (parametros.get(PARAMETROS_CONSULTA.busca) ?? '').trim(),
    categoria: lerCategoria(
      parametros.get(PARAMETROS_CONSULTA.categoria),
      categoriasValidas,
    ),
    pagina: lerPagina(parametros.get(PARAMETROS_CONSULTA.pagina)),
  }
}

/*
 Devolve uma cópia de ''atuais'' com as alterações aplicadas.
 Remove o parâmetro quando o valor é vazio ou padrão e mantém
 intactos os parâmetros que não pertencem à consulta.
 */
export function aplicarConsulta(
  atuais: URLSearchParams,
  alteracoes: Partial<ConsultaLocais>,
): URLSearchParams {
  const proximos = new URLSearchParams(atuais)

  function definir(nome: string, valor: string, padrao: string) {
    if (valor === padrao) {
      proximos.delete(nome)
    } else {
      proximos.set(nome, valor)
    }
  }

  if (alteracoes.busca !== undefined) {
    definir(PARAMETROS_CONSULTA.busca, alteracoes.busca.trim(), CONSULTA_PADRAO.busca)
  }
  if (alteracoes.categoria !== undefined) {
    definir(PARAMETROS_CONSULTA.categoria, alteracoes.categoria, CONSULTA_PADRAO.categoria)
  }
  if (alteracoes.pagina !== undefined) {
    const pagina =
      Number.isSafeInteger(alteracoes.pagina) && alteracoes.pagina >= 1
        ? alteracoes.pagina
        : CONSULTA_PADRAO.pagina
    definir(
      PARAMETROS_CONSULTA.pagina,
      String(pagina),
      String(CONSULTA_PADRAO.pagina),
    )
  }

  return proximos
}