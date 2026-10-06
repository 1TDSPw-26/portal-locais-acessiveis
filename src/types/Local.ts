
export type Local = {
  id: number;
  nome: string;
  descricao: string;
  endereco: string;
  accessibilidades: string[]
};
export type NovoLocal = Omit<Local, 'id'>;