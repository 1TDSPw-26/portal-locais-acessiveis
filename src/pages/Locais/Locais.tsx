import { useEffect, useRef, useState } from 'react'
import LocalCard from '../../components/LocalCard'
import { buscarLocais } from '../../services/localService'
import type { Local } from '../../types/types'

const TODAS = 'todas'

const classeCampo =
  'border-border-subtle mt-1 min-h-11 w-full rounded-md border bg-white px-3 text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary'

function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function Locais() {
  const [locais, setLocais] = useState<Local[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState(TODAS)

  const buscaRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function carregarLocais() {
      try {
        setCarregando(true)
        setErro('')

        const dados = await buscarLocais()

        setLocais(dados)
      } catch {
        setErro('Não foi possível carregar os locais.')
      } finally {
        setCarregando(false)
      }
    }

    carregarLocais()
  }, [])

  const categorias = [
    ...new Set(locais.map((local) => local.categoria)),
  ].sort()

  const termo = normalizar(busca.trim())

  const locaisFiltrados = locais.filter(
    (local) =>
      (categoria === TODAS || local.categoria === categoria) &&
      normalizar(`${local.nome} ${local.endereco ?? ''}`).includes(termo),
  )

  const filtroAtivo = termo !== '' || categoria !== TODAS

  function limparFiltros() {
    setBusca('')
    setCategoria(TODAS)
    buscaRef.current?.focus()
  }

  if (carregando) {
    return (
      <section>
        <h2>Locais</h2>
        <p className="mt-4">Carregando locais...</p>
      </section>
    )
  }

  if (erro) {
    return (
      <section>
        <h2>Locais</h2>
        <p className="mt-4">{erro}</p>
      </section>
    )
  }

  return (
    <section
      aria-labelledby="titulo-locais"
      className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"
    >
      <h2 id="titulo-locais" className="text-2xl font-bold text-gray-900">
        Locais
      </h2>

      <p className="mt-2 text-gray-700">
        Conheça locais acessíveis e os recursos que cada um oferece.
      </p>

      <form
        role="search"
        aria-label="Filtrar locais"
        onSubmit={(evento) => evento.preventDefault()}
        className="mt-6 grid gap-4 sm:grid-cols-[2fr_1fr]"
      >
        <div>
          <label htmlFor="busca-local" className="font-bold text-gray-900">
            Buscar por nome ou endereço
          </label>

          <input
            id="busca-local"
            ref={buscaRef}
            type="search"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
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
              <LocalCard local={local} />
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
    </section>
  )
}

export default Locais