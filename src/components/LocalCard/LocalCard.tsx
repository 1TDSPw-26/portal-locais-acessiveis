
import type { Locais } from '../../types/Locais';

type LocalCardProps = {
  local: Locais;
};

export default function LocalCard({ local }: LocalCardProps) {
    return(
         <article className="rounded-lg border border-border-subtle p-5">
      <h3 className="text-lg font-bold">
        {local.nome}
      </h3>

      <p className="mt-2 text-sm">
        {local.descricao}
      </p>

      <p className="mt-1 text-sm">
        {local.endereco}
      </p>

      <ul className="mt-3 list-disc pl-5 text-sm">
        {local.accessibilidades.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}