type PropriedadesPaginacao = {
  paginaAtual: number
  totalPaginas: number
  aoMudarPagina: (pagina: number) => void
}

export default function Paginacao({
  paginaAtual,
  totalPaginas,
  aoMudarPagina,
}: PropriedadesPaginacao) {
  if (totalPaginas <= 1) {
    return null
  }

  const irParaPagina = (pagina: number) => {
    if (
      pagina >= 1 &&
      pagina <= totalPaginas &&
      pagina !== paginaAtual
    ) {
      aoMudarPagina(pagina)
    }
  }

  return (
    <nav
      aria-label="Paginação dos locais"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => irParaPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
        aria-label="Ir para a página anterior"
        className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2"
      >
        Anterior
      </button>

      <div
        className="flex flex-wrap items-center gap-2"
        aria-label="Páginas disponíveis"
      >
        {Array.from({ length: totalPaginas }, (_, indice) => {
          const pagina = indice + 1
          const ehPaginaAtual = pagina === paginaAtual

          return (
            <button
              key={pagina}
              type="button"
              onClick={() => irParaPagina(pagina)}
              aria-label={`Ir para a página ${pagina}`}
              aria-current={
                ehPaginaAtual ? 'page' : undefined
              }
              className={`min-w-10 rounded border px-3 py-2 focus-visible:outline focus-visible:outline-2 ${
                ehPaginaAtual ? 'font-bold' : ''
              }`}
            >
              {pagina}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => irParaPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
        aria-label="Ir para a próxima página"
        className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2"
      >
        Próxima
      </button>

      <p className="sr-only" aria-live="polite">
        Página {paginaAtual} de {totalPaginas}
      </p>
    </nav>
  )
}