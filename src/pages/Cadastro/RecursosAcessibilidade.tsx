import type { ChangeEvent } from 'react'

const recursosDisponiveis = [
  'Acesso para cadeirantes',
  'Banheiro acessível',
  'Elevador',
  'Piso tátil',
  'Rampas de acesso',
  'Vagas acessíveis',
]

type RecursosAcessibilidadeProps = {
  selecionados: string[]
  onChange: (recursos: string[]) => void
}

export default function RecursosAcessibilidade({
  selecionados,
  onChange,
}: RecursosAcessibilidadeProps) {
  function alternarRecurso(event: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target
    onChange(
      checked
        ? [...selecionados, value]
        : selecionados.filter((recurso) => recurso !== value),
    )
  }

  return (
    <fieldset className="min-w-0 space-y-3">
      <legend className="text-lg font-semibold">Recursos de acessibilidade</legend>
      <p className="text-sm text-gray-700">Selecione os recursos disponíveis no local.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {recursosDisponiveis.map((recurso) => (
          <label key={recurso} className="flex min-h-11 items-center gap-3 rounded-md border border-border-subtle px-3 py-2">
            <input
              type="checkbox"
              value={recurso}
              checked={selecionados.includes(recurso)}
              onChange={alternarRecurso}
              className="size-5 accent-brand-primary"
            />
            <span>{recurso}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
