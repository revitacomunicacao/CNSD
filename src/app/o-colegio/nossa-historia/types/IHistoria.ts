// Tipos auxiliares
type HTMLString = string;
type ImageURL = string;

// Blocos da coluna da direita
export interface ColunaDireitaItem {
  foto: ImageURL;
  nome: string;
  descricao: HTMLString;
}

// Lista de irmãs (gestões anteriores)
export interface IrmaItem {
  foto: ImageURL;
  nome: string;
  periodo: string; // ex: "1885 – 1909"
}

// Início da gestão leiga
export interface GestaoLeigaItem {
  foto: ImageURL;
  nome: string;
  periodo: string; // ex: "2007"
}

// Página "Nossa História"
export interface IHistoria {
  id: number;
  title: string;
  slug: string;
  titulo: string;

  foto_da_pagina: ImageURL;
  legenda_da_foto: string;

  // blocos de conteúdo (HTML)
  texto_1: HTMLString;
  texto_2: HTMLString;
  texto_3: HTMLString;

  // coleções
  coluna_da_direita: ColunaDireitaItem[];
  irmas: IrmaItem[];
  inicio_da_gestao_leiga: GestaoLeigaItem[];
}
