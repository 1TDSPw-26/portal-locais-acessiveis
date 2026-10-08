import { useState } from 'react'
import CartaoLocal from '../../components/LocalCard/LocalCard'
import Paginacao from '../../components/Paginacao/Paginacao'
import { locais } from '../../components/Dados/Locais'
import { filtrarPorCategoria, obterCategorias } from './filtros'

const ITENS_POR_PAGINA = 6
const categorias = obterCategorias(locais)

function Locais() {
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [categoria, setCategoria] = useState('')
  const locaisFiltrados = filtrarPorCategoria(locais, categoria)

  function mudarCategoria(valor: string) {
    setCategoria(valor)
    setPaginaAtual(1)
  }

  const totalPaginas = Math.ceil(
    locaisFiltrados.length / ITENS_POR_PAGINA,
  )

  const indiceInicial =
    (paginaAtual - 1) * ITENS_POR_PAGINA

  const locaisPaginados = locaisFiltrados.slice(
    indiceInicial,
    indiceInicial + ITENS_POR_PAGINA,
  )

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header>
        <h1 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-tight">
          Locais acessíveis
        </h1>

        <p className="mt-2">
          Encontre locais com recursos de acessibilidade.
        </p>
      </header>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="w-full sm:max-w-xs">
          <label htmlFor="categoria" className="block font-semibold">
            Categoria
          </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(event) => mudarCategoria(event.target.value)}
            className="mt-2 min-h-11 w-full rounded border border-border-subtle bg-white p-3 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => mudarCategoria('')}
          disabled={!categoria}
          className="min-h-11 rounded border px-4 py-3 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Limpar filtro
        </button>
      </div>

      <p className="mt-4" role="status">
        {locaisFiltrados.length} {locaisFiltrados.length === 1 ? 'local encontrado' : 'locais encontrados'}
        {categoria ? ` na categoria ${categoria}.` : '.'}
      </p>
      {locaisFiltrados.length === 0 && (
        <p className="mt-4">Nenhum local encontrado nesta categoria. Selecione outra categoria ou limpe o filtro.</p>
      )}

      <div
        className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label={`Lista de locais, página ${paginaAtual}`}
      >
        {locaisPaginados.map((local) => (
          <CartaoLocal
            key={local.id}
            local={local}
          />
        ))}
      </div>

      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        aoMudarPagina={setPaginaAtual}
      />
    </section>
  )
}

export default Locais
