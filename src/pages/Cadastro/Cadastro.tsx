import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { campos, validarCadastro } from './validacao'
import type { Campo, DadosCadastro, ErrosCadastro } from './validacao'
import { cadastrarLocal } from '../../services/locaisService'

const dadosIniciais: DadosCadastro = { nome: '', categoria: '', endereco: '', descricao: '' }

function Cadastro() {
  const [dados, setDados] = useState<DadosCadastro>(dadosIniciais)
  const [erros, setErros] = useState<ErrosCadastro>({})
  const [visitados, setVisitados] = useState<Partial<Record<Campo, boolean>>>({})
  const [status, setStatus] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [cadastrado, setCadastrado] = useState(false)
  const [erroEnvio, setErroEnvio] = useState('')

  function alterar(campo: Campo, valor: string) {
    const proximos = { ...dados, [campo]: valor }
    setDados(proximos)
    setStatus('')
    setCadastrado(false)
    setErroEnvio('')
    if (visitados[campo]) {
      setErros((anteriores) => ({ ...anteriores, [campo]: validarCadastro(proximos)[campo] }))
    }
  }

  function validarCampo(campo: Campo) {
    setVisitados((anteriores) => ({ ...anteriores, [campo]: true }))
    setErros((anteriores) => ({ ...anteriores, [campo]: validarCadastro(dados)[campo] }))
  }

  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Impede envios repetidos enquanto a requisição está em andamento.
    if (enviando) return
    setCadastrado(false)
    setErroEnvio('')
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

    setEnviando(true)
    setStatus('Enviando cadastro...')
    try {
      const localCriado = await cadastrarLocal({
        nome: dados.nome,
        categoria: dados.categoria,
        endereco: dados.endereco,
        descricao: dados.descricao,
        accessibilidades: [],
      })
      setDados(dadosIniciais)
      setErros({})
      setVisitados({})
      setStatus(`Local "${localCriado.nome}" cadastrado com sucesso.`)
      setCadastrado(true)
    } catch (erro) {
      // Os dados digitados são mantidos para o usuário tentar novamente.
      setStatus('')
      setErroEnvio(erro instanceof Error ? erro.message : 'Não foi possível cadastrar o local. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8" aria-labelledby="titulo-cadastro">
      <h2 id="titulo-cadastro" className="text-2xl font-bold">Cadastrar local</h2>
      <p className="mt-2">Todos os campos são obrigatórios.</p>
      <p className="mt-2 text-slate-700">Preencha os dados do local que deseja cadastrar.</p>
      <form noValidate onSubmit={enviar} aria-busy={enviando} className="mt-6 space-y-5">
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
        <button type="submit" disabled={enviando} className="rounded bg-brand-primary px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-60">
          {enviando ? 'Enviando cadastro...' : 'Cadastrar local'}
        </button>
        <p role="status" className="text-slate-800">{status}</p>
        {erroEnvio && <p role="alert" className="rounded border border-red-700 bg-red-50 p-3 text-red-900">{erroEnvio}</p>}
        {cadastrado && (
          <Link to="/locais" className="inline-block font-semibold underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
            Ver lista de locais
          </Link>
        )}
      </form>
    </section>
  )
}

export default Cadastro
