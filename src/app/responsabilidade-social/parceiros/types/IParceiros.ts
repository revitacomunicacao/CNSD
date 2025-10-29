interface IImagem {
  id: number;
  url: string;
  alt: string;
  title: string;
}

interface ILogo {
  imagem: IImagem;
  link: string;
}

export interface IParceiros {
  id: number;
  title: string;
  slug: string;
  titulo: string;
  conteudo: string;
  logos: ILogo[];
}

