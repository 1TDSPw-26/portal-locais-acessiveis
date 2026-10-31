import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buscarLocalPorId } from '../../services/locaisService'
import useFavoritos from '../../hooks/useFavoritos'

const classeLink =
  'text-brand-primary mt-8 inline-flex min-h-11 items-center gap-2 rounded-sm font-bold underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary'

export default function LocalDetalhe() {

  const { id } = useParams()
  const idNumerico = id === undefined ? undefined : Number(id)
  const local =
    idNumerico !== undefined && Number.isSafeInteger(idNumerico)
      ? buscarLocalPorId(idNumerico)
      : undefined
  const tituloRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const tituloAnterior = document.title
    document.title = local
      ? `${local.nome} | AcessoLocal`
      : 'Local não encontrado | AcessoLocal'

    // Em SPA o leitor de tela não anuncia a troca de rota:
    // levar o foco ao título faz a nova página ser lida.
    tituloRef.current?.focus()

    return () => {
      document.title = tituloAnterior
    }
  }, [local])
  const { ehFavorito, alternarFavorito, erro: erroFavoritos } = useFavoritos()
  const favorito = local ? ehFavorito(local.id) : false
  const breadcrumb = (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link
            to="/"
            className="text-gray-600 hover:text-brand-primary hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Início
          </Link>
        </li>
        <li aria-hidden="true" className="text-gray-400">/</li>
        <li>
          <Link
            to="/locais"
            className="text-gray-600 hover:text-brand-primary hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Locais
          </Link>
        </li>
        <li aria-hidden="true" className="text-gray-400">/</li>
        <li aria-current="page" className="font-medium text-gray-900">
          Detalhes do local
        </li>
      </ol>
    </nav>
  )

  if (!local) {
    return (
      <section
        aria-labelledby="titulo-local"
        className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6"
      >
        {breadcrumb}
        <h2
          id="titulo-local"
          ref={tituloRef}
          tabIndex={-1}
          className="text-2xl font-bold text-gray-900 focus:outline-none"
        >
          Local não encontrado
        </h2>
        <p className="mt-3 text-gray-700">
          Não encontramos um local com o código “{id}”. Confira o endereço ou
          escolha um local na lista.
        </p>
        <Link to="/locais" className={classeLink}>
          <span aria-hidden="true">←</span>
          Voltar para a lista de locais
        </Link>
      </section>
    )
  }

  return (
    <section
      aria-labelledby="titulo-local"
      className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6"
    >
      {breadcrumb}
      <h2
        id="titulo-local"
        ref={tituloRef}
        tabIndex={-1}
        className="text-2xl font-bold wrap-break-word text-gray-900 focus:outline-none sm:text-3xl"
      >
        {local.nome}
      </h2>
      <button
        type="button"
        onClick={() => local && alternarFavorito(local)}
        aria-pressed={favorito}
        className="mt-4 rounded-md border border-border-subtle px-4 py-2 font-semibold text-brand-primary hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        {favorito ? 'Desfavoritar' : 'Favoritar'}
      </button>
      {erroFavoritos && <p role="alert" className="mt-3 text-red-900">{erroFavoritos}</p>}
      <p className="mt-3 text-gray-700">{local.descricao}</p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-bold text-gray-700">Categoria</dt>
          <dd className="mt-1 text-gray-900">{local.categoria}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-gray-700">Endereço</dt>
          <dd className="mt-1 wrap-break-word text-gray-900">
            {local.endereco}
          </dd>
        </div>
      </dl>

      <h3 className="mt-8 text-lg font-bold text-gray-900">
        Recursos de acessibilidade
      </h3>
      {local.acessibilidades.length > 0 ? (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {local.acessibilidades.map((recurso: string) => (
            <li
              key={recurso}
              className="border-border-subtle flex items-center gap-2 rounded-md border px-3 py-2 text-gray-900"
            >
              <span aria-hidden="true" className="text-brand-primary font-bold">
                ✓
              </span>
              {recurso}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-gray-700">Nenhum recurso informado.</p>
      )}

      <Link to="/locais" className={classeLink}>
        <span aria-hidden="true">←</span>
        Voltar para a lista de locais
      </Link>
    </section>
  )
}
