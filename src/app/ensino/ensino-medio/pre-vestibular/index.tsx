import { useContent } from "@/hooks/useContent"
import { IPreVestibular } from "./types/IPreVestibular"
import useSeo from "@/hooks/useSeo"

export default function PreVestibular() {
  useSeo({
    title: "Pré-Vestibular - Ensino Médio - CNSD",
    description: "Conheça o pré-vestibular do Ensino Médio do Colégio Nossa Senhora das Dores",
  })
  const { data: preVestibular, loading, error } = useContent<IPreVestibular>("ensino/ensino-medio-pre-vestibular")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!preVestibular?.length) return null

  // Função para extrair o ID do vídeo do YouTube
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  return (
    <main>
      {preVestibular.map(({ id, titulo, conteudo, link }) => {
        const videoId = getYouTubeVideoId(link)
        
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

              {/* Vídeo do YouTube incorporado */}
              {videoId && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-primary mb-4 text-center">
                    Assista ao vídeo
                  </h2>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="Vídeo do Pré-Vestibular"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
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
