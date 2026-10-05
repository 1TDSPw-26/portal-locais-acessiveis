import { Link } from 'react-router-dom'

function Locais() {
  return (
    <section>
      <h2>Locais</h2>
      <p>Listagem de locais acessíveis.</p>

      <Link to="/locais/1">
        Ver detalhes do local
      </Link>
    </section>
  )
}

export default Locais