type RecursosAcessibilidadeProps = {
  recursosSelecionados: string[]
  onChange: (recursos: string[]) => void
}

// Opções presentes nos mocks de listagem e detalhes.
// Alinhar ao contrato oficial quando estiver disponível.
const opcoes = [
  'Rampa de acesso',
  'Elevador',
  'Banheiro adaptado',
  'Piso tátil',
  'Atendimento em Libras',
]

export default function RecursosAcessibilidade({
  recursosSelecionados,
  onChange,
}: RecursosAcessibilidadeProps) {
  function alternarRecurso(recurso: string) {
    if (recursosSelecionados.includes(recurso)) {
      const novosRecursos = recursosSelecionados.filter(
        (selecionado) => selecionado !== recurso,
      )

      onChange(novosRecursos)
    } else {
      onChange([...recursosSelecionados, recurso])
    }
  }

  return (
    <fieldset
      aria-describedby="ajuda-recursos"
      className="min-w-0"
    >
      <legend className="text-lg font-semibold">
        Recursos de acessibilidade
      </legend>

      <p id="ajuda-recursos" className="mt-2 text-sm text-gray-600">
        Marque os recursos disponíveis no local. Você pode selecionar
        mais de uma opção.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {opcoes.map((recurso, indice) => (
          <label
            key={recurso}
            htmlFor={`recurso-${indice}`}
            className="flex min-h-11 cursor-pointer items-center gap-3
                       rounded-lg border border-border-subtle p-3"
          >
            <input
              id={`recurso-${indice}`}
              name="recursos"
              type="checkbox"
              value={recurso}
              checked={recursosSelecionados.includes(recurso)}
              onChange={() => alternarRecurso(recurso)}
              className="h-5 w-5 shrink-0 accent-brand-primary
                         focus-visible:outline-2 focus-visible:outline-offset-2
                         focus-visible:outline-brand-primary"
            />

            <span>{recurso}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}