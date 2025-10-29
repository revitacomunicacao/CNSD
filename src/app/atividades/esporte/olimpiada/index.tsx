import { useContent } from "@/hooks/useContent"
import useSeo from "@/hooks/useSeo"
import { IOlimpiadas } from "./types/index"

export default function Olimpiadas() {
  useSeo({
    title: "Esportes – Olimpíadas",
    description: "História da Olimpíada Dominicana do Colégio Nossa Senhora das Dores",
  })

  const { data: olimpiadas, loading, error } = useContent<IOlimpiadas>("atividades/esportes-olimpiadas")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!olimpiadas?.length) return null

  return (
    <main>
      {olimpiadas.map(({ id, titulo, conteudo, resultados_e_fotos }) => (
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

            {/* Resultados e Fotos */}
            {resultados_e_fotos && resultados_e_fotos.length > 0 && (
              <div className="flex flex-col gap-8">
                {resultados_e_fotos.map((resultado, index) => (
                  <div key={index} className="flex flex-col gap-6">
                    {/* Cabeçalho do Resultado */}
                    <div className="bg-primary/10 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-1">Data</p>
                          <p className="text-lg font-bold text-primary">{resultado.data}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-1">Local</p>
                          <p className="text-lg font-bold text-primary">{resultado.local}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-1">Modalidade</p>
                          <p className="text-lg font-bold text-primary">{resultado.modalidade}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tabela de Jogos */}
                    {resultado.tabela && resultado.tabela.length > 0 && (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
                          <thead>
                            <tr className="bg-primary text-white">
                              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">Data</th>
                              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">Horário</th>
                              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">Modalidade</th>
                              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">Categoria</th>
                              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">Sexo</th>
                              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">Equipe A</th>
                              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">Equipe B</th>
                              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold">Jogo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultado.tabela.map((jogo, jogoIndex) => (
                              <tr 
                                key={jogoIndex} 
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="border border-gray-300 px-4 py-3 text-sm">{jogo.data}</td>
                                <td className="border border-gray-300 px-4 py-3 text-sm font-medium">{jogo.horario}</td>
                                <td className="border border-gray-300 px-4 py-3 text-sm">{jogo.modalidade}</td>
                                <td className="border border-gray-300 px-4 py-3 text-sm">{jogo.categoria}</td>
                                <td className="border border-gray-300 px-4 py-3 text-sm">{jogo.sexo}</td>
                                <td className="border border-gray-300 px-4 py-3 text-sm font-semibold">{jogo.equipe_a}</td>
                                <td className="border border-gray-300 px-4 py-3 text-sm font-semibold">{jogo.equipe_b}</td>
                                <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-primary">{jogo.jogo}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </section>
        </main>
      ))}
    </main>
  )
}