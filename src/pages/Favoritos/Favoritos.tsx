import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import EstadoErro from '../../components/EstadoErro/EstadoErro'
import Loading from '../../components/Loading/Loading'
import LocalCard from '../../components/LocalCard/LocalCard'
import { useFavoritos } from '../../hooks/useFavoritos'
import { useLocais } from '../../hooks/useLocais'

const classeAcao =
  'text-brand-primary inline-flex min-h-11 items-center justify-center rounded-md border border-brand-primary px-4 py-2 font-bold hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary'

export default function Favoritos() {
  const { favoritos, removerFavorito, erro: erroFavoritos } = useFavoritos()
  const { dados: locais, carregando, erro, recarregar } = useLocais()
  const tituloRef = useRef<HTMLHeadingElement>(null)
  const locaisFavoritos = locais.filter((local) => favoritos.includes(local.id))
  const indisponiveis = favoritos.length - locaisFavoritos.length

  useEffect(() => {
    const tituloAnterior = document.title
    document.title = 'Favoritos | AcessoLocal'
    tituloRef.current?.focus()
    return () => { document.title = tituloAnterior }
  }, [])

  function desfavoritar(id: number) {
    if (removerFavorito(id)) tituloRef.current?.focus()
  }

  return (
    <section
      aria-labelledby="titulo-favoritos"
      className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6"
    >
      <h1
        id="titulo-favoritos"
        ref={tituloRef}
        tabIndex={-1}
        className="text-3xl font-bold text-gray-900 focus:outline-none"
      >
        Favoritos
      </h1>
      <p className="mt-2 text-gray-700">
        Consulte os locais que você salvou para encontrar mais tarde.
      </p>

      {erroFavoritos && (
        <p role="alert" className="mt-4 rounded-md border border-red-700 p-4 text-red-900">
          {erroFavoritos}
        </p>
      )}

      {carregando ? (
        <Loading mensagem="Carregando locais favoritos..." />
      ) : erro ? (
        <EstadoErro mensagem={erro} aoTentarNovamente={recarregar} />
      ) : (
        <>
          <p role="status" className="mt-6 text-gray-700">
            {locaisFavoritos.length === 1
              ? '1 local favorito disponível.'
              : `${locaisFavoritos.length} locais favoritos disponíveis.`}
          </p>

          {indisponiveis > 0 && (
            <p className="mt-3 text-gray-700">
              Alguns locais salvos não estão mais disponíveis e foram omitidos da lista.
            </p>
          )}

          {locaisFavoritos.length === 0 ? (
            <div className="mt-6 rounded-lg border border-border-subtle p-6">
              <h2 className="text-xl font-bold">Nenhum favorito por aqui</h2>
              <p className="mt-2 text-gray-700">
                Volte à busca para encontrar locais acessíveis e marcá-los como favoritos.
              </p>
              <Link to="/locais" className={`${classeAcao} mt-5`}>
                Explorar locais
              </Link>
            </div>
          ) : (
            <>
              <h2 className="mt-6 text-xl font-bold">Seus locais favoritos</h2>
              <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {locaisFavoritos.map((local) => (
                  <li key={local.id} className="flex min-w-0 flex-col gap-3">
                    <LocalCard local={local} />
                    <button
                      type="button"
                      aria-label={`Remover ${local.nome} dos favoritos`}
                      onClick={() => desfavoritar(local.id)}
                      className={`${classeAcao} mt-auto w-full`}
                    >
                      Remover dos favoritos
                    </button>
                  </li>
                ))}
              </ul>
              <Link to="/locais" className={`${classeAcao} mt-6`}>
                Explorar locais
              </Link>
            </>
          )}
        </>
      )}
    </section>
  )
}
