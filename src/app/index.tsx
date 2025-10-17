import { useContent } from "@/hooks/useContent"
import useSeo from "@/hooks/useSeo"
import { IHome } from "./home/types"

export default function HomePage() {
  useSeo({
    title: "Home",
    description: "Home",
    image: "https://via.placeholder.com/150",
    icon: "https://via.placeholder.com/150",
  })

  const { data: home, loading, error } = useContent<IHome>("/home")

  if (loading) return "carregando"
  if (error) return "erro ao carregar conteúdo"

  const root = home?.[0]
  const banners = (root as any)?.banners ?? (root as any)?.banner ?? []
  const banner = banners?.[0]

  // normaliza link (adiciona https se vier "google.com")
  const href =
    banner?.link && /^https?:\/\//i.test(banner.link)
      ? banner.link
      : banner?.link
      ? `https://${banner.link}`
      : undefined

  return (
    <main>
      {banner?.foto ? (
        <section className="w-full">
          {href ? (
            <a href={href} aria-label={banner?.nome || "Banner"} target="_blank" rel="noopener noreferrer">
              <img
                src={banner.foto}
                alt={banner?.nome || "Banner principal"}
                className="block w-full h-auto object-cover"
              />
            </a>
          ) : (
            <img
              src={banner.foto}
              alt={banner?.nome || "Banner principal"}
              className="block w-full h-auto object-cover"
            />
          )}
        </section>
      ) : null}
    </main>
  )
}
