interface IFoto {
  id: number;
  url: string;
  alt: string;
  title: string;
}

interface IVideo {
  titulo: string;
  link: string;
}

export interface IEscolaDeEsportes {
  id: number;
  title: string;
  slug: string;
  titulo: string;
  conteudo: string;
  galeria_de_foto_1: IFoto[];
  texto_modalidade: string;
  galeria_de_foto_2: IFoto[];
  matricula: string;
  galeria_de_video: IVideo[];
}