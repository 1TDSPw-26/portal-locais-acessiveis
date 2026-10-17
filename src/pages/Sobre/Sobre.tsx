
import { useEffect } from 'react'

function Sobre() {
  useEffect(() => {
    document.title = 'Sobre | AcessoLocal'
  }, [])
  return (
    <section>
      <h1>Sobre</h1>
      <p>Informações sobre o Portal de Locais e Serviços Acessíveis.</p>
    </section>
  )
}

export default Sobre