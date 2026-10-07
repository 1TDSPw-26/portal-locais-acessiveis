import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen min-w-80 flex-col bg-white font-sans text-gray-900">
      <a
        href="#conteudo-principal"
        className="bg-brand-primary fixed top-4 left-4 z-50 -translate-y-24 rounded-md px-4 py-3 font-semibold text-white shadow-lg transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo principal
      </a>

      <Header />

      <main id="conteudo-principal" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
