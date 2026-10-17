import { useState } from 'react'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import type { FormEvent } from 'react'
import type { NovoLocal } from '../../types/Local'
import { campos, validarCadastro } from './validacao'
import type { Campo, DadosCadastro, ErrosCadastro } from './validacao'
import RecursosAcessibilidade from './RecursosAcessibilidade'

const dadosIniciais: NovoLocal = {
  nome: '',
  categoria: '',
  endereco: '',
  descricao: '',
  acessibilidades: [],
}

function Cadastro() {
  const [dados, setDados] = useState<NovoLocal>(dadosIniciais)
  const [erros, setErros] = useState<ErrosCadastro>({})
  const [visitados, setVisitados] = useState<Partial<Record<Campo, boolean>>>({})
  const [status, setStatus] = useState('')
  const [statusConfirmado, setStatusConfirmado] = useState(false)
  const [cadastroPendente, setCadastroPendente] = useState<DadosCadastro | null>(null)

  function validarDados(proximos: DadosCadastro) {
    return validarCadastro(proximos)
  }

  function alterar(campo: Campo, valor: string) {
    const proximos = { ...dados, [campo]: valor }
    setDados(proximos)
    setStatus('')
    setStatusConfirmado(false)
    if (visitados[campo]) {
      setErros((anteriores) => ({ ...anteriores, [campo]: validarDados(proximos)[campo] }))
    }
  }

  function validarCampo(campo: Campo) {
    setVisitados((anteriores) => ({ ...anteriores, [campo]: true }))
    setErros((anteriores) => ({ ...anteriores, [campo]: validarDados(dados)[campo] }))
  }

  function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatusConfirmado(false)
    const novosErros = validarDados(dados)
    setErros(novosErros)
    setVisitados({ nome: true, categoria: true, endereco: true, descricao: true })
    const primeiroErro = campos.find((campo) => novosErros[campo.nome])
    if (primeiroErro) {
      setStatus('Revise os campos indicados antes de continuar.')
      const controle = event.currentTarget.elements.namedItem(primeiroErro.nome)
      if (controle instanceof HTMLElement) controle.focus()
      return
    }
    setCadastroPendente(dados)
    setStatus('Dados validados. O envio do cadastro ainda não está disponível; nenhum local foi salvo. Revise os dados no diálogo de confirmação antes de concluir.')
  }

  function alterarAcessibilidades(acessibilidades: string[]) {
    setDados((anteriores) => ({ ...anteriores, acessibilidades }))
    setStatus('')
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10" aria-labelledby="titulo-cadastro">
      <h2 id="titulo-cadastro" className="text-2xl font-bold">Cadastrar local</h2>
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
            className: `mt-1 block w-full rounded border p-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${erro ? 'border-red-700' : 'border-slate-500'}`,
          }
          return (
            <div key={campo.nome}>
              <label htmlFor={campo.nome} className="block font-semibold">{campo.rotulo}</label>
              {campo.nome === 'descricao' ? <textarea {...propriedades} rows={4} /> : <input {...propriedades} type="text" />}
              <p id={`${campo.nome}-erro`} aria-live="polite" className="mt-1 text-sm text-red-800">{erro}</p>
            </div>
          )
        })}
        <RecursosAcessibilidade
          selecionados={dados.acessibilidades}
          onChange={alterarAcessibilidades}
        />
        <button type="submit" className="rounded bg-brand-primary px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">Validar dados</button>
        <p role="status" className={statusConfirmado ? 'rounded-md border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-800' : 'text-slate-800'}>{status}</p>
      </form>
      <ConfirmDialog
        aberto={cadastroPendente !== null}
        titulo="Confirmar cadastro"
        textoConfirmar="Confirmar cadastro"
        textoCancelar="Editar dados"
        onCancelar={() => setCadastroPendente(null)}
        onConfirmar={() => {
          if (!cadastroPendente) return
          setStatus(`Cadastro de "${cadastroPendente.nome.trim()}" confirmado. O envio será integrado em uma etapa posterior.`)
          setStatusConfirmado(true)
          setCadastroPendente(null)
        }}
      >
        <p>
          Confirme o cadastro de <strong>{cadastroPendente?.nome}</strong>.
          Você poderá revisar os dados antes da integração com o serviço.
        </p>
      </ConfirmDialog>
    </section>
  )
}

export default Cadastro
