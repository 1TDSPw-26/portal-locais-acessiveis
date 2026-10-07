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

  const categorias = [
    ...new Set(locais.map((local) => local.categoria)),
  ].sort()

  const buscaNormalizada = normalizar(busca.trim())

  const locaisFiltrados = locais.filter((local) => {
    const textoLocal = normalizar(
      `${local.nome} ${local.categoria} ${local.endereco} ${local.descricao}`,
    )

    const correspondeBusca =
      buscaNormalizada.length === 0 ||
      textoLocal.includes(buscaNormalizada)

    const correspondeCategoria =
      categoria === TODAS || local.categoria === categoria

    return correspondeBusca && correspondeCategoria
  })

  const filtroAtivo =
    busca.trim().length > 0 || categoria !== TODAS

  useEffect(() => {
    if (aviso) {
      tituloRef.current?.focus()
    }
  }, [aviso])

  function limparFiltros() {
    setBusca('')
    setCategoria(TODAS)
    buscaRef.current?.focus()
  }

  function confirmarExclusao() {
    if (!localParaExcluir) return

    try {
      const removido = excluirLocal(localParaExcluir.id)

      setAviso({
        tipo: 'sucesso',
        texto: `Local "${removido.nome}" excluído com sucesso.`,
      })
    } catch {
      setAviso({
        tipo: 'erro',
        texto: `Não foi possível excluir "${localParaExcluir.nome}". Ele pode já ter sido removido.`,
      })
    } finally {
      setLocais(listarLocais())
      setLocalParaExcluir(null)
    }
  }

  return (
    <section
      aria-labelledby="titulo-locais"
      className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"
    >
      <h2
        id="titulo-locais"
        ref={tituloRef}
        tabIndex={-1}
        className="text-2xl font-bold text-gray-900 focus:outline-none"
      >
        Locais
      </h2>

      <p className="mt-2 text-gray-700">
        Conheça locais acessíveis e os recursos que cada um oferece.
      </p>

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
        <p className="mt-4">Nenhum local encontrado nesta categoria. Selecione outra categoria ou limpe o filtro.</p>
      )}

      <div
        className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        aria-label={`Lista de locais, página ${paginaAtual}`}
      >
        <div>
          <label htmlFor="busca-local" className="font-bold text-gray-900">
            Buscar local
          </label>

          <input
            ref={buscaRef}
            id="busca-local"
            type="search"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            placeholder="Nome, categoria ou endereço"
            className={classeCampo}
          />
        </div>

        <div>
          <label htmlFor="categoria-local" className="font-bold text-gray-900">
            Categoria
          </label>

          <select
            id="categoria-local"
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
            className={classeCampo}
          >
            <option value={TODAS}>Todas</option>

            {categorias.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </div>
      </form>

      <p role="status" className="mt-4 text-gray-700">
        {locaisFiltrados.length === 1
          ? '1 local encontrado'
          : `${locaisFiltrados.length} locais encontrados`}
      </p>

      {locaisFiltrados.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locaisFiltrados.map((local) => (
            <li key={local.id}>
              <LocalCard
                local={local}
                onExcluir={() => setLocalParaExcluir(local)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4">
          <p className="text-gray-700">
            {filtroAtivo
              ? 'Nenhum local corresponde aos filtros escolhidos.'
              : 'Nenhum local cadastrado ainda.'}
          </p>

          {filtroAtivo && (
            <button
              type="button"
              onClick={limparFiltros}
              className="text-brand-primary mt-2 inline-flex min-h-11 items-center rounded-sm font-bold underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}

      <ConfirmDialog
        aberto={localParaExcluir !== null}
        titulo="Excluir local?"
        onConfirmar={confirmarExclusao}
        onCancelar={() => setLocalParaExcluir(null)}
      >
        <p>
          Tem certeza de que deseja excluir{' '}
          <strong>{localParaExcluir?.nome}</strong>? Esta ação não pode ser
          desfeita.
        </p>
      </ConfirmDialog>
    </section>
  )
}

export default Locais
