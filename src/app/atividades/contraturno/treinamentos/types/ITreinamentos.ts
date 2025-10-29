interface IHorarioEAtividade {
  horario: string;
  atividade: string;
}

interface IDia {
  dia_da_semana: string;
  turma: string;
  horario_e_atividade: IHorarioEAtividade[];
}

export interface ITreinamentos {
  id: number;
  title: string;
  slug: string;
  titulo: string;
  conteudo: string;
  dias: IDia[];
}
