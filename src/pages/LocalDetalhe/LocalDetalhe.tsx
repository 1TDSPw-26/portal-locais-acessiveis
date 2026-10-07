import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocalDetalhe } from '../../hooks/useLocalDetalhe'
import Loading from '../../components/Loading/Loading'
import EstadoErro from '../../components/EstadoErro/EstadoErro'

const classeLink =
  'text-brand-primary mt-8 inline-flex min-h-11 items-center gap-2 rounded-sm font-bold underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary'

export default function LocalDetalhe() {
  const { id } = useParams()
  const { dado: local, carregando, erro, recarregar } = useLocalDetalhe(id)
  const tituloRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const tituloAnterior = document.title
    document.title = local
      ? `${local.nome} | AcessoLocal`
      : carregando
        ? 'Carregando... | AcessoLocal'
        : 'Local não encontrado | AcessoLocal'

    if (!carregando) {
      tituloRef.current?.focus()
    }

    return () => {
      document.title = tituloAnterior
    }
  }, [local, carregando])

  if (carregando) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <Loading mensagem="Carregando detalhes do local..." />
      </section>
    )
  }

  if (erro) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <EstadoErro
          titulo="Erro ao carregar detalhes"
          mensagem={erro}
          aoTentarNovamente={recarregar}
        />
        <Link to="/locais" className={classeLink}>
          <span aria-hidden="true">←</span>
          Voltar para a lista de locais
        </Link>
      </section>
    )
  }

  if (!local) {
    return (
      <section
        aria-labelledby="titulo-local"
        className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6"
      >
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
      <h2
        id="titulo-local"
        ref={tituloRef}
        tabIndex={-1}
        className="text-2xl font-bold wrap-break-word text-gray-900 focus:outline-none sm:text-3xl"
      >
        {local.nome}
      </h2>
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
      {local.recursos.length > 0 ? (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {local.recursos.map((recurso) => (
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
