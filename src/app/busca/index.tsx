import { FormEvent, useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import useSeo from "@/hooks/useSeo"
import { Input } from "@/components/ui/input"
import { useContent } from "@/hooks/useContent"

interface IFeatured {
  url: string
  alt: string
}

interface ISearchItem {
  id: number
  title: string
  slug: string
  excerpt: string
  featured?: IFeatured | null
}

interface ISearchCategory {
  category: {
    id: number
    name: string
    slug: string
  }
  items: ISearchItem[]
}

export default function BuscaPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryParam = (searchParams.get("q") || "").trim()
  const [searchInput, setSearchInput] = useState(queryParam)

  useSeo({
    title: queryParam ? `Resultados para "${queryParam}"` : "Busca",
    description: "Resultados de busca do blog CNSD",
    image: "",
    icon: "",
  })

  useEffect(() => {
    setSearchInput(queryParam)
  }, [queryParam])

  const endpoint = useMemo(() => {
    return `blog/busca?q=${encodeURIComponent(queryParam)}`
  }, [queryParam])

  const { data: categories, loading, error } = useContent<ISearchCategory>(endpoint)

  const hasQuery = queryParam.length > 0
  const hasResults = (categories || []).some((category) => category.items?.length > 0)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = searchInput.trim()

    if (!normalized) {
      setSearchInput("")
      setSearchParams({})
      return
    }

    setSearchParams({ q: normalized }, { replace: true })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="bg-gray-50">
      <section className="w-full bg-[#0B2A4A] py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <p className="text-3xl font-bold text-white mb-4">Resultados da Busca</p>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col sm:flex-row gap-3"
          >
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Digite o termo que deseja encontrar"
              className="flex-1 h-12 rounded-full border border-white/40 bg-white/10 text-white placeholder:text-white/70 focus-visible:ring-white focus-visible:ring-2 focus-visible:border-white"
            />
            <button
              type="submit"
              className="px-8 h-12 rounded-full bg-[#FFEB00] text-white font-bold hover:bg-[#FFE200] transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 py-12">
        {!hasQuery && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-600">
            <p className="text-lg">
              Digite um termo acima para ver os resultados disponíveis.
            </p>
          </div>
        )}

        {hasQuery && loading && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-600">
            Carregando resultados...
          </div>
        )}

        {hasQuery && error && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-red-600">
            Não foi possível carregar os resultados. Tente novamente em instantes.
          </div>
        )}

        {hasQuery && !loading && !error && !hasResults && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-600">
            Nenhum resultado encontrado para <strong>{queryParam}</strong>.
          </div>
        )}

        {hasQuery && !loading && !error && hasResults && (
          <div className="space-y-10">
            {categories.map((category) => {
              if (!category.items || category.items.length === 0) {
                return null
              }

              return (
                <div key={category.category.id} className="space-y-6">
                  <header>
                    <h2 className="text-2xl font-bold text-[#0B2A4A]">
                      {category.category.name}
                    </h2>
                    <p className="text-gray-500">
                      {category.items.length} {category.items.length === 1 ? "resultado" : "resultados"}
                    </p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.items.map((item) => (
                      <Link
                        key={item.id}
                        to={`/publicacoes/noticias/${item.slug}`}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                      >
                        {item.featured?.url ? (
                          <img
                            src={item.featured.url}
                            alt={item.featured.alt || item.title}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">
                            Imagem indisponível
                          </div>
                        )}

                        <div className="p-6 flex flex-col gap-4 flex-1">
                          <h3 className="text-xl font-bold text-[#0B2A4A] leading-snug">
                            {item.title}
                          </h3>
                          {item.excerpt && (
                            <div
                              className="text-gray-600 text-sm leading-relaxed line-clamp-4"
                              dangerouslySetInnerHTML={{ __html: item.excerpt }}
                            />
                          )}
                          <span className="mt-auto inline-flex items-center gap-2 text-[#0B2A4A] font-semibold text-sm">
                            Ler mais
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}

