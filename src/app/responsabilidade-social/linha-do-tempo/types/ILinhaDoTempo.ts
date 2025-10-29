interface IFoto {
  id: number;
  url: string;
  alt: string;
  title: string;
}

interface IItemLinhaDoTempo {
  ano: string;
  conteudo: string;
}

export interface ILinhaDoTempo {
  id: number;
  title: string;
  slug: string;
  titulo: string;
  conteudo: string;
  linha_do_tempo: IItemLinhaDoTempo[];
  galeria_de_foto: IFoto[];
}
