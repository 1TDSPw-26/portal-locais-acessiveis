import type { CadastroLocal } from "../types/cadastroLocal";

export type CampoObrigatorio = "nome" | "categoria" | "endereco";

export type ErrosCadastro = Partial<
  Record<CampoObrigatorio, "obrigatorio">
>;

// Regras provisórias: alinhar com a equipe e o contrato oficial.
// Descrição e recursos de acessibilidade são opcionais.
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

  return erros;
}