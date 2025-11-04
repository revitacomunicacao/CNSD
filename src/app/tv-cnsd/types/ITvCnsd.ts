export interface IPrograma {
  id: number;
  title: string;
  slug: string;
  description: string;
  link: string;
}

export interface ITvCnsd {
  page: {
    id: number;
    title: string;
    slug: string;
    titulo: string;
    conteudo: string;
  };
  programas: IPrograma[];
}

