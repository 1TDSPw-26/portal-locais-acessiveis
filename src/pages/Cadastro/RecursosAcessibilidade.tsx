type RecursosAcessibilidadeProps = {
  recursosSelecionados: string[];
  onChange: (recursos: string[]) => void;
  invalido?: boolean;
};

// Opções presentes nos mocks de listagem e detalhes.
// Alinhar ao contrato oficial quando estiver disponível.
const opcoes = [
  "Rampa de acesso",
  "Elevador",
  "Banheiro adaptado",
  "Piso tátil",
  "Atendimento em Libras",
];

export default function RecursosAcessibilidade({
  recursosSelecionados,
  onChange,
  invalido = false,
}: RecursosAcessibilidadeProps) {
  function alternarRecurso(recurso: string) {
    if (recursosSelecionados.includes(recurso)) {
      const novosRecursos = recursosSelecionados.filter(
        (selecionado) => selecionado !== recurso,
      );

      onChange(novosRecursos);
    } else {
      onChange([...recursosSelecionados, recurso]);
    }
  }

  return (
    <fieldset
      aria-describedby="ajuda-recursos"
      aria-invalid={invalido ? true : undefined}
      className="min-w-0"
    >
      <legend className="text-lg font-semibold">
        Recursos de acessibilidade (pelo menos um obrigatório)
      </legend>

      <p id="ajuda-recursos" className="mt-2 text-sm text-gray-600">
        Selecione pelo menos um recurso disponível no local. Você pode marcar
        mais de uma opção.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {opcoes.map((recurso, indice) => (
          <label
            key={recurso}
            htmlFor={`recurso-${indice}`}
            className={`flex min-h-11 cursor-pointer items-center gap-3
                        rounded-lg border p-3 ${
                          invalido ? "border-red-700" : "border-border-subtle"
                        }`}
          >
            <input
              id={`recurso-${indice}`}
              name="recursos"
              type="checkbox"
              value={recurso}
              checked={recursosSelecionados.includes(recurso)}
              onChange={() => alternarRecurso(recurso)}
              aria-describedby="ajuda-recursos"
              className="h-5 w-5 shrink-0 accent-brand-primary
                         focus-visible:outline-2 focus-visible:outline-offset-2
                         focus-visible:outline-brand-primary"
            />

            <span>{recurso}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
