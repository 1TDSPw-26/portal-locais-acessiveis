
import type { Locais } from '../../types/Locais';
import { Link } from 'react-router-dom';

type LocalCardProps = {
  local: Locais;
};

export default function LocalCard({ local }: LocalCardProps) {
    return(
         <article className="rounded-lg border border-border-subtle p-5">
      <h3 className="text-lg font-bold">
        {local.nome}
      </h3>

      <p className="mt-2 text-sm font-semibold">Categoria: {local.categoria}</p>

      <p className="mt-2 text-sm">
        {local.descricao}
      </p>

      <p className="mt-1 text-sm">
        {local.endereco}
      </p>

      <ul className="mt-3 list-disc pl-5 text-sm">
        {local.accessibilidades.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link
          to={`/locais/${local.id}/editar`}
          className="mt-4 inline-flex min-h-11 items-center rounded-sm font-bold underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
          Editar{' '}
          <span className="sr-only">{local.nome}</span>
      </Link>
    </article>
  )
}
