import { useContent } from "@/hooks/useContent"
import { IAdministracao } from "./types/IAdministracao"
import useSeo from "@/hooks/useSeo"

export default function Administracao() {
  useSeo({
    title: "Administração - Ensino Técnico - CNSD",
    description: "Conheça o curso técnico em Administração do Colégio Nossa Senhora das Dores",
  })
  const { data: administracao, loading, error } = useContent<IAdministracao>("ensino/ensino-tecnico-administracao")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!administracao?.length) return null

  return (
    <main>
      {administracao.map(({ id, titulo, conteudo }) => (
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
