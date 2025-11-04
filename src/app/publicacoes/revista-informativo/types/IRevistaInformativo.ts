export interface IRevista {
  titulo: string;
  foto: string;
  arquivo: string;
}

export interface IRevistaInformativo {
  id: number;
  title: string;
  slug: string;
  titulo: string;
  conteudo: string;
  revistas: IRevista[];
}

