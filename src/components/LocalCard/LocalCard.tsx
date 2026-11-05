
import type { Local } from '../../types/Local';
import useFavoritos from '../../hooks/useFavoritos'

type LocalCardProps = {
  local: Local;
};

export default function LocalCard({ local }: LocalCardProps) {
  const { ehFavorito, alternarFavorito } = useFavoritos()

  const favorito = ehFavorito(local.id)

  return (
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
        {local.acessibilidades.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => alternarFavorito(local)}
        aria-pressed={favorito}
        className="mt-4 rounded-md border border-border-subtle px-4 py-2 font-semibold text-brand-primary
       hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        {favorito ? 'Desfavoritar' : 'Favoritar'}
      </button>

    </article>
  )
}
