/**
 * Componente de estado de erro – exibido quando uma operação falha.
 * Oferece botão de "Tentar novamente" para recuperação.
 */
type EstadoErroProps = {
  titulo?: string
  mensagem?: string
  aoTentarNovamente?: () => void
}

export default function EstadoErro({
  titulo = 'Algo deu errado',
  mensagem = 'Não foi possível carregar os dados. Verifique sua conexão e tente novamente.',
  aoTentarNovamente,
}: EstadoErroProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <span aria-hidden="true" className="text-5xl">⚠️</span>
      <h3 className="mt-4 text-xl font-bold text-red-800">{titulo}</h3>
      <p className="mt-2 max-w-md text-gray-700">{mensagem}</p>
      {aoTentarNovamente && (
        <button
          type="button"
          onClick={aoTentarNovamente}
          className="mt-6 rounded bg-brand-primary px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          Tentar novamente
        </button>
      )}
    </div>
  )
}
