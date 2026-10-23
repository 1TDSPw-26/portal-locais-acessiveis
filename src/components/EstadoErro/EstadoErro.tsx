type EstadoErroProps = {
  titulo?: string
  mensagem?: string
  aoTentarNovamente?: () => void
  tentandoNovamente?: boolean
}

export default function EstadoErro({
  titulo = 'Algo deu errado',
  mensagem = 'Não foi possível carregar os dados. Verifique sua conexão e tente novamente.',
  aoTentarNovamente,
  tentandoNovamente = false,
}: EstadoErroProps) {
  return (
    <div
      role="alert"
      aria-busy={tentandoNovamente}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <span aria-hidden="true" className="text-5xl">⚠️</span>
      <h3 className="mt-4 text-xl font-bold text-red-800">{titulo}</h3>
      <p className="mt-2 max-w-md text-gray-700">{mensagem}</p>
      {aoTentarNovamente && (
        <button
          type="button"
          onClick={aoTentarNovamente}
          disabled={tentandoNovamente}
          className="mt-6 rounded bg-brand-primary px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          {tentandoNovamente ? 'Tentando novamente...' : 'Tentar novamente'}
        </button>
      )}
    </div>
  )
}