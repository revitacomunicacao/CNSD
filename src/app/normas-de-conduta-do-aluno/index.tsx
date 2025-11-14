import { useContent } from "@/hooks/useContent"
import useSeo from "@/hooks/useSeo"

interface INormasDeConduta {
  id: number
  title?: string
  titulo?: string
  description?: string
  conteudo?: string
  conteudoPrincipal?: string
}

const obterTitulo = (item: INormasDeConduta) => item.titulo || item.title || "Normas de conduta do aluno"
const obterConteudo = (item: INormasDeConduta) => item.description || item.conteudo || item.conteudoPrincipal || ""

export default function NormasDeCondutaDoAluno() {
  useSeo({
    title: "Normas de Conduta do Aluno - CNSD",
    description: "Conheça as normas de conduta do Colégio Nossa Senhora das Dores",
  })

  const { data, loading, error } = useContent<INormasDeConduta>("normas-de-conduta/normas-de-conduta-do-aluno")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!data?.length) return null

  return (
    <main>
      {data.map((norma) => {
        const titulo = obterTitulo(norma)
        const conteudo = obterConteudo(norma)

        return (
          <main key={norma.id} className="flex justify-center items-start my-12 md:my-20">
            <section className="w-full max-w-[1200px] flex flex-col gap-10 px-4">
              <h1>{titulo}</h1>

              {conteudo && (
                <div
                  className="content-html text-lg text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: conteudo }}
                />
              )}
            </section>
          </main>
        )
      })}
    </main>
  )
}