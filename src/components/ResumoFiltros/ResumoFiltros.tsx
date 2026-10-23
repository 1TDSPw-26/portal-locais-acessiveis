export type FiltroAtivo = {
  id: string
  nome: string
  onRemover: () => void
}

export type ResumoFiltrosProps = {
  filtros: readonly FiltroAtivo[]
}

/** Exibe os filtros recebidos; o componente pai controla a remoção e os resultados. */
export default function ResumoFiltros({ filtros }: ResumoFiltrosProps) {
  return (
    <section
      aria-label="Resumo dos filtros"
      className="rounded-lg border border-border-subtle bg-white p-4"
    >
      <h2 className="text-lg font-bold text-gray-900">Filtros ativos</h2>

      {filtros.length === 0 ? (
        <p className="mt-2 text-sm text-gray-700">Nenhum filtro ativo.</p>
      ) : (
        <ul role="list" aria-label="Filtros ativos" className="mt-3 flex flex-wrap gap-3">
          {filtros.map((filtro) => (
            <li
              key={filtro.id}
              className="flex max-w-full flex-wrap items-center gap-x-3 rounded-lg border border-border-subtle bg-gray-50 px-3"
            >
              <span className="min-w-0 wrap-anywhere py-2 text-sm text-gray-900">
                {filtro.nome}
              </span>
              <button
                type="button"
                aria-label={`Remover filtro ${filtro.nome}`}
                onClick={filtro.onRemover}
                className="min-h-11 shrink-0 rounded-md px-2 text-sm font-semibold text-brand-primary hover:bg-gray-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
