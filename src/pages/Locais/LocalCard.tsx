import { Link } from 'react-router-dom'
import type { Local } from '../LocalDetalhe/locaisMock'

type LocalCardProps = {
  local: Local
}

export default function LocalCard({ local }: LocalCardProps) {
  const tituloId = `local-${local.id}-titulo`
  const recursosId = `local-${local.id}-recursos`

  return (
    <article
      aria-labelledby={tituloId}
      className="border-border-subtle flex h-full flex-col rounded-md border p-4 transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 sm:p-5"
    >
      <span className="text-sm font-bold text-gray-700" role="doc-subtitle">
        {local.categoria}
      </span>
      <h3
        id={tituloId}
        className="mt-1 text-lg font-bold wrap-break-word text-gray-900"
      >
        {local.nome}
      </h3>
      <address className="not-italic">
        <p className="mt-2 wrap-break-word text-gray-700">{local.endereco}</p>
      </address>

      {local.recursos.length > 0 && (
        <>
          <h4 id={recursosId} className="sr-only">
            Recursos de acessibilidade
          </h4>
          <ul
            className="mt-3 flex flex-wrap gap-2"
            aria-labelledby={recursosId}
          >
            {local.recursos.map((recurso) => (
              <li
                key={recurso}
                className="bg-border-subtle rounded-sm px-2 py-1 text-sm text-gray-900"
              >
                {recurso}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* O nome do local entra no texto do link para que, numa lista de
          links do leitor de tela, cada "Ver detalhes" seja distinguível. */}
      <Link
        to={`/locais/${local.id}`}
        className="text-brand-primary mt-4 inline-flex min-h-11 items-center gap-2 self-start rounded-sm font-bold underline underline-offset-4 transition-colors hover:no-underline hover:text-brand-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        Ver detalhes
        <span className="sr-only"> de {local.nome}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
