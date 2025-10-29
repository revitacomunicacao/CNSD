export interface ITabelaOlimpiada {
  data: string
  horario: string
  modalidade: string
  categoria: string
  sexo: string
  equipe_a: string
  equipe_b: string
  jogo: string
}

export interface IResultadosEFotos {
  data: string
  local: string
  modalidade: string
  tabela: ITabelaOlimpiada[]
}

export interface IOlimpiadas {
  id: number
  title: string
  slug: string
  titulo: string
  conteudo: string
  resultados_e_fotos: IResultadosEFotos[]
}