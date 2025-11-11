export interface IPrograma {
  id: number;
  title: string;
  slug: string;
  description: string;
  link: string;
}

export interface IPagination {
  page: number
  per_page: number
  total: number
  total_pages: number
  has_prev: boolean
  has_next: boolean
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
  pagination?: IPagination;
}

