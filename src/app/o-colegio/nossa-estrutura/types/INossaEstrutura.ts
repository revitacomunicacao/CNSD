export interface IEstruturaFisica {
  id: number;
  titulo: string;
  descricao: string;
  galeria_de_foto: {
    titulo: string;
    fotos: string[]
  }[]
}