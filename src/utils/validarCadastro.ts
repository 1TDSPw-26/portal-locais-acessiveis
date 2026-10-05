import type { CadastroLocal } from "../types/cadastroLocal";

export type CampoObrigatorio = "nome" | "categoria" | "endereco" | "recursos";

export type ErrosCadastro = Partial<Record<CampoObrigatorio, "obrigatorio">>;

// Regras provisórias: alinhar com a equipe e o contrato oficial.
// A descrição é opcional.
export function validarCadastro(dados: CadastroLocal): ErrosCadastro {
  const erros: ErrosCadastro = {};

  if (dados.nome.trim() === "") {
    erros.nome = "obrigatorio";
  }

  if (dados.categoria.trim() === "") {
    erros.categoria = "obrigatorio";
  }

  if (dados.endereco.trim() === "") {
    erros.endereco = "obrigatorio";
  }

  if (dados.recursos.length === 0) {
    erros.recursos = "obrigatorio";
  }

  return erros;
}
