import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'

const navigationItems = [
  { label: 'Início', href: '/', end: true },
  { label: 'Locais', href: '/locais', end: false },
  { label: 'Sobre', href: '/sobre', end: false },
  { label: 'Acessibilidade', href: '/acessibilidade', end: false },
]

export default function Header() {
  return (
    <header className="grid min-h-[72px] grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] items-center gap-8 border-t-4 border-t-header-edge border-b border-b-border-subtle bg-white px-[clamp(24px,4vw,52px)] max-[820px]:grid-cols-[1fr_auto] max-[820px]:gap-x-6 max-[820px]:gap-y-3 max-[820px]:py-3.5 max-[520px]:grid-cols-1 max-[520px]:px-5">
      <Link
        className="text-brand-primary focus-visible:outline-focus flex w-max items-center gap-2.5 text-lg font-bold focus-visible:outline-3 focus-visible:outline-offset-3"
        to="/"
        aria-label="AcessoLocal - início"
      >
        <img className="size-8 shrink-0" src={logo} alt="" />
        <span>AcessoLocal</span>
      </Link>

      <nav
        className="flex h-full items-center justify-center gap-[clamp(36px,5vw,76px)] max-[820px]:col-span-full max-[820px]:row-start-2 max-[820px]:min-w-0 max-[820px]:justify-start max-[820px]:gap-8 max-[820px]:overflow-x-auto max-[520px]:row-start-3 max-[520px]:gap-7"
        aria-label="Navegação principal"
      >
        {navigationItems.map(({ label, href, end }) => (
          <NavLink
            className={({ isActive }) =>
              `focus-visible:outline-focus relative flex h-full items-center px-0.5 text-xs font-bold whitespace-nowrap focus-visible:outline-3 focus-visible:outline-offset-3 max-[820px]:min-h-9 ${
              isActive
                ? 'text-brand-active after:bg-brand-active after:absolute after:right-0 after:bottom-3.5 after:left-0 after:h-0.5 after:content-[\'\'] max-[820px]:after:bottom-0'
                : 'text-gray-900'
            }`
            }
            to={href}
            end={end}
            key={href}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <Link
        className="bg-brand-action hover:bg-brand-action-hover focus-visible:bg-brand-action-hover focus-visible:outline-focus inline-flex min-h-10.5 items-center justify-center justify-self-end rounded-[7px] px-5.5 text-[13px] font-bold whitespace-nowrap text-white focus-visible:outline-3 focus-visible:outline-offset-3 max-[520px]:row-start-2 max-[520px]:justify-self-stretch"
        to="/cadastro"
      >
        Cadastrar local
      </Link>
    </header>
  )
}
