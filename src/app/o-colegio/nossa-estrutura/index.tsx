import { useContent } from "@/hooks/useContent"
import { IEstruturaFisica } from "./types/INossaEstrutura"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import useSeo from "@/hooks/useSeo"

export default function NossaEstrutura() {
  useSeo({
    title: "Nossa Estrutura - CNSD",
    description: "Conheça a estrutura física do Colégio Nossa Senhora das Dores",
  })

  const { data: estrutura, loading, error } = useContent<IEstruturaFisica>("o-colegio/estrutura-fisica")
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!estrutura?.length) return null

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  return (
    <main>
      {estrutura.map(({ id, titulo, descricao, galeria_de_foto }) => (
        <main key={id} className="flex justify-center items-center my-12 md:my-20">
          <section className="w-full max-w-[1200px] flex flex-col gap-10 md:gap-10 px-4">
            {/* Título e Descrição */}
            <div className="flex flex-col gap-4">
              <h1 className="text-primary text-[28px] md:text-[32px] font-bold">
                {titulo}
              </h1>
              {descricao && (
                <div 
                  className="content-html text-lg text-gray-700" 
                  dangerouslySetInnerHTML={{ __html: descricao }} 
                />
              )}
            </div>

            {/* Sistema de Accordion (Sanfona) */}
            {galeria_de_foto && galeria_de_foto.length > 0 && (
              <div className="flex flex-col gap-4">
                {galeria_de_foto.map((galeria, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    {/* Cabeçalho do Accordion */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 text-left">
                        {(galeria.titulo).toUpperCase()}
                      </h3>
                      <svg
                        className={`w-6 h-6 text-primary transition-transform duration-200 ${
                          openAccordion === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Conteúdo do Accordion */}
                    <div
                      className={`transition-all duration-300 ${
                        openAccordion === index 
                          ? 'max-h-[10000px] opacity-100' 
                          : 'max-h-0 opacity-0 overflow-hidden'
                      }`}
                    >
                      <div className="p-6 bg-white">
                        {/* Grid de Fotos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {galeria.fotos && galeria.fotos.map((fotoUrl, fotoIndex) => (
                            <Dialog key={fotoIndex}>
                              <DialogTrigger asChild>
                                <div className="cursor-pointer group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                                  <img
                                    src={fotoUrl}
                                    alt={`${galeria.titulo} - Foto ${fotoIndex + 1}`}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                    <svg 
                                      className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                                      fill="none" 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24"
                                    >
                                      <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="max-w-[90vw] max-h-[90vh] p-2">
                                <div className="flex items-center justify-center">
                                  <img
                                    src={fotoUrl}
                                    alt={`${galeria.titulo} - Foto ${fotoIndex + 1}`}
                                    className="max-w-full max-h-[85vh] object-contain"
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                        </div>

                        {/* Mensagem caso não tenha fotos */}
                        {(!galeria.fotos || galeria.fotos.length === 0) && (
                          <div className="text-center py-10 text-gray-500">
                            Nenhuma foto disponível nesta seção.
                          </div>
                        )}
                      </div>
                    </div>
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