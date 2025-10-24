export interface IFormando {
  nome: string;
  foto: string;
}

export interface IFormandos {
  id: number;
  title: string;
  slug: string;
  titulo: string;
  terceiro_ano_a: IFormando[];
  terceiro_ano_b: IFormando[];
}
