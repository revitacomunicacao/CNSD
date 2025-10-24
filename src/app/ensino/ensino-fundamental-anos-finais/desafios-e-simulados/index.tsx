import { useContent } from "@/hooks/useContent"
import { IDesafiosESimulados } from "./types/IDesafiosESimulados"

export default function DesafiosESimulados() {
  const { data: desafios, loading, error } = useContent<IDesafiosESimulados>("ensino/ensino-fundamental-anos-finais-desafios-e-simulados")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!desafios?.length) return null

  return (
    <main>
      {desafios.map(({ id, titulo, conteudo }) => (
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
