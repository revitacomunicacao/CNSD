import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { axiosClient } from "@/api/axiosClient"
import useSeo from "@/hooks/useSeo"

interface IDiretoraResumo {
  title: string
  slug: string
  periodo?: string
  descricao?: string
  foto?: string
}

export default function GaleriaDasDiretoras() {
  useSeo({
    title: "Galeria das Diretoras - CNSD",
    description: "Conheça as diretoras que fizeram parte da história do Colégio Nossa Senhora das Dores",
  })

  const [diretoras, setDiretoras] = useState<IDiretoraResumo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchDiretoras = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data } = await axiosClient.get<IDiretoraResumo[]>("direcao", {
          signal: controller.signal,
        })
        setDiretoras(Array.isArray(data) ? data : [])
      } catch (err: any) {
        if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") return
        setError("Não foi possível carregar a galeria.")
        console.error("Erro ao carregar diretoras:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDiretoras()

    return () => controller.abort()
  }, [])

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">{error}</div>
  if (!diretoras.length) return <div className="py-20 text-center text-gray-500">Nenhum registro encontrado.</div>

  return (
    <main>
      <main className="flex justify-center items-start my-12 md:my-20">
        <section className="w-full max-w-[1200px] flex flex-col gap-12 px-4">
          <header className="space-y-4 text-center md:text-left">
            <h1>Galeria das Diretoras</h1>
            <p className="text-gray-700 text-lg">
              Conheça a trajetória das diretoras do Colégio Nossa Senhora das Dores e os períodos em que atuaram.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diretoras.map(({ slug, title, periodo, descricao, foto }) => (
              <Link
                key={slug}
                to={`/galeria-das-diretoras/${slug}`}
                className="flex flex-col bg-white rounded-lg overflow-hidden shadow transition-shadow hover:shadow-lg"
              >
                {foto && (
                  <div className="w-full flex justify-center items-center aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={foto}
                      alt={title}
                      className="w-40 h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-primary">{title}</h2>
                    {periodo && (
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        <span>Período</span>
                        <span className="text-primary/80">{periodo}</span>
                      </div>
                    )}
                  </div>

                  {descricao && (
                    <div
                      className="text-sm text-gray-700 leading-relaxed content-html"
                      dangerouslySetInnerHTML={{ __html: descricao }}
                    />
                  )}

                  <span className="mt-auto inline-flex items-center gap-2 text-primary font-medium text-sm">
                    Ver detalhes
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </main>
  )
}

