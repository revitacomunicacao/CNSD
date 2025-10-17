export interface INossaMissao {
  id: number;
  title: string;
  slug: string;
  titulo_da_pagina: string;
  blocos_de_nossa_missao_e_valores: {
    titulo: string;
    descricao: string;
  }[]
}