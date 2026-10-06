
export type Local = {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  endereco: string;
  acessibilidades: string[]
};
export type NovoLocal = Omit<Local, 'id'>;