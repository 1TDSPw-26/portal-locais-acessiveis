import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen min-w-80 flex-col bg-white font-sans text-gray-900">
      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 focus:outline-none"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}