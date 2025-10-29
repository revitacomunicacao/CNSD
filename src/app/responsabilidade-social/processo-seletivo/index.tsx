import { useContent } from "@/hooks/useContent"
import { IProcessoSeletivo } from "./types/IProcessoSeletivo"

export default function ProcessoSeletivo() {
  const { data: processoSeletivo, loading, error } = useContent<IProcessoSeletivo>("res-social/processo-seletivo")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!processoSeletivo?.length) return null

  return (
    <main>
      {processoSeletivo.map(({ id, titulo, conteudo, documentos }) => (
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

            {/* Documentos */}
            {documentos && documentos.length > 0 && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documentos.map((documento, index) => (
                    <a
                      key={index}
                      href={documento.arquivo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-white font-semibold text-center"
                      style={{ backgroundColor: '#e6be1e' }}
                    >
                      <span className="flex items-center gap-3">
                        {/* Ícone de PDF */}
                        <svg 
                          className="w-6 h-6" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        {documento.titulo}
                      </span>
                    </a>
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