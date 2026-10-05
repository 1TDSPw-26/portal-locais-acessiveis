import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="grid min-h-[72px] grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] items-center gap-8 border-t-4 border-t-header-edge border-b border-b-border-subtle bg-white px-[clamp(24px,4vw,52px)] max-[820px]:grid-cols-[1fr_auto] max-[820px]:gap-x-6 max-[820px]:gap-y-3 max-[820px]:py-3.5 max-[520px]:grid-cols-[1fr_auto] max-[520px]:px-5">
      <Link
        to="/"
        className="text-brand-primary flex w-max items-center gap-2.5 text-lg font-bold"
      >
        <img
          className="size-8 shrink-0"
          src={logo}
          alt="Logo do AcessoLocal"
        />
        <span>AcessoLocal</span>
      </Link>

      <button
        type="button"
        className="hidden min-h-11 items-center justify-center rounded-[7px] border border-border-subtle px-4 text-sm font-bold text-gray-900 max-[820px]:inline-flex"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
      </button>

      <nav
        id="primary-navigation"
        className={`flex h-full items-center justify-center gap-[clamp(36px,5vw,76px)] max-[820px]:col-span-full max-[820px]:row-start-2 max-[820px]:w-full max-[820px]:justify-start max-[820px]:border-t max-[820px]:border-border-subtle max-[820px]:py-2 ${isMenuOpen ? 'max-[820px]:flex' : 'max-[820px]:hidden'}`}
        aria-label="Navegação principal"
        onClick={() => setIsMenuOpen(false)}
      >
        <ul className="flex h-full items-center gap-[inherit] max-[820px]:w-full max-[820px]:flex-col max-[820px]:items-stretch max-[820px]:gap-1">
          <li><Link className="px-2 text-sm font-semibold text-gray-900 hover:text-brand-active" to="/">Home</Link></li>
          <li><Link className="px-2 text-sm font-semibold text-gray-900 hover:text-brand-active" to="/locais">Locais</Link></li>
          <li><Link className="px-2 text-sm font-semibold text-gray-900 hover:text-brand-active" to="/cadastro">Cadastro</Link></li>
          <li><Link className="px-2 text-sm font-semibold text-gray-900 hover:text-brand-active" to="/sobre">Sobre</Link></li>
        </ul>
      </nav>

      <Link
        to="/cadastro"
        className="bg-brand-action inline-flex min-h-10.5 items-center justify-center justify-self-end rounded-[7px] px-5.5 text-[13px] font-bold whitespace-nowrap text-white max-[820px]:col-span-full max-[820px]:row-start-3 max-[820px]:justify-self-start max-[520px]:justify-self-stretch"
      >
        Cadastrar local
      </Link>
    </header>
  )
}