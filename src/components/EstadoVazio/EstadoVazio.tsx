/**
 * Componente de estado vazio – exibido quando uma busca retorna zero resultados.
 */
type EstadoVazioProps = {
  titulo?: string
  mensagem?: string
}

export default function EstadoVazio({
  titulo = 'Nenhum resultado encontrado',
  mensagem = 'Não há itens para exibir no momento.',
}: EstadoVazioProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <span aria-hidden="true" className="text-5xl">📭</span>
      <h3 className="mt-4 text-xl font-bold text-gray-900">{titulo}</h3>
      <p className="mt-2 max-w-md text-gray-700">{mensagem}</p>
    </div>
  )
}
