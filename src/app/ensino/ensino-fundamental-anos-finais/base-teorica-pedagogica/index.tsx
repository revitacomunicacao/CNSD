import { useContent } from "@/hooks/useContent"
import { IBaseTeorica } from "./types/IBaseTeorica"
import useSeo from "@/hooks/useSeo"

export default function BaseTeoricaAnosFinais() {
  useSeo({
    title: "Base Teórica-Pedagógica - Ensino Fundamental Anos Finais - CNSD",
    description: "Conheça a base teórica-pedagógica do Ensino Fundamental Anos Finais do Colégio Nossa Senhora das Dores",
  })
  const { data: baseTeorica, loading, error } = useContent<IBaseTeorica>("ensino/ensino-fundamental-anos-finais-base-teorica-pedagogica")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!baseTeorica?.length) return null

  return (
    <main>
      {baseTeorica.map(({ id, titulo, conteudo }) => (
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
          </section>
        </main>
      ))}
    </main>
  )
}
