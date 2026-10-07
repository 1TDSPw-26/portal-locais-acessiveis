import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { validarCadastro } from '../Cadastro/validacao'
import { atualizarLocal, obterLocal } from '../../services/editarLocalService'
import type { Locais } from '../../types/Locais'

const classeCampo =
  'mt-1 block w-full rounded border border-slate-500 p-3 text-slate-900 aria-invalid:border-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary'
const classeErro = 'mt-1 text-sm text-red-800'
const classeLink =
  'inline-block font-semibold underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary'

function Formulario({ local }: { local: Locais }) {
  const [dados, setDados] = useState({
    nome: local.nome,
    categoria: local.categoria,
    endereco: local.endereco,
    descricao: local.descricao,
  })
  const [erros, setErros] = useState<Partial<typeof dados>>({})
  const [sucesso, setSucesso] = useState('')
  const [erroEnvio, setErroEnvio] = useState('')
  const [salvando, setSalvando] = useState(false)

  function alterar(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setDados({ ...dados, [event.target.name]: event.target.value })
    setSucesso('')
    setErroEnvio('')
  }

  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSucesso('')
    setErroEnvio('')

    // Reaproveita a validação do cadastro. Se houver erro, foca o primeiro campo.
    const novosErros = validarCadastro(dados)
    setErros(novosErros)
    const camposComErro = Object.keys(novosErros)
    if (camposComErro.length > 0) {
      document.getElementById(camposComErro[0])?.focus()
      return
    }

    setSalvando(true)
    try {
      const atualizado = await atualizarLocal(local.id, dados)
      setSucesso(`Local "${atualizado.nome}" atualizado com sucesso.`)
    } catch (erro) {
      setErroEnvio(erro instanceof Error ? erro.message : 'Não foi possível salvar.')
    }
    setSalvando(false)
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8" aria-labelledby="titulo-editar">
      <h2 id="titulo-editar" className="text-2xl font-bold">Editar local</h2>
      <p className="mt-2">Todos os campos são obrigatórios.</p>

      <form noValidate onSubmit={enviar} className="mt-6 space-y-5">
        <div>
          <label htmlFor="nome" className="block font-semibold">Nome do local</label>
          <input id="nome" name="nome" type="text" value={dados.nome} onChange={alterar}
            aria-invalid={Boolean(erros.nome)} aria-describedby="nome-erro" className={classeCampo} />
          <p id="nome-erro" className={classeErro}>{erros.nome}</p>
        </div>

        <div>
          <label htmlFor="categoria" className="block font-semibold">Categoria</label>
          <input id="categoria" name="categoria" type="text" value={dados.categoria} onChange={alterar}
            aria-invalid={Boolean(erros.categoria)} aria-describedby="categoria-erro" className={classeCampo} />
          <p id="categoria-erro" className={classeErro}>{erros.categoria}</p>
        </div>

        <div>
          <label htmlFor="endereco" className="block font-semibold">Endereço</label>
          <input id="endereco" name="endereco" type="text" value={dados.endereco} onChange={alterar}
            aria-invalid={Boolean(erros.endereco)} aria-describedby="endereco-erro" className={classeCampo} />
          <p id="endereco-erro" className={classeErro}>{erros.endereco}</p>
        </div>

        <div>
          <label htmlFor="descricao" className="block font-semibold">Descrição</label>
          <textarea id="descricao" name="descricao" rows={4} value={dados.descricao} onChange={alterar}
            aria-invalid={Boolean(erros.descricao)} aria-describedby="descricao-erro" className={classeCampo} />
          <p id="descricao-erro" className={classeErro}>{erros.descricao}</p>
        </div>

        <button
          type="submit"
          disabled={salvando}
          className="rounded bg-brand-primary px-5 py-3 font-semibold text-white disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          {salvando ? 'Salvando...' : 'Salvar alterações'}
        </button>

        <p role="status" className="text-slate-800">{sucesso}</p>
        {erroEnvio && <p role="alert" className="rounded border border-red-700 bg-red-50 p-3 text-red-900">{erroEnvio}</p>}
        <Link to="/locais" className={classeLink}>Voltar para a lista de locais</Link>
      </form>
    </section>
  )
}

export default function EditarLocal() {
  const { id } = useParams()
  const local = obterLocal(Number(id))

  if (!local) {
    return (
      <section className="mx-auto w-full max-w-2xl px-4 py-8" aria-labelledby="titulo-editar">
        <h2 id="titulo-editar" className="text-2xl font-bold">Local não encontrado</h2>
        <p className="mt-3 text-gray-700">Não encontramos um local com o código “{id}”.</p>
        <Link to="/locais" className={`${classeLink} mt-6`}>Voltar para a lista de locais</Link>
      </section>
    )
  }

  return <Formulario local={local} />
}