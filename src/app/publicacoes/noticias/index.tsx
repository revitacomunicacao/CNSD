import { useSearchParams, Link } from "react-router-dom"
import { useBlogPaginated } from "@/hooks/useBlogPaginated"
import { useBlogCategories } from "@/hooks/useBlogCategories"
import { useBlogByCategory } from "@/hooks/useBlogByCategory"
import { useContent } from "@/hooks/useContent"
import { INoticias } from "./types/INoticias"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function Noticias() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get("page") || "1", 10)
  const categoriaSlug = searchParams.get("categoria") || null

  const { data: postsPaginated, loading: loadingPosts } = useBlogPaginated(currentPage)
  const { data: postsByCategory, loading: loadingCategory } = useBlogByCategory(categoriaSlug || "", currentPage, 10)
  const { data: categories, loading: loadingCategories } = useBlogCategories()
  
  // Buscar posts completos para pegar featured images
  const { data: postsCompletos } = useContent<any>("blog")

  // Criar um mapa de slugs para posts completos (para pegar featured image)
  const postsMap = new Map(postsCompletos?.map((post: any) => [post.slug, post]) || [])

  // Determinar qual dados usar: categoria ou todos os posts
  const isCategoryView = !!categoriaSlug
  const loadingData = isCategoryView ? loadingCategory : loadingPosts

  // Combinar dados com featured images quando disponíveis
  const postsCompletosComImagem = (isCategoryView 
    ? postsByCategory?.items || []
    : postsPaginated?.posts || []
  ).map(post => {
    const postCompleto = postsMap.get(post.slug)
    return {
      ...post,
      featured: postCompleto?.featured ? {
        url: postCompleto.featured.url || "",
        alt: postCompleto.featured.alt || post.title,
      } : {
        url: "",
        alt: "",
      },
    }
  }) || []

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    if (categoriaSlug) {
      params.set("categoria", categoriaSlug)
    }
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const renderPagination = () => {
    const totalPages = isCategoryView 
      ? (postsByCategory?.pagination.total_pages || 0)
      : (postsPaginated?.totalPages || 0)

    if (totalPages <= 1) return null

    const pages: (number | string)[] = []
    const current = currentPage

    // Sempre mostrar primeira página
    if (current > 3) {
      pages.push(1)
      if (current > 4) pages.push("ellipsis")
    }

    // Páginas ao redor da atual
    for (let i = Math.max(1, current - 2); i <= Math.min(totalPages, current + 2); i++) {
      pages.push(i)
    }

    // Sempre mostrar última página
    if (current < totalPages - 2) {
      if (current < totalPages - 3) pages.push("ellipsis")
      pages.push(totalPages)
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (current > 1) handlePageChange(current - 1)
              }}
              className={current === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {pages.map((page, idx) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            const pageNum = page as number
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(pageNum)
                  }}
                  isActive={pageNum === current}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (current < totalPages) handlePageChange(current + 1)
              }}
              className={current === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  if (loadingData || loadingCategories) {
    return <div className="py-20 text-center">Carregando…</div>
  }

  return (
    <main>
      <main className="flex justify-center items-start my-12 md:my-20">
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-8 px-4">
          {/* Coluna Esquerda - Lista de Posts */}
          <section className="flex-1 space-y-6">
            {/* Título da categoria se estiver filtrando */}
            {isCategoryView && postsByCategory?.category && (
              <h1 className="text-2xl font-bold text-[#0B2A4A] mb-6">
                {postsByCategory.category.name}
              </h1>
            )}

            {postsCompletosComImagem.map((post) => (
              <Link
                key={post.id}
                to={`/publicacoes/noticias/${post.slug}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Foto destacada */}
                  {post.featured?.url && (
                    <div className="w-full md:w-64 flex-shrink-0">
                      <img
                        src={post.featured.url}
                        alt={post.featured.alt || post.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Conteúdo: título e resumo */}
                  <div className="flex-1 p-6">
                    <h2 className="text-xl font-bold text-[#0B2A4A] mb-3 hover:underline">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <div
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                    )}
                  </div>
                </div>
              </Link>
            ))}

            {/* Paginação */}
            <div className="mt-8 flex justify-center">
              {renderPagination()}
            </div>
          </section>

          {/* Coluna Direita - Lista de Categorias */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-[#0B2A4A] mb-4">Categorias</h3>
              <nav>
                <ul className="space-y-2">
                  {categories?.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/publicacoes/noticias?categoria=${category.slug}`}
                        className="block text-[#0B2A4A] hover:text-primary hover:underline py-2 border-b border-gray-200 last:border-b-0"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </main>
    </main>
  )
}
