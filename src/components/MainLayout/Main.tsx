import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen min-w-80 flex-col bg-white font-sans text-gray-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
