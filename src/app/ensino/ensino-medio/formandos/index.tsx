import { useContent } from "@/hooks/useContent"
import { IFormandos } from "./types/IFormandos"
import useSeo from "@/hooks/useSeo"

export default function Formandos() {
  useSeo({
    title: "Formandos - Ensino Médio - CNSD",
    description: "Conheça os formandos do Ensino Médio do Colégio Nossa Senhora das Dores",
  })
  const { data: formandos, loading, error } = useContent<IFormandos>("ensino/ensino-medio-formandos")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!formandos?.length) return null

  return (
    <main>
      {formandos.map(({ id, titulo, terceiro_ano_a, terceiro_ano_b }) => (
        <main key={id} className="flex justify-center items-center my-12 md:my-20">
          <section className="w-full max-w-[1200px] flex flex-col gap-10 md:gap-10 px-4">
            {/* Título */}
            <h1 className="text-primary text-[28px] md:text-[32px] font-bold text-center">
              {titulo}
            </h1>

            {/* Terceiro Ano A */}
            {terceiro_ano_a && terceiro_ano_a.length > 0 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-primary text-center">
                  3º Ano A
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {terceiro_ano_a.map((formando, index) => (
                    <div key={index} className="flex flex-col items-center gap-3">
                      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group">
                        <img
                          src={formando.foto}
                          alt={`Foto de ${formando.nome}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-800 text-center leading-tight">
                        {formando.nome}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Terceiro Ano B */}
            {terceiro_ano_b && terceiro_ano_b.length > 0 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-primary text-center">
                  3º Ano B
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {terceiro_ano_b.map((formando, index) => (
                    <div key={index} className="flex flex-col items-center gap-3">
                      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group">
                        <img
                          src={formando.foto}
                          alt={`Foto de ${formando.nome}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-800 text-center leading-tight">
                        {formando.nome}
                      </h3>
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
