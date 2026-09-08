import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'

const navigationItems = [
  { label: 'Início', active: true },
  { label: 'Locais', active: false },
  { label: 'Sobre', active: false },
  { label: 'Acessibilidade', active: false },
]

export default function Header() {
  const navigate = useNavigate()

  const handleCadastro = () => {
    navigate('/cadastro')
  }

  const handleNavigation = (label: string) => {
    const routes: Record<string, string> = {
      'Início': '/',
      'Locais': '/locais',
      'Sobre': '/sobre',
      'Acessibilidade': '/acessibilidade',
    }
    const route = routes[label]
    if (route) navigate(route)
  }

  return (
    <header className="grid min-h-[72px] grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] items-center gap-8 border-t-4 border-t-header-edge border-b border-b-border-subtle bg-white px-[clamp(24px,4vw,52px)] max-[820px]:grid-cols-[1fr_auto] max-[820px]:gap-x-6 max-[820px]:gap-y-3 max-[820px]:py-3.5 max-[520px]:grid-cols-1 max-[520px]:px-5">
      <div className="text-brand-primary flex w-max items-center gap-2.5 text-lg font-bold cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate('/')}>
        <img className="size-8 shrink-0" src={logo} alt="Logo do AcessoLocal" />
        <span>AcessoLocal</span>
      </div>

      <nav
        className="flex h-full items-center justify-center gap-[clamp(36px,5vw,76px)] max-[820px]:col-span-full max-[820px]:row-start-2 max-[820px]:min-w-0 max-[820px]:justify-start max-[820px]:gap-8 max-[820px]:overflow-x-auto max-[520px]:row-start-3 max-[520px]:gap-7"
        aria-label="Navegação principal"
      >
        <ul className="flex h-full items-center gap-[inherit]">
          {navigationItems.map(({ label, active }) => (
            <li className="h-full" key={label}>
              <button
                className={`relative flex h-full items-center px-0.5 text-xs font-bold whitespace-nowrap max-[820px]:min-h-9 border-none bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary rounded ${
              active
                ? 'text-brand-active after:bg-brand-active after:absolute after:right-0 after:bottom-3.5 after:left-0 after:h-0.5 after:content-[""] max-[820px]:after:bottom-0'
                : 'text-gray-900 hover:text-brand-primary transition-colors'
            }`
                }
                onClick={() => handleNavigation(label)}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={handleCadastro}
        className="bg-brand-action inline-flex min-h-10.5 items-center justify-center justify-self-end rounded-[7px] px-5.5 text-[13px] font-bold whitespace-nowrap text-white max-[520px]:row-start-2 max-[520px]:justify-self-stretch cursor-pointer border-none hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-action transition-opacity"
        aria-label="Cadastrar um novo local"
      >
        Cadastrar local
      </button>
    </header>
  )
}
