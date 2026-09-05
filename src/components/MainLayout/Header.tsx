const navigationItems = [
  { label: 'Início', href: '/', active: true },
  { label: 'Locais', href: '/locais' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Acessibilidade', href: '/acessibilidade' },
]

export default function Header() {
  return (
    <header className="grid min-h-[72px] grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] items-center gap-8 border-t-4 border-t-[#202020] border-b border-b-[#d7e2f0] bg-white px-[clamp(24px,4vw,52px)] max-[820px]:grid-cols-[1fr_auto] max-[820px]:gap-x-6 max-[820px]:gap-y-3 max-[820px]:py-3.5 max-[520px]:grid-cols-1 max-[520px]:px-5">
      <a
        className="flex w-max items-center gap-2.5 text-lg font-bold text-[#1554a5] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#f2c94c]"
        href="/"
        aria-label="AcessoLocal - início"
      >
        <span className="size-8 shrink-0" aria-hidden="true" />
        <span>AcessoLocal</span>
      </a>

      <nav
        className="flex h-full items-center justify-center gap-[clamp(36px,5vw,76px)] max-[820px]:col-span-full max-[820px]:row-start-2 max-[820px]:min-w-0 max-[820px]:justify-start max-[820px]:gap-8 max-[820px]:overflow-x-auto max-[520px]:row-start-3 max-[520px]:gap-7"
        aria-label="Navegação principal"
      >
        {navigationItems.map(({ label, href, active }) => (
          <a
            className={`relative flex h-full items-center px-0.5 text-xs font-bold whitespace-nowrap focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#f2c94c] max-[820px]:min-h-9 ${
              active
                ? 'text-[#1455ab] after:absolute after:right-0 after:bottom-3.5 after:left-0 after:h-0.5 after:bg-[#1455ab] after:content-[\'\'] max-[820px]:after:bottom-0'
                : 'text-gray-900'
            }`}
            href={href}
            key={href}
            aria-current={active ? 'page' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>

      <a
        className="inline-flex min-h-10.5 items-center justify-center justify-self-end rounded-[7px] bg-[#1858ac] px-5.5 text-[13px] font-bold whitespace-nowrap text-white hover:bg-[#10488f] focus-visible:bg-[#10488f] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#f2c94c] max-[520px]:row-start-2 max-[520px]:justify-self-stretch"
        href="/cadastrar-local"
      >
        Cadastrar local
      </a>
    </header>
  )
}
