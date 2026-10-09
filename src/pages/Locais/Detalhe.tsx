import { Link, useParams } from 'react-router-dom'

function Detalhe() {
  const { id } = useParams()

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          <li>
            <Link
              to="/"
              className="text-gray-600 transition-colors hover:text-brand-primary hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Início
            </Link>
          </li>

          <li
            aria-hidden="true"
            className="text-gray-400"
          >
            /
          </li>

          <li>
            <Link
              to="/locais"
              className="text-gray-600 transition-colors hover:text-brand-primary hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Locais
            </Link>
          </li>

          <li
            aria-hidden="true"
            className="text-gray-400"
          >
            /
          </li>

          <li
            aria-current="page"
            className="font-medium text-gray-900"
          >
            Detalhes do local
          </li>
        </ol>
      </nav>

      <h2 className="text-2xl font-bold text-gray-900">
        Detalhes do local
      </h2>

      <p className="mt-2 text-gray-700">
        Você está visualizando o local {id}.
      </p>
    </section>
  )
}

export default Detalhe