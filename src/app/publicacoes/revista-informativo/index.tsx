import { useContent } from "@/hooks/useContent"
import { IRevistaInformativo } from "./types/IRevistaInformativo"
import useSeo from "@/hooks/useSeo"

export default function RevistaInformativo() {
  useSeo({
    title: "Revista/Informativo - CNSD",
    description: "Acesse as revistas e informativos do Colégio Nossa Senhora das Dores",
  })
  const { data: revista, loading, error } = useContent<IRevistaInformativo>("publicacoes/revista-inforcativo")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!revista?.length) return null

  return (
    <main>
      {revista.map(({ id, titulo, conteudo, revistas }) => (
        <main key={id} className="flex justify-center items-start my-12 md:my-20">
          <section className="w-full max-w-[1200px] flex flex-col gap-10 px-4">
            {/* Título */}
            <h1>{titulo}</h1>

            {/* Conteúdo */}
            {conteudo && (
              <div 
                className="content-html text-lg text-gray-700 leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: conteudo }} 
              />
            )}

            {/* Grid de Revistas */}
            {revistas && revistas.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {revistas.map((revista, index) => (
                  <a
                    key={index}
                    href={revista.arquivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Capa da Revista */}
                    <div className="w-full overflow-hidden bg-gray-100 flex justify-center">
                      <img
                        src={revista.foto}
                        alt={revista.titulo}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Título */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#0B2A4A] group-hover:text-primary transition-colors line-clamp-2 text-center">
                        {revista.titulo}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </section>
        </main>
      ))}
    </main>
  )
}
