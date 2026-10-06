import { Link } from 'react-router-dom'
import type { Local } from '../types/types'

interface LocalCardProps {
  local: Local
}

function LocalCard({ local }: LocalCardProps) {
  const tituloId = `local-${local.id}-titulo`

  return (
    <article
      aria-labelledby={tituloId}
      className="border-border-subtle flex h-full flex-col rounded-md border bg-white p-4 sm:p-5"
    >
      {local.imagem && (
        <img
          src={local.imagem}
          alt=""
          className="mb-4 h-48 w-full rounded-md object-cover"
        />
      )}

      <p className="text-sm font-bold text-gray-700">
        {local.categoria}
      </p>

      <h3
        id={tituloId}
        className="mt-1 wrap-break-word text-lg font-bold text-gray-900"
      >
        {local.nome}
      </h3>

      {local.endereco && (
        <p className="mt-2 wrap-break-word text-gray-700">
          {local.endereco}
        </p>
      )}

      {local.acessibilidade && (
        <div className="mt-3">
          <p className="text-sm font-bold text-gray-700">
            Acessibilidade
          </p>

          <p className="mt-1 wrap-break-word text-gray-700">
            {local.acessibilidade}
          </p>
        </div>
      )}

      <Link
        to={`/locais/${local.id}`}
        aria-label={`Ver detalhes de ${local.nome}`}
        className="text-brand-primary mt-auto inline-flex min-h-11 items-center rounded-sm pt-4 font-bold underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        Ver detalhes
        <span aria-hidden="true" className="ml-2">
          →
        </span>
      </Link>
    </article>
  )
}

export default LocalCard