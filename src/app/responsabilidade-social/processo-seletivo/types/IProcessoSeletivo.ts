interface IArquivo {
  id: number;
  url: string;
  filename: string;
  mime: string;
  filesize: number;
}

interface IDocumento {
  titulo: string;
  arquivo: IArquivo;
}

export interface IProcessoSeletivo {
  id: number;
  title: string;
  slug: string;
  titulo: string;
  conteudo: string;
  documentos: IDocumento[];
}

