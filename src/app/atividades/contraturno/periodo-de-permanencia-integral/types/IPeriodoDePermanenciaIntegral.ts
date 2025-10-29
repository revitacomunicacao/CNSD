interface IFoto {
  id: number;
  url: string;
  alt: string;
  title: string;
}

export interface IPeriodoDePermanenciaIntegral {
  id: number;
  title: string;
  slug: string;
  titulo: string;
  conteudo: string;
  galeria_de_foto: IFoto[];
  link_video: string;
}
