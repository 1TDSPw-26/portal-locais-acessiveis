import { Link, useParams } from 'react-router-dom'

function Detalhe() {
  const { id } = useParams()

  return (
    <section>
      <nav aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">Início</Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link to="/locais">Locais</Link>
          </li>

          <li aria-hidden="true">/</li>

          <li aria-current="page">
            Detalhes do local
          </li>
        </ol>
      </nav>

      <h2>Detalhes do local</h2>

      <p>Você está visualizando o local {id}.</p>
    </section>
  )
}

export default Detalhe