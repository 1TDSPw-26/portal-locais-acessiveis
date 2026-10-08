import { useState } from 'react'
import type { FormEvent } from 'react'
import { campos, validarCadastro } from './validacao'
import type { Campo, DadosCadastro, ErrosCadastro } from './validacao'

function Cadastro() {
  const [dados, setDados] = useState<DadosCadastro>({ nome: '', categoria: '', endereco: '', descricao: '' })
  const [erros, setErros] = useState<ErrosCadastro>({})
  const [visitados, setVisitados] = useState<Partial<Record<Campo, boolean>>>({})
  const [status, setStatus] = useState('')

  function alterar(campo: Campo, valor: string) {
    const proximos = { ...dados, [campo]: valor }
    setDados(proximos)
    setStatus('')
    if (visitados[campo]) {
      setErros((anteriores) => ({ ...anteriores, [campo]: validarCadastro(proximos)[campo] }))
    }
  }

  function validarCampo(campo: Campo) {
    setVisitados((anteriores) => ({ ...anteriores, [campo]: true }))
    setErros((anteriores) => ({ ...anteriores, [campo]: validarCadastro(dados)[campo] }))
  }

  function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const novosErros = validarCadastro(dados)
    setErros(novosErros)
    setVisitados({ nome: true, categoria: true, endereco: true, descricao: true })
    const primeiroErro = campos.find((campo) => novosErros[campo.nome])
    if (primeiroErro) {
      setStatus('Revise os campos indicados antes de continuar.')
      const controle = event.currentTarget.elements.namedItem(primeiroErro.nome)
      if (controle instanceof HTMLElement) controle.focus()
      return
    }
    setStatus('Dados validados. O envio do cadastro ainda não está disponível; nenhum local foi salvo.')
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10" aria-labelledby="titulo-cadastro">
      <h2 id="titulo-cadastro" className="text-[clamp(1.5rem,4vw,2rem)] font-bold leading-tight">Cadastrar local</h2>
      <p className="mt-2">Todos os campos são obrigatórios.</p>
      <p className="mt-2 text-slate-700">Preencha os dados para validá-los. O envio do cadastro ainda não está disponível.</p>
      <form noValidate onSubmit={enviar} className="mt-6 space-y-5">
        {campos.map((campo) => {
          const erro = erros[campo.nome]
          const propriedades = {
            id: campo.nome,
            name: campo.nome,
            required: true,
            value: dados[campo.nome],
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => alterar(campo.nome, event.target.value),
            onBlur: () => validarCampo(campo.nome),
            'aria-invalid': erro ? true : undefined,
            'aria-describedby': erro ? `${campo.nome}-erro` : undefined,
            className: `mt-1 block min-h-11 w-full rounded border p-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${erro ? 'border-red-700' : 'border-slate-500'}`,
          }
          return (
            <div key={campo.nome}>
              <label htmlFor={campo.nome} className="block font-semibold">{campo.rotulo}</label>
              {campo.nome === 'descricao' ? <textarea {...propriedades} rows={4} /> : <input {...propriedades} type="text" />}
              <p id={`${campo.nome}-erro`} aria-live="polite" className="mt-1 text-sm text-red-800">{erro}</p>
            </div>
          )
        })}
        <button type="submit" className="rounded bg-brand-primary px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">Validar dados</button>
        <p role="status" className="text-slate-800">{status}</p>
      </form>
    </section>
  )
}

export default Cadastro
