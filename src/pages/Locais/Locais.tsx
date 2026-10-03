import { locais } from '../LocalDetalhe/locaisMock'
import LocalCard from './LocalCard'

function Locais() {
  return (
    <section
      aria-labelledby="titulo-locais"
      className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"
    >
      <h2 id="titulo-locais" className="text-2xl font-bold text-gray-900">
        Locais
      </h2>
      <p className="mt-2 text-gray-700">
        Conheça locais acessíveis e os recursos que cada um oferece.
      </p>

      {locais.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locais.map((local) => (
            <li key={local.id}>
              <LocalCard local={local} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-gray-700">Nenhum local cadastrado ainda.</p>
      )}
    </section>
  )
}

export default Locais
