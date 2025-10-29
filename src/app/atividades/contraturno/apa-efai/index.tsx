import { useContent } from "@/hooks/useContent"
import { IApoioPedagogicoAoAluno } from "./types/IApoioPedagogicoAoAluno"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel"

export default function ApoioPedagogicoAoAluno() {
  const { data: apoio, loading, error } = useContent<IApoioPedagogicoAoAluno>("atividades/contraturno-apoio-pedagogico-ao-aluno")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!apoio?.length) return null

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
      {apoio.map(({ id, titulo, conteudo, galeria_de_foto }) => (
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

            {/* Galeria de Fotos */}
            {galeria_de_foto && galeria_de_foto.length > 0 && (
              <div className="flex flex-col gap-4">
                <CarrosselGaleria
                  fotos={galeria_de_foto}
                  title="Apoio Pedagógico ao Aluno"
                />
              </div>
            )}

          </section>
        </main>
      ))}
    </main>
  )
}
