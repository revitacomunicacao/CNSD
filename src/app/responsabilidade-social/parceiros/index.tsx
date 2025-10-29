import { useContent } from "@/hooks/useContent"
import { IParceiros } from "./types/IParceiros"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"

export default function Parceiros() {
  const { data: parceiros, loading, error } = useContent<IParceiros>("res-social/parceiros")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!parceiros?.length) return null

  return (
    <main>
      {parceiros.map(({ id, titulo, conteudo, logos }) => (
        <main key={id} className="flex justify-center items-center my-12 md:my-20">
          <section className="w-full max-w-[1200px] flex flex-col gap-10 md:gap-10 px-4">
            
            {/* Título */}
            <h1 className="text-primary text-[28px] md:text-[32px] font-bold text-center">
              {titulo}
            </h1>

            {/* Conteúdo (se houver) */}
            {conteudo && (
              <div className="content-html text-lg text-gray-700 leading-relaxed text-center" 
                   dangerouslySetInnerHTML={{ __html: conteudo }} 
              />
            )}

            {/* Carrossel de Logos */}
            {logos && logos.length > 0 && (
              <div className="px-12 mt-8">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                    slidesToScroll: 1,
                  }}
                  className="w-full max-w-full"
                >
                  <CarouselContent className="-ml-6">
                    {logos.map((logo, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-6 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                      >
                        <a
                          href={logo.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group"
                        >
                          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 flex items-center justify-center h-40">
                            <img
                              src={logo.imagem.url}
                              alt={logo.imagem.alt || logo.imagem.title}
                              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </a>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            )}

          </section>
        </main>
      ))}
    </main>
  )
}