// Tipos auxiliares
export type HTMLString = string;
export type ImageURL = string;

// Banners do topo
export interface BannerItem {
  nome: string;
  foto: ImageURL;
  link: string;
}

// Cartões de "Ensino"
export interface EnsinoItem {
  nome: string;
  imagem: ImageURL;
  link: string;
}

// Blocos de "Diferenciais"
export interface DiferencialItem {
  nome: string;
  foto: ImageURL;
  link: string;
}

// Lista de depoimentos
export interface DepoimentoItem {
  nome: string;
  foto: ImageURL;
  periodo_estudo: string;
  ocupacao: string;
  depoimento: string;
}

// Itens de "Fique Ligado"
export interface FiqueLigadoItem {
  nome: string;
  link: string;
}

// Página "Home"
export interface IHome {
  id: number;
  title: string;

  // seção hero/banners
  banners: BannerItem[];

  // bloco introdutório/explicativo (permite HTML)
  ensino_cnsd: HTMLString;

  // coleções
  ensino: EnsinoItem[];
  diferenciais: DiferencialItem[];
  depoimentos: DepoimentoItem[];
  fique_ligado: FiqueLigadoItem[];
}
