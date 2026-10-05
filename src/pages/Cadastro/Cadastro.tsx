import { useState } from "react";
import type { FormEvent } from "react";
import type { CadastroLocal } from "../../types/cadastroLocal";

const dadosIniciais: CadastroLocal = {
  nome: "",
  categoria: "",
  endereco: "",
  descricao: "",
  recursos: [],
};

export default function Cadastro() {
  const [dados, setDados] = useState<CadastroLocal>(dadosIniciais);

  const estiloCampo =
    "w-full rounded-lg border border-border-subtle p-3 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "focus-visible:outline-brand-primary";

  function atualizarCampo(
    campo: Exclude<keyof CadastroLocal, "recursos">,
    valor: string,
  ) {
    setDados((dadosAtuais) => ({
      ...dadosAtuais,
      [campo]: valor,
    }));
  }

  function impedirEnvio(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section
      aria-labelledby="titulo-cadastro"
      className="mx-auto w-full max-w-2xl px-4 py-8"
    >
      <h2
        id="titulo-cadastro"
        className="text-2xl font-bold text-brand-primary"
      >
        Cadastrar local
      </h2>

      <p className="mt-2 text-gray-700">
        Informe os dados do local que deseja cadastrar.
      </p>

      <p id="aviso-cadastro" className="mt-3 text-sm text-gray-600">
        O envio do cadastro ainda não está disponível.
      </p>

      <form
        onSubmit={impedirEnvio}
        noValidate
        aria-describedby="aviso-cadastro"
        className="mt-6 space-y-6"
      >
        <fieldset className="min-w-0 space-y-4">
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
              value={dados.nome}
              onChange={(event) => atualizarCampo("nome", event.target.value)}
              className={estiloCampo}
            />
          </div>

          <div>
            <label htmlFor="categoria" className="mb-1 block font-medium">
              Categoria
            </label>

            <input
              id="categoria"
              name="categoria"
              type="text"
              value={dados.categoria}
              onChange={(event) =>
                atualizarCampo("categoria", event.target.value)
              }
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
              autoComplete="street-address"
              value={dados.endereco}
              onChange={(event) =>
                atualizarCampo("endereco", event.target.value)
              }
              className={estiloCampo}
            />
          </div>

          <div>
            <label htmlFor="descricao" className="mb-1 block font-medium">
              Descrição do local
            </label>

            <p id="ajuda-descricao" className="mb-2 text-sm text-gray-600">
              Conte o que o local oferece e quais atividades ou serviços estão
              disponíveis.
            </p>

            <textarea
              id="descricao"
              name="descricao"
              rows={4}
              value={dados.descricao}
              onChange={(event) =>
                atualizarCampo("descricao", event.target.value)
              }
              aria-describedby="ajuda-descricao"
              placeholder="Ex.: Biblioteca pública com empréstimo de livros, espaço para estudo e atividades culturais."
              className={`${estiloCampo} resize-y`}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          disabled
          className="rounded-lg bg-brand-primary px-5 py-3 font-semibold
                     text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cadastrar local
        </button>
      </form>
    </section>
  );
}
