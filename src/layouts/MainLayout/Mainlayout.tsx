
import { Outlet } from 'react-router-dom' 

function MainLayout() {
  return (
    <>
      <header>
        <h1>Portal de Locais e Serviços Acessíveis</h1>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Portal de Locais e Serviços Acessíveis</p>
      </footer>
    </>
  )
}

export default MainLayout