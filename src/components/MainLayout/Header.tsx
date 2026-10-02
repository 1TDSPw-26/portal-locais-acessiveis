import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Locais', path: '/locais' },
  { label: 'Cadastro', path: '/cadastro' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Acessibilidade', path: '/acessibilidade' },
]

export default function Header() {
  return (
    <header className="border-t-4 border-t-header-edge border-b border-b-border-subtle bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-primary focus:px-4 focus:py-3 focus:font-bold focus:text-white"
      >
        Pular para o conteúdo principal
      </a>

      <div className="grid min-h-[72px] grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] items-center gap-8 px-[clamp(24px,4vw,52px)] max-[820px]:grid-cols-[1fr_auto] max-[820px]:gap-x-6 max-[820px]:gap-y-3 max-[820px]:py-3.5 max-[520px]:grid-cols-1 max-[520px]:px-5">
        <Link
          to="/"
          className="flex w-max items-center gap-2.5 text-lg font-bold text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
        >
          <img
            className="size-8 shrink-0"
            src={logo}
            alt="Logo do AcessoLocal"
          />

          <span>AcessoLocal</span>
        </Link>

        <nav
          className="flex h-full items-center justify-center gap-[clamp(24px,4vw,50px)] max-[820px]:col-span-full max-[820px]:row-start-2 max-[820px]:min-w-0 max-[820px]:justify-start max-[820px]:gap-6 max-[820px]:overflow-x-auto max-[520px]:row-start-3 max-[520px]:gap-5"
          aria-label="Navegação principal"
        >
          <ul className="flex h-full items-center gap-[inherit]">
            {navigationItems.map(({ label, path }) => (
              <li className="h-full" key={label}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `relative flex h-full items-center whitespace-nowrap px-0.5 text-xs font-bold text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary max-[820px]:min-h-9 ${
                      isActive
                        ? "text-brand-active after:absolute after:right-0 after:bottom-3.5 after:left-0 after:h-0.5 after:bg-brand-active after:content-[''] max-[820px]:after:bottom-0"
                        : ''
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/cadastro"
          className="inline-flex min-h-10.5 items-center justify-center justify-self-end rounded-[7px] bg-brand-action px-5.5 text-[13px] font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary max-[520px]:row-start-2 max-[520px]:justify-self-stretch"
        >
          Cadastrar local
        </Link>
      </div>
    </header>
  )
}