import { useContent } from "@/hooks/useContent"

interface INaMidia {
  id?: number
  titulo?: string
  title?: string
  foto?: string
  imagem?: string
  link?: string
  descricao?: string
  conteudo?: string
  data?: string
  [key: string]: any
}

export default function NaMidia() {
  const { data: naMidia, loading, error } = useContent<INaMidia>("na-midia")

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!naMidia?.length) return null

  return (
    <main>
      <main className="flex justify-center items-start my-12 md:my-20">
        <section className="w-full max-w-[1200px] flex flex-col gap-10 px-4">
          {/* Título */}
          <h1>Na Mídia</h1>

          {/* Grid de 2 colunas */}
          {naMidia.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {naMidia.map((item, index) => {
                const titulo = item.titulo || item.title || ""
                const imagem = item.foto || item.imagem || ""
                const link = item.link || ""
                const descricao = item.descricao || item.conteudo || ""
                const data = item.data || ""

                const Card = (
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                    {/* Imagem */}
                    {imagem && (
                      <div className="w-64 h-full overflow-hidden bg-gray-100">
                        <img
                          src={imagem}
                          alt={titulo}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Conteúdo */}
                    <div className="p-6 flex flex-col flex-1 text-center">
                      {data && (
                        <p className="text-sm text-gray-500 mb-2">{data}</p>
                      )}
                      {titulo && (
                        <h3 className="text-lg font-semibold text-[#0B2A4A] mb-3">
                          {titulo}
                        </h3>
                      )}
                      {descricao && (
                        <div
                          className="text-gray-700 leading-relaxed flex-1"
                          dangerouslySetInnerHTML={{ __html: descricao }}
                        />
                      )}
                    </div>
                  </div>
                )

                return (
                  <div key={item.id || index}>
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {Card}
                      </a>
                    ) : (
                      Card
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </main>
  )
}