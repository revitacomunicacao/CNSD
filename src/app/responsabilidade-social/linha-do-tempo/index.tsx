import { useContent } from "@/hooks/useContent"
import { ILinhaDoTempo } from "./types/ILinhaDoTempo"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import useSeo from "@/hooks/useSeo"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel"

export default function LinhaDoTempo() {
  useSeo({
    title: "Linha do Tempo - CNSD",
    description: "Conheça a linha do tempo das ações de responsabilidade social do Colégio Nossa Senhora das Dores",
  })

  const { data: linhaDoTempo, loading, error } = useContent<ILinhaDoTempo>("res-social/linha-do-tempo")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!linhaDoTempo?.length) return null

  const CarrosselGaleria = ({ fotos, title }: { fotos: any[], title: string }) => (
    <div className="px-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        className="w-full max-w-full"
      >
        <CarouselContent className="-ml-4">
          {fotos.map((foto, index) => (
            <CarouselItem 
              key={foto.id} 
              className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-[calc(100%/7)]"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer group relative overflow-hidden rounded-lg">
                    <img
                      src={foto.url}
                      alt={foto.alt || `${title} - Foto ${index + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <svg 
                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
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
                      src={foto.url}
                      alt={foto.alt || `${title} - Foto ${index + 1}`}
                      className="max-w-full max-h-[85vh] object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  )

  return (
    <main>
      {linhaDoTempo.map(({ id, titulo, conteudo, linha_do_tempo, galeria_de_foto }) => (
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

            {/* Linha do Tempo */}
            {linha_do_tempo && linha_do_tempo.length > 0 && (
              <div className="flex flex-col gap-6 mt-8">
                <h2 className="text-2xl font-bold text-primary text-center mb-6">
                  Nossa História
                </h2>
                
                <div className="relative">
                  {/* Linha vertical central */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block" />
                  
                  {/* Items da linha do tempo */}
                  <div className="space-y-8">
                    {linha_do_tempo.map((item, index) => (
                      <div key={index} className={`relative flex flex-col md:flex-row gap-6 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        
                        {/* Conteúdo do card */}
                        <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                            <div className="content-html text-gray-700" 
                                 dangerouslySetInnerHTML={{ __html: item.conteudo }} 
                            />
                          </div>
                        </div>

                        {/* Marcador central com ano */}
                        <div className="relative flex-shrink-0 z-10">
                          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg text-center leading-tight px-2">
                              {item.ano}
                            </span>
                          </div>
                        </div>

                        {/* Espaço vazio do outro lado */}
                        <div className="hidden md:block w-[calc(50%-2rem)]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Galeria de Fotos */}
            {galeria_de_foto && galeria_de_foto.length > 0 && (
              <div className="flex flex-col gap-4 mt-8">
                <CarrosselGaleria
                  fotos={galeria_de_foto}
                  title="Linha do Tempo"
                />
              </div>
            )}

          </section>
        </main>
      ))}
    </main>
  )
}