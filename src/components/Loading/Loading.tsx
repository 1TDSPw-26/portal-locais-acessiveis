/**
 * Componente de estado de carregamento (loading spinner).
 * Acessível via role="status" e aria-live para leitores de tela.
 */
type LoadingProps = {
  mensagem?: string
}

export default function Loading({ mensagem = 'Carregando...' }: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-16"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"
        aria-hidden="true"
      />
      <p className="mt-4 text-gray-700">{mensagem}</p>
    </div>
  )
}
