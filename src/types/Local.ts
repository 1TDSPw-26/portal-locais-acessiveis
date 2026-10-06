
export type Local = {
  id: number;
  nome: string;
  descricao: string;
  endereco: string;
  acessibilidades: string[]
};
export type NovoLocal = Omit<Local, 'id'>;