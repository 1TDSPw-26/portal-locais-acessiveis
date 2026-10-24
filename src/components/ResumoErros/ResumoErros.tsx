import { useId } from 'react'
import type { RefObject } from 'react'

export type ErroFormulario = {
  campo: string
  mensagem: string
}

type ResumoErrosProps = {
  erros: ErroFormulario[]
  referencias: Record<string, RefObject<HTMLElement | null>>
}

export default function ResumoErros({ erros, referencias }: ResumoErrosProps) {
  const tituloId = useId()

  // só mostra erros que apontam para um campo existente
  const errosValidos = erros.filter((erro) => erro.campo in referencias)

  if (errosValidos.length === 0) return null

  function irParaCampo(campo: string) {
    referencias[campo]?.current?.focus()
  }

  const quantidade = errosValidos.length

  return (
    <section aria-labelledby={tituloId}>
      <h2 id={tituloId}>
        {quantidade} {quantidade === 1 ? 'erro encontrado' : 'erros encontrados'}
      </h2>
      <ul>
        {errosValidos.map((erro) => (
          <li key={erro.campo}>
            <button type="button" onClick={() => irParaCampo(erro.campo)}>
              {erro.mensagem}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}