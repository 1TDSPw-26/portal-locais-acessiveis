import { useEffect, useRef, useState } from 'react'
import type { Local } from '../LocalDetalhe/locaisMock'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import { excluirLocal, listarLocais } from '../../services/locaisService'
import LocalCard from './LocalCard'

const TODAS = 'todas'

const classeCampo =
  'border-border-subtle mt-1 min-h-11 w-full rounded-md border bg-white px-3 text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary'

// Ignora maiúsculas e acentos: "biblioteca" encontra "Biblioteca" e
// "servico" encontra "Serviço".
function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

type Aviso = { tipo: 'sucesso' | 'erro'; texto: string }

function Locais() {
  const [locais, setLocais] = useState<Local[]>(() => listarLocais())
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState(TODAS)
  const [localParaExcluir, setLocalParaExcluir] = useState<Local | null>(null)
  const [aviso, setAviso] = useState<Aviso | null>(null)
  const buscaRef = useRef<HTMLInputElement>(null)
  const tituloRef = useRef<HTMLHeadingElement>(null)

  const categorias = [...new Set(locais.map((local) => local.categoria))].sort()

  const totalPaginas = Math.ceil(
    locais.length / ITENS_POR_PAGINA,
  )

  const indiceInicial =
    (paginaAtual - 1) * ITENS_POR_PAGINA

  const locaisPaginados = locais.slice(
    indiceInicial,
    indiceInicial + ITENS_POR_PAGINA,
  )

  // O botão que abriu o diálogo deixa de existir após a exclusão,
  // então o foco é levado ao título da página para não se perder.
  useEffect(() => {
    if (aviso) tituloRef.current?.focus()
  }, [aviso])

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
        {locaisPaginados.map((local) => (
          <CartaoLocal
            key={local.id}
            local={local}
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

      {/* Região "viva": o leitor de tela anuncia a contagem a cada filtro,
          sem tirar o foco do campo que a pessoa está usando. */}
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
