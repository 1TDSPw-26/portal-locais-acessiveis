import { useEffect } from 'react'
import { Link } from 'react-router-dom'

type JourneyStep = {
  icon: string
  title: string
  description: string
}

const journeySteps: JourneyStep[] = [
  {
    icon: '🔍',
    title: 'Descobrir',
    description: 'Encontre locais e serviços acessíveis próximos a você',
  },
  {
    icon: '⚖️',
    title: 'Comparar',
    description: 'Compare características de acessibilidade entre locais',
  },
  {
    icon: '✓',
    title: 'Decidir',
    description: 'Escolha o local que melhor atende suas necessidades',
  },
  {
    icon: '🤝',
    title: 'Contribuir',
    description: 'Compartilhe sua experiência e ajude a comunidade',
  },
]

type BenefitCard = {
  icon: string
  title: string
  description: string
}

const benefitCards: BenefitCard[] = [
  {
    icon: '🌍',
    title: 'Acesso à Informação',
    description:
      'Encontre rapidamente informações sobre acessibilidade de locais e serviços perto de você.',
  },
  {
    icon: '👥',
    title: 'Comunidade Colaborativa',
    description:
      'Compartilhe suas experiências e ajude outros a fazer escolhas informadas sobre acessibilidade.',
  },
  {
    icon: '♿',
    title: 'Inclusão e Autonomia',
    description:
      'Promovemos uma sociedade mais inclusiva onde todos possam participar plenamente da vida comunitária.',
  },
]

export default function Home() {
  useEffect(() => {
    document.title = 'Início | AcessoLocal'
  }, [])

  return (
    <div className="w-full">
      <section
        className="bg-gradient-to-b from-brand-primary to-blue-600 px-[clamp(24px,4vw,52px)] py-[clamp(40px,8vh,80px)] text-white max-[520px]:px-5"
        aria-labelledby="hero-titulo"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-[clamp(32px,6vw,56px)] font-bold leading-[1.2]" id="hero-titulo">
            Bem-vindo ao AcessoLocal
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-[clamp(16px,2vw,20px)] leading-relaxed opacity-95">
            Descubra e compartilhe informações de acessibilidade para locais e serviços. Uma
            plataforma colaborativa para ampliar a autonomia e participação de todos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/locais"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-[15px] font-bold text-brand-primary transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-primary focus:outline-none"
            >
              Explorar locais disponíveis
            </Link>
            <Link
              to="/cadastro"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-white/10 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-primary focus:outline-none"
              aria-label="Cadastrar novo local"
            >
              Cadastrar um local
            </Link>
          </div>
        </div>
      </section>

      <section
        className="px-[clamp(24px,4vw,52px)] py-[clamp(48px,8vh,96px)] max-[520px]:px-5"
        aria-labelledby="como-funciona"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-[clamp(28px,4vw,40px)] font-bold" id="como-funciona">
            Como funciona o AcessoLocal
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[clamp(14px,1.5vw,16px)] text-gray-600">
            Siga essas etapas para encontrar os melhores locais e serviços acessíveis para você e
            sua comunidade.
          </p>

          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step, index) => (
              <div key={step.title} className="relative pb-4 text-center max-[520px]:pb-0">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary text-3xl text-white">
                  {step.icon}
                </div>

                {index < journeySteps.length - 1 && (
                  <div className="absolute top-8 right-[-24px] hidden text-2xl text-brand-primary lg:flex">
                    →
                  </div>
                )}

                <h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xl font-bold text-brand-primary lg:hidden">
            <span>Descobrir</span>
            <span>→</span>
            <span>Comparar</span>
            <span>→</span>
            <span>Decidir</span>
            <span>→</span>
            <span>Contribuir</span>
          </div>
        </div>
      </section>

      <section
        className="bg-gray-50 px-[clamp(24px,4vw,52px)] py-[clamp(48px,8vh,96px)] max-[520px]:px-5"
        aria-labelledby="por-que-participar"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-[clamp(28px,4vw,40px)] font-bold" id="por-que-participar">
            Por que participar?
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefitCards.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm"
              >
                <div className="mb-3 text-4xl font-bold text-brand-primary">{card.icon}</div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">{card.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-brand-primary px-[clamp(24px,4vw,52px)] py-[clamp(40px,8vh,80px)] text-white max-[520px]:px-5"
        aria-labelledby="comece-agora"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-[clamp(24px,4vw,36px)] font-bold" id="comece-agora">
            Comece a explorar agora
          </h2>
          <p className="mb-8 text-[clamp(14px,1.5vw,16px)] opacity-95">
            Descubra locais e serviços acessíveis próximos a você e faça parte da comunidade.
          </p>
          <Link
            to="/locais"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-[15px] font-bold text-brand-primary transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-primary focus:outline-none"
          >
            Explorar locais
          </Link>
        </div>
      </section>
    </div>
  )
}
