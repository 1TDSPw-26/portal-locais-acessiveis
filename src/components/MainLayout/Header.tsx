import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'

const navigationItems = [
  { label: 'Início', path: '/' },
  { label: 'Locais', path: '/locais' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Acessibilidade', path: '/acessibilidade' },
]

const focusRing =
  'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary'

export default function Header() {
  return (
    <header className="grid min-h-[72px] grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] items-center gap-8 border-t-4 border-t-header-edge border-b border-b-border-subtle bg-white px-[clamp(24px,4vw,52px)] max-[820px]:grid-cols-[1fr_auto] max-[820px]:gap-x-6 max-[820px]:gap-y-3 max-[820px]:py-3.5 max-[520px]:grid-cols-1 max-[520px]:px-5">
      <Link
        to="/"
        aria-label="AcessoLocal, ir para a página inicial"
        className={`text-brand-primary flex w-max items-center gap-2.5 text-lg font-bold ${focusRing}`}
      >
        <img className="size-8 shrink-0" src={logo} alt="" />
        <span>AcessoLocal</span>
      </Link>

      <nav
        className="flex h-full items-center justify-center max-[820px]:col-span-full max-[820px]:row-start-2 max-[820px]:min-w-0 max-[820px]:justify-start max-[820px]:overflow-x-auto max-[520px]:row-start-3"
        aria-label="Navegação principal"
      >
        <ul className="flex h-full items-center gap-[clamp(36px,5vw,76px)] max-[820px]:gap-8 max-[820px]:p-1 max-[520px]:gap-7">
          {navigationItems.map(({ label, path }) => (
            <li className="h-full" key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `relative flex h-full items-center px-0.5 text-sm font-bold whitespace-nowrap hover:text-brand-active max-[820px]:min-h-11 ${focusRing} ${
                    isActive
                      ? "text-brand-active after:bg-brand-active after:absolute after:right-0 after:bottom-3.5 after:left-0 after:h-0.5 after:content-[''] max-[820px]:after:bottom-1.5"
                      : 'text-gray-900'
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
        className="bg-brand-action inline-flex min-h-11 items-center justify-center justify-self-end rounded-[7px] px-5.5 text-[13px] font-bold whitespace-nowrap text-white hover:bg-brand-footer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary max-[520px]:row-start-2 max-[520px]:justify-self-stretch"
      >
        Cadastrar local
      </Link>
    </header>
  )
}
