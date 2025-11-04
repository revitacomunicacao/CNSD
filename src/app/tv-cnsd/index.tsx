import { useContent } from "@/hooks/useContent"
import { ITvCnsd } from "./types/ITvCnsd"

// Função para extrair o ID do vídeo do YouTube
const getYouTubeVideoId = (url: string) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

export default function TvCNSD() {
  const { data: tvCnsd, loading, error } = useContent<ITvCnsd>("publicacoes/tv-cnsd")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!tvCnsd?.length) return null

  return (
    <main>
      {tvCnsd.map(({ page, programas }) => {
        // O último programa (primeiro do array) vai ser o destaque
        const ultimoPrograma = programas && programas.length > 0 ? programas[0] : null
        const outrosProgramas = programas && programas.length > 1 ? programas.slice(1) : []

        return (
          <main key={page.id} className="flex justify-center items-start my-12 md:my-20">
            <section className="w-full max-w-[1200px] flex flex-col gap-10 px-4">
              {/* Título */}
              <h1>{page.titulo || page.title}</h1>

              {/* Conteúdo */}
              {page.conteudo && (
                <div
                  className="content-html text-lg text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: page.conteudo }}
                />
              )}

              {/* Destaque do último programa */}
              {ultimoPrograma && (
                <div className="flex flex-col gap-8 items-center">
                  <div className="w-full md:w-2/3 lg:w-1/2 max-w-2xl">
                    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                      {/* Título */}
                      <div className="p-4 flex flex-col gap-2">
                        <h3 className="text-sm font-semibold text-[#0B2A4A]">
                          {ultimoPrograma.title}
                        </h3>
                      </div>
                      
                      {/* Vídeo */}
                      {getYouTubeVideoId(ultimoPrograma.link) && (
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(ultimoPrograma.link)}`}
                            title={ultimoPrograma.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {ultimoPrograma.description && (
                    <div
                      className="content-html text-base text-gray-700 leading-relaxed max-w-2xl"
                      dangerouslySetInnerHTML={{ __html: ultimoPrograma.description }}
                    />
                  )}
                </div>
              )}

              {/* Grade de outros programas */}
              {outrosProgramas.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {outrosProgramas.map((programa) => {
                    const videoId = getYouTubeVideoId(programa.link)
                    
                    return (
                      <div key={programa.id} className="flex flex-col gap-4 bg-white rounded-lg overflow-hidden">
                        {/* Vídeo */}
                        {videoId && (
                          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                              className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={programa.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}

                        {/* Título */}
                        <div className="p-4 flex flex-col gap-2">
                          <h3 className="text-sm font-semibold text-[#0B2A4A]">
                            {programa.title}
                          </h3>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          </main>
        )
      })}
    </main>
  )
}
