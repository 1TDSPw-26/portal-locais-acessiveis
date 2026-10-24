import { useEffect, useRef, useState } from 'react'
import type { Local } from '../../types/Local'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import Paginacao from '../../components/Paginacao/Paginacao'
import { excluirLocal, listarLocais } from '../../services/locaisService'
import LocalCard from './LocalCard'
import { aplicarConsulta, CONSULTA_PADRAO, lerConsulta, obterCategorias, type ConsultaLocais } from './filtros'
import { useLocation, useNavigationType, useSearchParams } from 'react-router-dom'


const ITENS_POR_PAGINA = 6
const TODAS = CONSULTA_PADRAO.categoria
//marca no state do historico as navegações feitas pela pagina.
const ORIGEM_CONSULTA = 'consulta-locais'

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

function veioDestaPagina(estado: unknown): boolean {
  return (
    typeof estado === 'object' &&
    estado !== null &&
    'origem' in estado &&
    estado.origem === ORIGEM_CONSULTA
  )
}

function Locais() {
  const [locais, setLocais] = useState<Local[]>(() => listarLocais())
  const [parametros, setParametros] = useSearchParams()
  const location = useLocation()
  const tipoNavegacao = useNavigationType()

  const categorias = obterCategorias(locais)
  //URL: categoria e página vêm direto dela.
  const consulta = lerConsulta(parametros, categorias)
  const { categoria, pagina: paginaAtual } = consulta

  // O campo de busca tem estado próprio para a digitação não perder o cursor.
  const [busca, setBusca] = useState(consulta.busca)
  const [chaveLida, setChaveLida] = useState(location.key)
  const [localParaExcluir, setLocalParaExcluir] = useState<Local | null>(null)
  const [aviso, setAviso] = useState<Aviso | null>(null)
  const buscaRef = useRef<HTMLInputElement>(null)
  const tituloRef = useRef<HTMLHeadingElement>(null)

  // Se a URL mudar por fora (voltar/avançar do navegador, link do menu),
  // o campo de busca acompanha o valor da URL.
  if (location.key !== chaveLida) {
    setChaveLida(location.key)
    const navegacaoPropria =
      tipoNavegacao !== 'POP' && veioDestaPagina(location.state)
    if (!navegacaoPropria) {
      setBusca(consulta.busca)
    }
  }

  const termo = normalizar(busca.trim())
  const locaisFiltrados = locais.filter((local) => {
    const correspondeCategoria =
      categoria === TODAS || local.categoria === categoria
    const textoLocal = normalizar(
      `${local.nome} ${local.categoria} ${local.endereco} ${local.descricao}`,
    )
    return correspondeCategoria && textoLocal.includes(termo)
  })

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

  function atualizarUrl(
    alteracoes: Partial<ConsultaLocais>,
    { substituir = false } = {},
  ) {
    // Regrava a consulta inteira já validada: valores inválidos saem da
    // URL e parâmetros de outras funcionalidades são preservados.
    const proxima = {
      busca,
      categoria,
      pagina: paginaCorrigida,
      ...alteracoes,
    }
    setParametros(aplicarConsulta(parametros, proxima), {
      // A digitação substitui a entrada do histórico para não criar
      // uma entrada por tecla; as demais ações criam uma entrada nova.
      replace: substituir,
      state: { origem: ORIGEM_CONSULTA },
    })
  }

  function mudarBusca(valor: string) {
    setBusca(valor)
    atualizarUrl({ busca: valor, pagina: 1 }, { substituir: true })
  }

  function mudarCategoria(valor: string) {
    atualizarUrl({ categoria: valor, pagina: 1 })
  }

  function mudarPagina(pagina: number) {
    atualizarUrl({ pagina })
  }

  function limparFiltros() {
    setBusca('')
    atualizarUrl(CONSULTA_PADRAO)
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
            className={`rounded-md border px-4 py-3 font-bold ${
              aviso.tipo === 'sucesso'
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
            aoMudarPagina={mudarPagina}
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
