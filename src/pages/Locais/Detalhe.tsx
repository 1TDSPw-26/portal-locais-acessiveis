import { Link, useParams } from 'react-router-dom'

function Detalhe() {
  const { id } = useParams()

  return (
    <section>
      <Link to="/locais">
        Voltar para locais
      </Link>

      <h2>Detalhes do local</h2>

      <p>
        Você está visualizando o local {id}.
      </p>
    </section>
  )
}

export default Detalhe