import { useEffect, useRef, useState } from 'react'
import type { Local } from '../../types/Local'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import Paginacao from '../../components/Paginacao/Paginacao'
import { excluirLocal, listarLocais } from '../../services/locaisService'
import LocalCard from './LocalCard'
import { ordenarPorNome } from './filtros'

const ITENS_POR_PAGINA = 6
const TODAS = ''

const classeCampo =
  'border-border-subtle mt-1 min-h-11 w-full rounded-md border bg-white px-3 text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary'

type Aviso = {
  tipo: 'sucesso' | 'erro'
  texto: string
}

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function Locais() {
  const [locais, setLocais] = useState<Local[]>(() => listarLocais())
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState(TODAS)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [localParaExcluir, setLocalParaExcluir] = useState<Local | null>(null)
  const [aviso, setAviso] = useState<Aviso | null>(null)
  const buscaRef = useRef<HTMLInputElement>(null)
  const tituloRef = useRef<HTMLHeadingElement>(null)

  const categorias = [...new Set(
    locais.map((local) => local.categoria),
  )].sort((a, b) => a.localeCompare(b, 'pt-BR'))

  const termo = normalizar(busca.trim())
  const locaisFiltrados = ordenarPorNome(
    locais.filter((local) => {
      const correspondeCategoria =
        categoria === TODAS || local.categoria === categoria
      const textoLocal = normalizar(
        `${local.nome} ${local.categoria} ${local.endereco} ${local.descricao}`,
      )
      return correspondeCategoria && textoLocal.includes(termo)
    }),
  )

  const filtroAtivo = termo !== '' || categoria !== TODAS
  const totalPaginas = Math.max(
    1,
    Math.ceil(locaisFiltrados.length / ITENS_POR_PAGINA),
  )
  const paginaCorrigida = Math.min(paginaAtual, totalPaginas)
  const indiceInicial = (paginaCorrigida - 1) * ITENS_POR_PAGINA
  const locaisPaginados = locaisFiltrados.slice(
    indiceInicial,
    indiceInicial + ITENS_POR_PAGINA,
  )

  useEffect(() => {
    if (aviso) {
      tituloRef.current?.focus()
    }
  }, [aviso])

  function mudarBusca(valor: string) {
    setBusca(valor)
    setPaginaAtual(1)
  }

  function mudarCategoria(valor: string) {
    setCategoria(valor)
    setPaginaAtual(1)
  }

  function limparFiltros() {
    setBusca('')
    setCategoria(TODAS)
    setPaginaAtual(1)
    buscaRef.current?.focus()
  }

  function confirmarExclusao() {
    if (!localParaExcluir) {
      return
    }

    try {
      const removido = excluirLocal(localParaExcluir.id)
      setAviso({
        tipo: 'sucesso',
        texto: `Local "${removido.nome}" excluído com sucesso.`,
      })
    } catch {
      setAviso({
        tipo: 'erro',
        texto: `Não foi possível excluir "${localParaExcluir.nome}".`,
      })
    } finally {
      setLocais(listarLocais())
      setLocalParaExcluir(null)
    }
  }

  return (
    <section
      aria-labelledby="titulo-locais"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <h1
        id="titulo-locais"
        ref={tituloRef}
        tabIndex={-1}
        className="text-3xl font-bold text-gray-900 focus:outline-none"
      >
        Locais acessíveis
      </h1>
      <p className="mt-2 text-gray-700">
        Encontre locais com recursos de acessibilidade.
      </p>

      <div role="status" className="mt-4 empty:hidden">
        {aviso && (
          <p
            className={`rounded-md border px-4 py-3 font-bold ${aviso.tipo === 'sucesso'
                ? 'border-green-700 bg-green-50 text-green-900'
                : 'border-red-700 bg-red-50 text-red-900'
              }`}
          >
            {aviso.texto}
          </p>
        )}
      </div>

      <form
        role="search"
        aria-label="Filtrar locais"
        onSubmit={(evento) => evento.preventDefault()}
        className="mt-6 grid gap-4 sm:grid-cols-[2fr_1fr]"
      >
        <div>
          <label htmlFor="busca-local" className="font-bold text-gray-900">
            Buscar por nome, categoria ou endereço
          </label>
          <input
            id="busca-local"
            ref={buscaRef}
            type="search"
            value={busca}
            onChange={(evento) => mudarBusca(evento.target.value)}
            placeholder="Digite um termo"
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
            onChange={(evento) => mudarCategoria(evento.target.value)}
            className={classeCampo}
          >
            <option value={TODAS}>Todas as categorias</option>
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
        <>
          <ul
            aria-label={`Lista de locais, página ${paginaCorrigida} de ${totalPaginas}`}
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {locaisPaginados.map((local) => (
              <li key={local.id}>
                <LocalCard
                  local={local}
                  onExcluir={() => setLocalParaExcluir(local)}
                />
              </li>
            ))}
          </ul>
          <Paginacao
            paginaAtual={paginaCorrigida}
            totalPaginas={totalPaginas}
            aoMudarPagina={setPaginaAtual}
          />
        </>
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
