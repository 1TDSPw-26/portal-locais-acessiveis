import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { cadastrarLocal } from '../../services/locaisService'
import type { NovoLocal } from '../../services/locaisService'

const RECURSOS_ACESSIBILIDADE = [
  'Acesso para cadeirantes',
  'Rampas de acesso',
  'Elevador',
  'Piso tátil',
  'Banheiro acessível',
  'Vagas acessíveis',
  'Audiodescrição',
]

const dadosIniciais: NovoLocal = {
  nome: '',
  descricao: '',
  endereco: '',
  accessibilidades: [],
}

type Resultado =
  | { tipo: 'sucesso'; mensagem: string }
  | { tipo: 'erro'; mensagem: string }
  | null

const estiloCampo =
  'w-full rounded-lg border border-border-subtle p-3 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-brand-primary'

function Cadastro() {
  const [dados, setDados] = useState<NovoLocal>(dadosIniciais)
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<Resultado>(null)
  const mensagemRef = useRef<HTMLDivElement>(null)

  // Leva o foco até a mensagem para que o resultado do envio seja percebido.
  useEffect(() => {
    if (resultado) mensagemRef.current?.focus()
  }, [resultado])

  function atualizarCampo(
    campo: Exclude<keyof NovoLocal, 'accessibilidades'>,
    valor: string,
  ) {
    setDados((atuais) => ({ ...atuais, [campo]: valor }))
  }

  function alternarRecurso(recurso: string) {
    setDados((atuais) => ({
      ...atuais,
      accessibilidades: atuais.accessibilidades.includes(recurso)
        ? atuais.accessibilidades.filter((item) => item !== recurso)
        : [...atuais.accessibilidades, recurso],
    }))
  }

  async function enviarCadastro(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Impede envios repetidos enquanto a requisição está em andamento.
    if (enviando) return

    setEnviando(true)
    setResultado(null)

    try {
      const localCriado = await cadastrarLocal(dados)
      setDados(dadosIniciais)
      setResultado({
        tipo: 'sucesso',
        mensagem: `Local "${localCriado.nome}" cadastrado com sucesso.`,
      })
    } catch (erro) {
      // Os dados digitados são mantidos para o usuário tentar novamente.
      setResultado({
        tipo: 'erro',
        mensagem:
          erro instanceof Error
            ? erro.message
            : 'Não foi possível cadastrar o local. Tente novamente.',
      })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section
      aria-labelledby="titulo-cadastro"
      className="mx-auto w-full max-w-2xl px-4 py-8"
    >
      <h2 id="titulo-cadastro" className="text-2xl font-bold text-brand-primary">
        Cadastrar local
      </h2>

      <p className="mt-2">Informe os dados do local que deseja cadastrar.</p>

      <div
        ref={mensagemRef}
        tabIndex={-1}
        aria-live="polite"
        className="mt-4 focus:outline-none"
      >
        {resultado?.tipo === 'sucesso' && (
          <div
            role="status"
            className="rounded-lg border border-green-700 bg-green-50 p-4 text-green-900"
          >
            <p>{resultado.mensagem}</p>
            <Link
              to="/locais"
              className="mt-2 inline-block font-semibold underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Ver lista de locais
            </Link>
          </div>
        )}

        {resultado?.tipo === 'erro' && (
          <p
            role="alert"
            className="rounded-lg border border-red-700 bg-red-50 p-4 text-red-900"
          >
            {resultado.mensagem}
          </p>
        )}
      </div>

      <form
        onSubmit={enviarCadastro}
        aria-busy={enviando}
        className="mt-6 space-y-6"
      >
        <fieldset disabled={enviando} className="min-w-0 space-y-4">
          <legend className="mb-4 text-lg font-semibold">
            Informações do local
          </legend>

          <div>
            <label htmlFor="nome" className="mb-1 block font-medium">
              Nome do local
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              value={dados.nome}
              onChange={(event) => atualizarCampo('nome', event.target.value)}
              className={estiloCampo}
            />
          </div>

          <div>
            <label htmlFor="endereco" className="mb-1 block font-medium">
              Endereço
            </label>
            <input
              id="endereco"
              name="endereco"
              type="text"
              required
              autoComplete="street-address"
              value={dados.endereco}
              onChange={(event) =>
                atualizarCampo('endereco', event.target.value)
              }
              className={estiloCampo}
            />
          </div>

          <div>
            <label htmlFor="descricao" className="mb-1 block font-medium">
              Descrição do local
            </label>
            <textarea
              id="descricao"
              name="descricao"
              rows={4}
              value={dados.descricao}
              onChange={(event) =>
                atualizarCampo('descricao', event.target.value)
              }
              className={`${estiloCampo} resize-y`}
            />
          </div>
        </fieldset>

        <fieldset disabled={enviando} className="min-w-0">
          <legend className="mb-2 text-lg font-semibold">
            Recursos de acessibilidade
          </legend>

          <div className="grid gap-2 sm:grid-cols-2">
            {RECURSOS_ACESSIBILIDADE.map((recurso) => (
              <label key={recurso} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="accessibilidades"
                  value={recurso}
                  checked={dados.accessibilidades.includes(recurso)}
                  onChange={() => alternarRecurso(recurso)}
                  className="h-5 w-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                />
                {recurso}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={enviando}
          className="rounded-lg bg-brand-primary px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? 'Enviando cadastro...' : 'Cadastrar local'}
        </button>
      </form>
    </section>
  )
}

export default Cadastro
