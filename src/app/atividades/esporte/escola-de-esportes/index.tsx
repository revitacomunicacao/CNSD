import { useContent } from "@/hooks/useContent"
import { IEscolaDeEsportes } from "./types/IEscolaDeEsportes"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import useSeo from "@/hooks/useSeo"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel"

export default function EscolaDeEsportes() {
  useSeo({
    title: "Escola de Esportes - CNSD",
    description: "Conheça a escola de esportes do Colégio Nossa Senhora das Dores",
  })

  const { data: escola, loading, error } = useContent<IEscolaDeEsportes>("atividades/esportes-escola-de-esportes")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!escola?.length) return null

  // Função para extrair o ID do vídeo do YouTube
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

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
      {escola.map(({ 
        id, 
        titulo, 
        conteudo, 
        galeria_de_foto_1, 
        texto_modalidade, 
        galeria_de_foto_2, 
        matricula, 
        galeria_de_video 
      }) => (
        <main key={id} className="flex justify-center items-center my-12 md:my-20">
          <section className="w-full max-w-[1200px] flex flex-col gap-10 md:gap-10 px-4">
            
            {/* 1. Título */}
            <h1 className="text-primary text-[28px] md:text-[32px] font-bold">
              {titulo}
            </h1>

            {/* 2. Conteúdo */}
            <div className="content-html text-lg text-gray-700 leading-relaxed" 
                 dangerouslySetInnerHTML={{ __html: conteudo }} 
            />

            {/* 3. Galeria 1 (Estrutura) */}
            {galeria_de_foto_1 && galeria_de_foto_1.length > 0 && (
              <div className="flex flex-col gap-4">
                <CarrosselGaleria
                  fotos={galeria_de_foto_1}
                  title="Estrutura"
                />
              </div>
            )}

            {/* 4. Texto Modalidade */}
            {texto_modalidade && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-primary">
                  Modalidades
                </h2>
                <div className="content-html text-lg text-gray-700 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: texto_modalidade }} 
                />
              </div>
            )}

            {/* 5. Galeria 2 (Modalidades) */}
            {galeria_de_foto_2 && galeria_de_foto_2.length > 0 && (
              <div className="flex flex-col gap-4">

                <CarrosselGaleria
                  fotos={galeria_de_foto_2}
                  title="Modalidades"
                />
              </div>
            )}

            {/* 6. Matrícula */}
            {matricula && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-primary">
                  Matrícula
                </h2>
                <div className="content-html text-lg text-gray-700 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: matricula }} 
                />
              </div>
            )}

            {/* 7. Galeria de Vídeo (Grid 2 colunas) */}
            {galeria_de_video && galeria_de_video.length > 0 && (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-primary text-center">
                  Vídeos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {galeria_de_video.map((video, index) => {
                    const videoId = getYouTubeVideoId(video.link)
                    
                    return videoId ? (
                      <div key={index} className="flex flex-col gap-3">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={video.titulo}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            )}

          </section>
        </main>
      ))}
    </main>
  )
}