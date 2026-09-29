import { useEffect } from 'react'

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
      {/* Hero Section */}
      <section
        className="bg-gradient-to-b from-brand-primary to-blue-600 text-white px-[clamp(24px,4vw,52px)] py-[clamp(40px,8vh,80px)] max-[520px]:px-5"
        aria-labelledby="hero-titulo"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[clamp(32px,6vw,56px)] font-bold leading-[1.2] mb-6" id="hero-titulo">
            Bem-vindo ao AcessoLocal
          </h1>
          <p className="text-[clamp(16px,2vw,20px)] leading-relaxed mb-8 opacity-95 max-w-2xl mx-auto">
            Descubra e compartilhe informações de acessibilidade para locais e serviços. Uma
            plataforma colaborativa para ampliar a autonomia e participação de todos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a
              href="/locais"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-brand-primary font-bold text-[15px] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-white transition-colors"
            >
              Explorar locais disponíveis
            </a>
            <button
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-white text-white font-bold text-[15px] hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-white transition-colors"
              aria-label="Cadastrar novo local"
            >
              Cadastrar um local
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="px-[clamp(24px,4vw,52px)] py-[clamp(48px,8vh,96px)] max-[520px]:px-5"
        aria-labelledby="como-funciona"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-[clamp(28px,4vw,40px)] font-bold text-center mb-4"
            id="como-funciona"
          >
            Como funciona o AcessoLocal
          </h2>
          <p className="text-center text-gray-600 text-[clamp(14px,1.5vw,16px)] mb-12 max-w-2xl mx-auto">
            Siga essas etapas para encontrar os melhores locais e serviços acessíveis para você e
            sua comunidade.
          </p>

          {/* Journey Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {journeySteps.map((step, index) => (
              <div key={step.title} className="text-center relative pb-4 max-[520px]:pb-0">
                {/* Circle with icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary text-white text-3xl mb-4 mx-auto">
                  {step.icon}
                </div>

                {/* Arrow between steps */}
                {index < journeySteps.length - 1 && (
                  <div className="hidden lg:flex absolute right-[-24px] top-8 text-brand-primary text-2xl">
                    →
                  </div>
                )}

                <h3 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Mobile arrow visualization */}
          <div className="flex items-center justify-center gap-2 text-brand-primary text-xl font-bold lg:hidden mb-8 flex-wrap">
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

      {/* Why Participate Section */}
      <section
        className="bg-gray-50 px-[clamp(24px,4vw,52px)] py-[clamp(48px,8vh,96px)] max-[520px]:px-5"
        aria-labelledby="por-que-participar"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-[clamp(28px,4vw,40px)] font-bold text-center mb-12"
            id="por-que-participar"
          >
            Por que participar?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefitCards.map((card) => (
              <div
                key={card.title}
                className="p-6 bg-white rounded-lg shadow-sm border border-border-subtle"
              >
                <div className="text-4xl font-bold text-brand-primary mb-3">{card.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="bg-brand-primary text-white px-[clamp(24px,4vw,52px)] py-[clamp(40px,8vh,80px)] max-[520px]:px-5"
        aria-labelledby="comece-agora"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-[clamp(24px,4vw,36px)] font-bold mb-4"
            id="comece-agora"
          >
            Comece a explorar agora
          </h2>
          <p className="text-[clamp(14px,1.5vw,16px)] mb-8 opacity-95">
            Descubra locais e serviços acessíveis próximos a você e faça parte da comunidade.
          </p>
          <a
            href="/locais"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-brand-primary font-bold text-[15px] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-white transition-colors"
          >
            Explorar locais
          </a>
        </div>
      </section>
    </div>
  )
}
