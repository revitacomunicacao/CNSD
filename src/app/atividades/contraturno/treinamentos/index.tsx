import { useContent } from "@/hooks/useContent"
import { ITreinamentos } from "./types/ITreinamentos"
import useSeo from "@/hooks/useSeo"

export default function Treinamentos() {
  useSeo({
    title: "Treinamentos - CNSD",
    description: "Conheça os treinamentos oferecidos pelo Colégio Nossa Senhora das Dores",
  })
  const { data: treinamentos, loading, error } = useContent<ITreinamentos>("atividades/contraturno-treinamentos")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!treinamentos?.length) return null

  return (
    <main className="flex justify-center items-center my-12 md:my-20">
      <section className="w-full max-w-[1200px] flex flex-col gap-10 px-4">

        {/* Título principal */}
        {treinamentos[0]?.titulo && (
          <h1 className="text-primary text-[28px] md:text-[32px] font-bold text-center">
            {treinamentos[0].titulo}
          </h1>
        )}

        {/* Conteúdo */}
        {treinamentos[0]?.conteudo && (
          <div
            className="content-html text-lg text-gray-700 leading-relaxed mx-auto"
            dangerouslySetInnerHTML={{ __html: treinamentos[0].conteudo }}
          />
        )}

        {/* Cards de dias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {treinamentos[0]?.dias?.map((dia, index) => (
            <div
              key={index}
              className="bg-[#37383a] text-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Cabeçalho */}
              <div className="py-4 text-center">
                <h3 className="text-[20px] font-bold text-[#00AEEF]">{dia.dia_da_semana}</h3>
                <p className="text-sm text-gray-300 mt-1">{dia.turma}</p>
              </div>

              {/* Lista */}
              <div className="p-6 space-y-2">
                {dia.horario_e_atividade.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-center pb-2 text-gray-200 text-sm"
                  >
                    <span>{`${item.horario}ﾠ`}</span> -  
                    <span className="font-medium">{`ﾠ${item.atividade}`}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
