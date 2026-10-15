import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buscarLocalPorId, atualizarLocal } from '../../services/locaisService'
import { campos, validarCadastro } from '../Cadastro/validacao'
import type { Campo, DadosCadastro, ErrosCadastro } from '../Cadastro/validacao'

const classeCampo = 'mt-1 block min-h-11 w-full rounded border border-slate-500 p-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary'
const classeLink = 'inline-flex min-h-11 items-center font-semibold underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary'

type FormularioProps = { localId: number }

function Formulario({ localId }: FormularioProps) {
  const local = buscarLocalPorId(localId)
  const [dados, setDados] = useState<DadosCadastro>(() => ({
    nome: local?.nome ?? '',
    categoria: local?.categoria ?? '',
    endereco: local?.endereco ?? '',
    descricao: local?.descricao ?? '',
  }))
  const [erros, setErros] = useState<ErrosCadastro>({})
  const [status, setStatus] = useState('')
  const [erroEnvio, setErroEnvio] = useState('')

  function alterar(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const campo = event.target.name as Campo
    setDados((anteriores) => ({ ...anteriores, [campo]: event.target.value }))
    setStatus('')
    setErroEnvio('')
  }

  function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const novosErros = validarCadastro(dados)
    setErros(novosErros)
    const primeiroErro = campos.find((campo) => novosErros[campo.nome])
    if (primeiroErro) {
      document.getElementById(primeiroErro.nome)?.focus()
      return
    }
    try {
      const atualizado = atualizarLocal(localId, {
        ...dados,
        acessibilidades: local?.acessibilidades ?? [],
      })
      setStatus(`Local "${atualizado.nome}" atualizado com sucesso.`)
    } catch (erro) {
      setErroEnvio(erro instanceof Error ? erro.message : 'Não foi possível salvar as alterações.')
    }
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10" aria-labelledby="titulo-editar">
      <h1 id="titulo-editar" className="text-2xl font-bold">Editar local</h1>
      <p className="mt-2">Atualize os dados do local selecionado.</p>
      <form noValidate onSubmit={enviar} className="mt-6 space-y-5">
        {campos.map((campo) => {
          const erro = erros[campo.nome]
          return (
            <div key={campo.nome}>
              <label htmlFor={campo.nome} className="block font-semibold">{campo.rotulo}</label>
              {campo.nome === 'descricao' ? (
                <textarea id={campo.nome} name={campo.nome} rows={4} value={dados[campo.nome]} onChange={alterar} aria-invalid={Boolean(erro)} aria-describedby={`${campo.nome}-erro`} className={classeCampo} />
              ) : (
                <input id={campo.nome} name={campo.nome} type="text" value={dados[campo.nome]} onChange={alterar} aria-invalid={Boolean(erro)} aria-describedby={`${campo.nome}-erro`} className={classeCampo} />
              )}
              <p id={`${campo.nome}-erro`} className="mt-1 text-sm text-red-800">{erro}</p>
            </div>
          )
        })}
        <button type="submit" className="rounded bg-brand-primary px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">Salvar alterações</button>
        <p role="status" className="text-slate-800">{status}</p>
        {erroEnvio && <p role="alert" className="rounded border border-red-700 bg-red-50 p-3 text-red-900">{erroEnvio}</p>}
        <Link to="/locais" className={classeLink}>Voltar para a lista de locais</Link>
      </form>
    </section>
  )
}

export default function EditarLocal() {
  const { id } = useParams()
  const localId = Number(id)
  const local = Number.isSafeInteger(localId) && localId > 0 ? buscarLocalPorId(localId) : undefined
  if (!local) {
    return (
      <section className="mx-auto w-full max-w-2xl px-4 py-8" aria-labelledby="titulo-editar">
        <h1 id="titulo-editar" className="text-2xl font-bold">Local não encontrado</h1>
        <p className="mt-3 text-gray-700">Não encontramos um local com o código “{id}”.</p>
        <Link to="/locais" className={`${classeLink} mt-6`}>Voltar para a lista de locais</Link>
      </section>
    )
  }
  return <Formulario localId={local.id} />
}
