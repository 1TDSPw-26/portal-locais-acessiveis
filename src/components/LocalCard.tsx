import { Link } from "react-router-dom"
import type { Local } from "../types/types"

interface LocalCardProps {
  local: Local
}

function LocalCard({ local }: LocalCardProps) {
  return (
    <article className="rounded-card border border-borderColor bg-bgSecondary p-6">
      {local.imagem && (
        <img
          src={local.imagem}
          alt={local.nome}
          className="mb-4 h-48 w-full rounded-card object-cover"
        />
      )}

      <h3 className="text-xl font-bold">
        {local.nome}
      </h3>

      <p className="mt-2 text-sm">
        Categoria: {local.categoria}
      </p>

      {local.endereco && (
        <p className="mt-2 text-sm">
          Localização: {local.endereco}
        </p>
      )}

      {local.acessibilidade && (
        <p className="mt-2 text-sm">
          Acessibilidade: {local.acessibilidade}
        </p>
      )}

      <Link
        to={`/locais/${local.id}`}
        className="btn-primary mt-4 inline-block"
      >
        Ver detalhes
      </Link>
    </article>
  )
}

export default LocalCard