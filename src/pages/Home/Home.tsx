
import { useEffect } from 'react'

function Home() {
  useEffect(() => {
    document.title = 'Página inicial | AcessoLocal'
  }, [])
  return (
    <section>
      <h1>Página inicial</h1>
      <p>Bem-vindo ao Portal de Locais e Serviços Acessíveis.</p>
    </section>
  )
}

export default Home