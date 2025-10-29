import { useContent } from "@/hooks/useContent"
import { ITreinamentos } from "./types/ITreinamentos"

export default function Treinamentos() {
  const { data: treinamentos, loading, error } = useContent<ITreinamentos>("atividades/contraturno-treinamentos")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!treinamentos?.length) return null

  return (
    <main>
      {treinamentos.map(({ id, titulo, conteudo, dias }) => (
        <main key={id} className="flex justify-center items-center my-12 md:my-20">
          <section className="w-full max-w-[1200px] flex flex-col gap-10 md:gap-10 px-4">
            
            {/* Título */}
            <h1 className="text-primary text-[28px] md:text-[32px] font-bold">
              {titulo}
            </h1>

            {/* Conteúdo */}
            <div className="content-html text-lg text-gray-700 leading-relaxed" 
                 dangerouslySetInnerHTML={{ __html: conteudo }} 
            />

            {/* Dias de Treinamento */}
            {dias && dias.length > 0 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-primary">
                  Horários dos Treinamentos
                </h2>
                
                {/* Grid de 2 colunas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {dias.map((dia, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      
                      {/* Cabeçalho do Card */}
                      <div className="mb-4 pb-4 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-primary mb-2">
                          {dia.dia_da_semana}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {dia.turma}
                        </p>
                      </div>

                      {/* Lista de Horários e Atividades */}
                      <div className="space-y-3">
                        {dia.horario_e_atividade.map((item, itemIndex) => (
                          <div key={itemIndex} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200">
                            <span className="text-sm">
                              <span className="font-semibold text-primary">{item.horario}</span>
                              <span className="text-gray-500 mx-2">-</span>
                              <span className="text-gray-700">{item.atividade}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </section>
        </main>
      ))}
    </main>
  )
}