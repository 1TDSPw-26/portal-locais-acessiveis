import { useState } from 'react'
import CartaoLocal from '../../components/LocalCard/LocalCard'
import Paginacao from '../../components/Paginacao/Paginacao'
import Loading from '../../components/Loading/Loading'
import EstadoVazio from '../../components/EstadoVazio/EstadoVazio'
import EstadoErro from '../../components/EstadoErro/EstadoErro'
import { useLocais } from '../../hooks/useLocais'
import { filtrarPorCategoria, obterCategorias } from './filtros'

const ITENS_POR_PAGINA = 6

function Locais() {
  const { dados, carregando, erro, recarregar } = useLocais()
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [categoria, setCategoria] = useState('')

  const categorias = obterCategorias(dados)
  const locaisFiltrados = filtrarPorCategoria(dados, categoria)

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

  // Estado de carregamento
  if (carregando) {
    return (
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <header>
          <h1 className="text-3xl font-bold">
            Locais acessíveis
          </h1>
        </header>
        <Loading mensagem="Carregando locais acessíveis..." />
      </section>
    )
  }

  // Estado de erro
  if (erro) {
    return (
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <header>
          <h1 className="text-3xl font-bold">
            Locais acessíveis
          </h1>
        </header>
        <EstadoErro
          titulo="Erro ao carregar locais"
          mensagem={erro}
          aoTentarNovamente={recarregar}
        />
      </section>
    )
  }

  // Estado vazio (sem dados retornados)
  if (dados.length === 0) {
    return (
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <header>
          <h1 className="text-3xl font-bold">
            Locais acessíveis
          </h1>
        </header>
        <EstadoVazio
          titulo="Nenhum local cadastrado"
          mensagem="Ainda não há locais cadastrados no portal. Volte em breve!"
        />
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <header>
        <h1 className="text-3xl font-bold">
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
            className="mt-2 w-full rounded border border-border-subtle bg-white p-3 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
          className="rounded border px-4 py-3 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Limpar filtro
        </button>
      </div>

      <p className="mt-4" role="status">
        {locaisFiltrados.length} {locaisFiltrados.length === 1 ? 'local encontrado' : 'locais encontrados'}
        {categoria ? ` na categoria ${categoria}.` : '.'}
      </p>

      {locaisFiltrados.length === 0 && (
        <EstadoVazio
          titulo="Nenhum local nesta categoria"
          mensagem="Nenhum local encontrado nesta categoria. Selecione outra categoria ou limpe o filtro."
        />
      )}

      <div
        className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
