import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen min-w-80 flex-col bg-white font-sans text-gray-900">
      <header className="sticky top-0 z-50 bg-white border-b border-b-border-subtle">
        {/* Header será renderizado aqui pelo App */}
      </header>
      <main className="flex-1 w-full">{children}</main>
      <footer className="mt-auto">
        {/* Footer será renderizado aqui pelo App */}
      </footer>
    </div>
  )
}
