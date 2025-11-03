import { useParams } from "react-router-dom"
import { useContentId } from "@/hooks/useContentId"
import { INoticiaDetalhe } from "../types/INoticiaDetalhes"

export default function DetalhesPost() {
  const { slug } = useParams()
  const { data: conteudo, loading, error } = useContentId<INoticiaDetalhe[]>("blog/post", String(slug))

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!conteudo || !Array.isArray(conteudo) || conteudo.length === 0) return null

  return (
    <main>
      {conteudo.map((item) => (
        <main key={item.id} className="flex justify-center items-center my-12 md:my-20">
          <section className="w-full max-w-[1200px] flex flex-col gap-10 px-4">
            <h1>{item.title || 'Notícia'}</h1>
            {item.content && (
              <div 
                className="content-html text-lg text-gray-700 leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: item.content }} 
              />
            )}
          </section>
        </main>
      ))}
    </main>
  )
}