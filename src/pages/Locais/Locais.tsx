import { Link } from 'react-router-dom'
import { locais } from '../LocalDetalhe/locaisMock'

function Locais() {
  return (
    <section>
      <h2>Locais</h2>
      <p>Listagem de locais acessíveis.</p>

      <ul className="mt-4 grid gap-3">
        {locais.map((local) => (
          <li key={local.id}>
            <Link
              to={`/locais/${local.id}`}
              className="text-brand-primary rounded-sm font-bold underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              {local.nome}
            </Link>
            <span className="text-gray-700"> — {local.categoria}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Locais
