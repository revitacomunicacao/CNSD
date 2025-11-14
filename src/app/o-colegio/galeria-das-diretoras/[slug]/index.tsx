import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { axiosClient } from "@/api/axiosClient"
import useSeo from "@/hooks/useSeo"

interface IDiretoraDetalhe {
  title: string
  slug: string
  periodo?: string
  descricao?: string
  foto?: string
}

export default function DetalheDiretora() {
  useSeo({
    title: "Diretora - CNSD",
    description: "Conheça a diretora do Colégio Nossa Senhora das Dores",
  })

  const { slug } = useParams()
  const [diretora, setDiretora] = useState<IDiretoraDetalhe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setDiretora(null)
      setLoading(false)
      setError("Diretora não encontrada.")
      return
    }

    const controller = new AbortController()

    const fetchDiretora = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data } = await axiosClient.get<IDiretoraDetalhe>(`direcao/${slug}`, {
          signal: controller.signal,
        })
        setDiretora(data)
      } catch (err: any) {
        if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") return
        const status = err?.response?.status
        if (status === 404) {
          setError("Diretora não encontrada.")
        } else {
          setError("Não foi possível carregar os dados.")
        }
        console.error("Erro ao carregar diretora:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDiretora()

    return () => controller.abort()
  }, [slug])

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">{error}</div>
  if (!diretora) return null

  return (
    <main>
      <main className="flex justify-center items-start my-12 md:my-20">
        <section className="w-full max-w-[1200px] flex flex-col gap-10 px-4">
          <div className="flex flex-col gap-3 items-center text-center">
            <Link to="/o-colegio/galeria-das-diretoras" className="self-start text-sm text-primary hover:underline">
              ← Voltar para a galeria
            </Link>

          </div>

          {diretora.foto && (
            <div className="w-full max-w-2xl mx-auto flex flex-row gap-10 justify-center items-center">
              <img
                src={diretora.foto}
                alt={diretora.title}
                className="w-80 h-auto rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-primary mt-2 leading-snug">{diretora.title}</h1>
                {diretora.periodo && (
                  <div className="flex">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-base font-semibold text-primary">
                      <span>Período</span>
                      <span className="text-primary/80">{diretora.periodo}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}



          {diretora.descricao && (
            <div
              className="content-html text-lg text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: diretora.descricao }}
            />
          )}
        </section>
      </main>
    </main>
  )
}
