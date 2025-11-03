import { useContent } from "@/hooks/useContent"
import { INoticias } from "./types/INoticias"
import { Link } from "react-router-dom"

export default function Noticias() {
  const { data: noticia, loading, error, refetch } = useContent<INoticias>('blog')
  
  if(loading) return "carregando"
    
  console.log(noticia)
  return(
    <section className="flex flex-col gap-10">
      {noticia.map(({ categories,content,excerpt,id,slug,title }) => (
        <div className="w-[1200px]">
          <Link to={`/publicacoes/noticias/${slug}`}>
            <h1 className="text-2xl">{title}</h1>
          </Link>
          <p className="text-black" dangerouslySetInnerHTML={{ __html: excerpt }} /> 
        </div>
      ))}
    </section>
  )
}