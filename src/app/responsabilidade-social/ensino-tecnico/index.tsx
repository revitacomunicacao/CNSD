import { useContent } from "@/hooks/useContent"
import { IEnsinoTecnico } from "./types/IEnsinoTecnico"

export default function EnsinoTecnico() {
  const { data: ensinoTecnico, loading, error } = useContent<IEnsinoTecnico>("res-social/ensino-tecnico")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!ensinoTecnico?.length) return null

  // Função para extrair o ID do vídeo do YouTube
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  return (
    <main>
      {ensinoTecnico.map(({ id, titulo, conteudo, link_do_video }) => {
        const videoId = getYouTubeVideoId(link_do_video)
        
        return (
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

              {/* Vídeo do YouTube */}
              {videoId && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-primary text-center">
                    Conheça o Curso Técnico em Administração
                  </h2>
                  <div className="flex justify-center">
                    <div className="w-full max-w-4xl">
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title="Vídeo do Ensino Técnico"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </section>
          </main>
        )
      })}
    </main>
  )
}