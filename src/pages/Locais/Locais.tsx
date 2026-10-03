import { useState } from 'react'
import CartaoLocal from '../../components/LocalCard/LocalCard'
import Paginacao from '../../components/Paginacao/Paginacao'
import { locais } from '../../components/Dados/Locais'

const ITENS_POR_PAGINA = 6

function Locais() {
  const [paginaAtual, setPaginaAtual] = useState(1)

  const totalPaginas = Math.ceil(
    locais.length / ITENS_POR_PAGINA,
  )

  const indiceInicial =
    (paginaAtual - 1) * ITENS_POR_PAGINA

  const locaisPaginados = locais.slice(
    indiceInicial,
    indiceInicial + ITENS_POR_PAGINA,
  )

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <header>
        <h1 className="text-3xl font-bold">
          Locais acessíveis
        </h1>

        <p className="mt-2">
          Encontre locais com recursos de acessibilidade.
        </p>
      </header>

      <div
        className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        aria-label={`Lista de locais, página ${paginaAtual}`}
      >
        {locaisPaginados.map((local) => (
          <CartaoLocal
            key={local.id}
            local={local}
          />
        ))}
      </div>

      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        aoMudarPagina={setPaginaAtual}
      />
    </section>
  )
}

export default Locais