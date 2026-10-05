import { useState } from "react";
import type { FormEvent } from "react";
import type { CadastroLocal } from "../../types/cadastroLocal";
import { validarCadastro } from "../../utils/validarCadastro";
import type {
  CampoObrigatorio,
  ErrosCadastro,
} from "../../utils/validarCadastro";
import RecursosAcessibilidade from "./RecursosAcessibilidade";

const dadosIniciais: CadastroLocal = {
  nome: "",
  categoria: "",
  endereco: "",
  descricao: "",
  recursos: [],
};

const ordemCampos: CampoObrigatorio[] = [
  "nome",
  "categoria",
  "endereco",
  "recursos",
];

export default function Cadastro() {
  const [dados, setDados] = useState<CadastroLocal>(dadosIniciais);
  const [erros, setErros] = useState<ErrosCadastro>({});
  const [tentouValidar, setTentouValidar] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const estiloCampo =
    "w-full rounded-lg border border-border-subtle p-3 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "focus-visible:outline-brand-primary " +
    "aria-[invalid=true]:border-red-700";

  function atualizarCampo(
    campo: Exclude<keyof CadastroLocal, "recursos">,
    valor: string,
  ) {
    const novosDados: CadastroLocal = {
      ...dados,
      [campo]: valor,
    };

    setDados(novosDados);
    setMensagem("");

    if (tentouValidar) {
      setErros(validarCadastro(novosDados));
    }
  }

  function atualizarRecursos(recursos: string[]) {
    const novosDados: CadastroLocal = {
      ...dados,
      recursos,
    };

    setDados(novosDados);
    setMensagem("");

    if (tentouValidar) {
      setErros(validarCadastro(novosDados));
    }
  }

  function verificarCadastro(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulario = event.currentTarget;
    const novosErros = validarCadastro(dados);

    setErros(novosErros);
    setTentouValidar(true);

    const primeiroCampoInvalido = ordemCampos.find(
      (campo) => novosErros[campo] !== undefined,
    );

    if (primeiroCampoInvalido) {
      setMensagem(
        "Preencha nome, categoria e endereço e selecione pelo menos um recurso de acessibilidade. Campos contendo apenas espaços não são aceitos.",
      );

      if (primeiroCampoInvalido === "recursos") {
        const primeiraOpcao = formulario.querySelector<HTMLInputElement>(
          'input[name="recursos"]',
        );

        primeiraOpcao?.focus();
      } else {
        const campo = formulario.elements.namedItem(primeiroCampoInvalido);

        if (campo instanceof HTMLInputElement) {
          campo.focus();
        }
      }

      return;
    }

    setMensagem(
      "Os campos obrigatórios estão preenchidos e há pelo menos um recurso selecionado. Nenhum cadastro foi enviado.",
    );
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
        Você pode verificar o preenchimento. O envio do cadastro ainda não está
        disponível.
      </p>

      <form
        onSubmit={verificarCadastro}
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
              Nome do local (obrigatório)
            </label>

            <input
              id="nome"
              name="nome"
              type="text"
              required
              value={dados.nome}
              onChange={(event) => atualizarCampo("nome", event.target.value)}
              aria-invalid={erros.nome ? true : undefined}
              className={estiloCampo}
            />
          </div>

          <div>
            <label htmlFor="categoria" className="mb-1 block font-medium">
              Categoria (obrigatória)
            </label>

            <input
              id="categoria"
              name="categoria"
              type="text"
              required
              value={dados.categoria}
              onChange={(event) =>
                atualizarCampo("categoria", event.target.value)
              }
              aria-invalid={erros.categoria ? true : undefined}
              className={estiloCampo}
            />
          </div>

          <div>
            <label htmlFor="endereco" className="mb-1 block font-medium">
              Endereço (obrigatório)
            </label>

            <input
              id="endereco"
              name="endereco"
              type="text"
              autoComplete="street-address"
              required
              value={dados.endereco}
              onChange={(event) =>
                atualizarCampo("endereco", event.target.value)
              }
              aria-invalid={erros.endereco ? true : undefined}
              className={estiloCampo}
            />
          </div>

          <div>
            <label htmlFor="descricao" className="mb-1 block font-medium">
              Descrição do local (opcional)
            </label>

            <p id="ajuda-descricao" className="mb-2 text-sm text-gray-600">
              Conte o que o local oferece e quais atividades ou serviços estão
              disponíveis. Selecione os recursos de acessibilidade na seção
              abaixo.
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

        <RecursosAcessibilidade
          recursosSelecionados={dados.recursos}
          onChange={atualizarRecursos}
          invalido={Boolean(erros.recursos)}
        />

        <p role="status" aria-atomic="true" className="text-sm text-gray-700">
          {mensagem}
        </p>

        <button
          type="submit"
          className="rounded-lg bg-brand-primary px-5 py-3 font-semibold
                     text-white hover:bg-brand-footer
                     focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-brand-primary"
        >
          Verificar preenchimento
        </button>
      </form>
    </section>
  );
}
