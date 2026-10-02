export default function Acessibilidade() {
  return (
    <section
      aria-labelledby="titulo-acessibilidade"
      className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 lg:px-10"
    >
      <header className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-primary">
          AcessoLocal
        </p>

        <h1
          id="titulo-acessibilidade"
          className="mt-2 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl"
        >
          Acessibilidade
        </h1>

        <p className="mt-5 text-base leading-7 text-gray-700">
          O AcessoLocal foi desenvolvido para facilitar o acesso a informações
          sobre locais e serviços acessíveis. Esta página apresenta os recursos
          e cuidados adotados para tornar a navegação mais acessível.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-border-subtle bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Navegação por teclado
          </h2>

          <p className="mt-3 leading-7 text-gray-700">
            Os elementos interativos do portal podem ser acessados utilizando
            o teclado. Use a tecla Tab para avançar entre os elementos e
            Shift + Tab para voltar.
          </p>
        </article>

        <article className="rounded-xl border border-border-subtle bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Leitores de tela
          </h2>

          <p className="mt-3 leading-7 text-gray-700">
            A estrutura das páginas utiliza títulos, regiões de navegação,
            textos e rótulos semânticos para facilitar a interpretação do
            conteúdo por leitores de tela.
          </p>
        </article>

        <article className="rounded-xl border border-border-subtle bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Contraste e leitura
          </h2>

          <p className="mt-3 leading-7 text-gray-700">
            Cores de texto e elementos importantes foram escolhidas buscando
            manter uma boa diferenciação visual entre conteúdo, fundo e
            elementos de interação.
          </p>
        </article>

        <article className="rounded-xl border border-border-subtle bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Estrutura do conteúdo
          </h2>

          <p className="mt-3 leading-7 text-gray-700">
            Os conteúdos são organizados por títulos e seções para facilitar
            a compreensão da página e permitir uma navegação mais previsível.
          </p>
        </article>
      </div>

      <section
        aria-labelledby="recursos-acessibilidade"
        className="mt-10 rounded-xl bg-gray-50 p-6 sm:p-8"
      >
        <h2
          id="recursos-acessibilidade"
          className="text-2xl font-bold text-gray-900"
        >
          Recursos de acessibilidade
        </h2>

        <ul className="mt-5 grid gap-4 text-gray-700 sm:grid-cols-2">
          <li className="rounded-lg border border-border-subtle bg-white p-4">
            <strong className="block text-gray-900">
              Navegação por teclado
            </strong>

            <span className="mt-1 block text-sm leading-6">
              Acesso aos links e controles sem depender exclusivamente do
              mouse.
            </span>
          </li>

          <li className="rounded-lg border border-border-subtle bg-white p-4">
            <strong className="block text-gray-900">
              Foco visível
            </strong>

            <span className="mt-1 block text-sm leading-6">
              Os elementos selecionados pelo teclado possuem indicação visual
              de foco.
            </span>
          </li>

          <li className="rounded-lg border border-border-subtle bg-white p-4">
            <strong className="block text-gray-900">
              Textos alternativos
            </strong>

            <span className="mt-1 block text-sm leading-6">
              Imagens informativas devem possuir textos alternativos
              descritivos.
            </span>
          </li>

          <li className="rounded-lg border border-border-subtle bg-white p-4">
            <strong className="block text-gray-900">
              HTML semântico
            </strong>

            <span className="mt-1 block text-sm leading-6">
              Elementos como cabeçalhos, navegação, listas e seções são usados
              de acordo com sua finalidade.
            </span>
          </li>
        </ul>
      </section>

      <section
        aria-labelledby="boas-praticas"
        className="mt-10 border-t border-border-subtle pt-8"
      >
        <h2
          id="boas-praticas"
          className="text-2xl font-bold text-gray-900"
        >
          Boas práticas para utilizar o portal
        </h2>

        <ol className="mt-5 space-y-4 text-gray-700">
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white"
            >
              1
            </span>

            <span className="leading-7">
              Utilize a navegação principal para acessar Home, Locais, Cadastro
              e Sobre.
            </span>
          </li>

          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white"
            >
              2
            </span>

            <span className="leading-7">
              Para navegar utilizando o teclado, pressione Tab para avançar
              pelos elementos interativos.
            </span>
          </li>

          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white"
            >
              3
            </span>

            <span className="leading-7">
              Utilize a tecla Enter para acessar links e executar ações
              disponíveis.
            </span>
          </li>
        </ol>
      </section>

      <aside
        aria-label="Informação sobre o projeto"
        className="mt-10 rounded-xl border border-brand-primary/20 bg-blue-50 p-6"
      >
        <h2 className="text-lg font-bold text-gray-900">
          Sobre esta página
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-700">
          Esta página faz parte do projeto acadêmico AcessoLocal, desenvolvido
          no curso de Análise e Desenvolvimento de Sistemas da FIAP.
        </p>
      </aside>
    </section>
  )
}