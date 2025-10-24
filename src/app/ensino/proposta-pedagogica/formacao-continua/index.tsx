import { useContent } from "@/hooks/useContent"
import { IFormacaoContinua } from "./types/IFormacaoContinua"

export default function FormacaoContinua() {
  const { data: formacao, loading, error } = useContent<IFormacaoContinua>("ensino/proposta-pedagogica-formacao-continuada")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!formacao?.length) return null

  return (
    <main>
      {formacao.map(({ id, titulo, conteudo }) => (
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