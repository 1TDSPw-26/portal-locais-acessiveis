import { Link } from 'react-router-dom'

const pilares = [
  {
    titulo: 'Informação clara',
    descricao:
      'Dados objetivos ajudam cada pessoa a planejar uma visita com mais segurança e independência.',
    icone: (
      <path d="M7 8h10M7 12h10M7 16h6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    ),
  },
  {
    titulo: 'Construção colaborativa',
    descricao:
      'O portal reúne contribuições da comunidade para ampliar o acesso a informações sobre diferentes locais.',
    icone: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    titulo: 'Acessibilidade desde o início',
    descricao:
      'A experiência é pensada para funcionar em diferentes telas e formas de navegação, inclusive por teclado.',
    icone: (
      <>
        <circle cx="12" cy="4" r="2" />
        <path d="M5 8h14M12 6v6M8 21l4-9 4 9M7 13h10" />
      </>
    ),
  },
]

function Sobre() {
  return (
    <div className="bg-white text-slate-900">
      <section
        className="bg-brand-primary px-6 py-16 text-white sm:py-20 lg:py-24"
        aria-labelledby="titulo-sobre"
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-bold tracking-[0.18em] text-blue-100 uppercase">
            Sobre o projeto
          </p>
          <h1
            id="titulo-sobre"
            className="max-w-3xl text-4xl leading-tight font-bold sm:text-5xl"
          >
            Informação para tornar a cidade mais acessível
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">
            O AcessoLocal é um portal colaborativo que reúne informações sobre
            a acessibilidade de locais e serviços, apoiando escolhas com mais
            autonomia e confiança.
          </p>
        </div>
      </section>

      <section
        className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:py-18 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20"
        aria-labelledby="nossa-missao"
      >
        <div>
          <p className="text-sm font-bold tracking-[0.16em] text-brand-primary uppercase">
            Nossa missão
          </p>
          <h2 id="nossa-missao" className="mt-3 text-3xl font-bold sm:text-4xl">
            Ampliar autonomia por meio da informação
          </h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-slate-700">
            <p>
              Encontrar informações confiáveis sobre rampas, elevadores,
              banheiros adaptados e outros recursos ainda pode ser difícil. O
              AcessoLocal nasce para ajudar a reduzir essa barreira.
            </p>
            <p>
              Ao organizar essas informações em um só lugar, o projeto busca
              facilitar o planejamento de visitas e estimular estabelecimentos
              e a comunidade a olharem para a acessibilidade com mais atenção.
            </p>
          </div>
        </div>

        <aside className="rounded-2xl border border-blue-100 bg-blue-50 p-7 sm:p-9" aria-label="Propósito do AcessoLocal">
          <p className="text-xl leading-8 font-semibold text-brand-footer">
            “Acessibilidade é o que transforma a possibilidade de estar em um
            lugar na liberdade de participar dele.”
          </p>
          <p className="mt-5 text-sm leading-6 text-slate-700">
            Por isso, cada informação compartilhada pode contribuir para uma
            experiência mais previsível, segura e inclusiva.
          </p>
        </aside>
      </section>

      <section className="bg-slate-50 px-6 py-14 sm:py-18" aria-labelledby="nossos-pilares">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.16em] text-brand-primary uppercase">
              O que nos orienta
            </p>
            <h2 id="nossos-pilares" className="mt-3 text-3xl font-bold sm:text-4xl">
              Nossos pilares
            </h2>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {pilares.map(({ titulo, descricao, icone }) => (
              <article key={titulo} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex size-12 items-center justify-center rounded-full bg-blue-50 text-brand-primary">
                  <svg
                    className="size-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {icone}
                  </svg>
                </span>
                <h3 className="mt-5 text-xl font-bold">{titulo}</h3>
                <p className="mt-3 leading-7 text-slate-700">{descricao}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:py-18 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20"
        aria-labelledby="projeto-academico"
      >
        <div className="rounded-2xl bg-brand-footer p-8 text-white sm:p-10">
          <p className="text-sm font-bold tracking-[0.16em] text-blue-100 uppercase">
            FIAP · 2026
          </p>
          <p className="mt-4 text-3xl font-bold">Tecnologia com propósito social</p>
        </div>
        <div>
          <h2 id="projeto-academico" className="text-3xl font-bold sm:text-4xl">
            Um projeto acadêmico em evolução
          </h2>
          <p className="mt-5 leading-7 text-slate-700">
            O AcessoLocal é desenvolvido por estudantes do segundo semestre de
            Análise e Desenvolvimento de Sistemas da FIAP. O projeto coloca em
            prática conhecimentos de desenvolvimento web, experiência do
            usuário e acessibilidade digital para responder a um desafio real.
          </p>
          <p className="mt-4 leading-7 text-slate-700">
            Novos recursos e informações serão incorporados ao longo do
            desenvolvimento, sempre com foco em uma experiência simples,
            responsável e inclusiva.
          </p>
        </div>
      </section>

      <section className="bg-blue-50 px-6 py-14 text-center sm:py-16" aria-labelledby="participe">
        <div className="mx-auto max-w-3xl">
          <h2 id="participe" className="text-3xl font-bold sm:text-4xl">
            Faça parte dessa construção
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-700">
            Explore os locais já apresentados no portal ou contribua com os
            dados de um espaço que você conhece.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/locais"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-primary px-6 py-3 font-bold text-white hover:bg-brand-footer focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-primary"
            >
              Explorar locais
            </Link>
            <Link
              to="/cadastro"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-brand-primary bg-white px-6 py-3 font-bold text-brand-primary hover:bg-blue-100 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-primary"
            >
              Cadastrar um local
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sobre
