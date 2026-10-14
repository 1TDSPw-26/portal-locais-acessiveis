import { locais as locaisIniciais } from "../components/Dados/Locais";
import type { Local } from "../types/Local";

export type DadosLocal = Omit<Local, "id">;

export const CHAVE_LOCAIS = "portal-locais-acessiveis:locais:v1";

type ArmazenamentoLocais = {
  proximoId: number;
  locais: Local[];
};

export class ArmazenamentoLocaisError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "ArmazenamentoLocaisError";
  }
}

function ehObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function ehTextoPreenchido(valor: unknown): valor is string {
  return typeof valor === "string" && valor.trim().length > 0;
}

function possuiDadosValidos(valor: unknown): valor is DadosLocal {
  if (!ehObjeto(valor)) {
    return false;
  }

  return (
    ehTextoPreenchido(valor.nome) &&
    ehTextoPreenchido(valor.categoria) &&
    ehTextoPreenchido(valor.descricao) &&
    ehTextoPreenchido(valor.endereco) &&
    Array.isArray(valor.accessibilidades) &&
    valor.accessibilidades.every(ehTextoPreenchido)
  );
}

function ehLocal(valor: unknown): valor is Local {
  if (!ehObjeto(valor)) {
    return false;
  }

  const id = valor.id;

  return (
    typeof id === "number" &&
    Number.isSafeInteger(id) &&
    id > 0 &&
    possuiDadosValidos(valor)
  );
}

function ehArmazenamento(
  valor: unknown
): valor is ArmazenamentoLocais {
  if (!ehObjeto(valor)) {
    return false;
  }

  const proximoId = valor.proximoId;
  const locais = valor.locais;

  if (
    typeof proximoId !== "number" ||
    !Number.isSafeInteger(proximoId) ||
    proximoId < 1 ||
    !Array.isArray(locais) ||
    !locais.every(ehLocal)
  ) {
    return false;
  }

  const ids = locais.map((local) => local.id);

  return (
    new Set(ids).size === ids.length &&
    ids.every((id) => id < proximoId)
  );
}

function criarEstadoInicial(): ArmazenamentoLocais {
  return {
    proximoId:
      locaisIniciais.reduce(
        (maiorId, local) => Math.max(maiorId, local.id),
        0
      ) + 1,
    locais: locaisIniciais.map((local) => ({
      ...local,
      accessibilidades: [...local.acessibilidades],
    })),
  };
}

function lerArmazenamento(): ArmazenamentoLocais {
  let salvo: string | null;

  try {
    salvo = localStorage.getItem(CHAVE_LOCAIS);
  } catch {
    throw new ArmazenamentoLocaisError(
      "Não foi possível acessar os locais neste navegador."
    );
  }

  if (salvo === null) {
    return criarEstadoInicial();
  }

  let dados: unknown;

  try {
    dados = JSON.parse(salvo);
  } catch {
    throw new ArmazenamentoLocaisError(
      "Os dados de locais armazenados estão corrompidos."
    );
  }

  if (!ehArmazenamento(dados)) {
    throw new ArmazenamentoLocaisError(
      "Os dados de locais armazenados possuem formato inválido."
    );
  }

  return dados;
}

function salvarArmazenamento(dados: ArmazenamentoLocais): void {
  try {
    localStorage.setItem(CHAVE_LOCAIS, JSON.stringify(dados));
  } catch {
    throw new ArmazenamentoLocaisError(
      "Não foi possível salvar os locais neste navegador."
    );
  }
}

function prepararDados(dados: DadosLocal): DadosLocal {
  if (!possuiDadosValidos(dados)) {
    throw new Error(
      "Informe nome, categoria, endereço e descrição válidos. " +
      "Os recursos devem ser uma lista de textos não vazios."
    );
  }

  return {
    nome: dados.nome.trim(),
    categoria: dados.categoria.trim(),
    endereco: dados.endereco.trim(),
    descricao: dados.descricao.trim(),
    acessibilidades: dados.acessibilidades.map(
      (recurso) => recurso.trim()
    ),
  };
}

function validarId(id: number): void {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("O ID deve ser um número inteiro positivo.");
  }
}

export function listarLocais(): Local[] {
  return lerArmazenamento().locais;
}

export function buscarLocalPorId(id: number): Local | undefined {
  validarId(id);

  return listarLocais().find((local) => local.id === id);
}

export function cadastrarLocal(dados: DadosLocal): Local {
  const dadosPreparados = prepararDados(dados);
  const armazenamento = lerArmazenamento();

  if (armazenamento.proximoId >= Number.MAX_SAFE_INTEGER) {
    throw new Error("Não há mais IDs disponíveis para cadastro.");
  }

  const novoLocal: Local = {
    ...dadosPreparados,
    id: armazenamento.proximoId,
  };

  armazenamento.locais.push(novoLocal);
  armazenamento.proximoId += 1;

  salvarArmazenamento(armazenamento);

  return novoLocal;
}

export class LocalNaoEncontradoError extends Error {
  constructor(id: number) {
    super(`Local com ID ${id} não encontrado.`);
    this.name = "LocalNaoEncontradoError";
  }
}

export function atualizarLocal(
  id: number,
  dados: DadosLocal
): Local {
  validarId(id);

  const armazenamento = lerArmazenamento();
  const indice = armazenamento.locais.findIndex(
    (local) => local.id === id
  );

  if (indice === -1) {
    throw new LocalNaoEncontradoError(id);
  }

  const atualizado: Local = {
    ...prepararDados(dados),
    id,
  };

  armazenamento.locais[indice] = atualizado;

  salvarArmazenamento(armazenamento);

  return atualizado;
}

export function excluirLocal(id: number): Local {
  validarId(id);

  const armazenamento = lerArmazenamento();
  const local = armazenamento.locais.find(
    (item) => item.id === id
  );

  if (!local) {
    throw new LocalNaoEncontradoError(id);
  }

  armazenamento.locais = armazenamento.locais.filter(
    (item) => item.id !== id
  );

  salvarArmazenamento(armazenamento);

  return local;
}