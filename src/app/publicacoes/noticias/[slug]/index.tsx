import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useContentId } from "@/hooks/useContentId"
import { INoticiaDetalhe } from "../types/INoticiaDetalhes"
import useSeo from "@/hooks/useSeo"

type LightboxState = {
  open: boolean
  images: string[]
  index: number
}

export default function DetalhesPost() {
  useSeo({
    title: "Notícia - CNSD",
    description: "Leia a notícia completa do Colégio Nossa Senhora das Dores",
  })

  const { slug } = useParams()
  const { data: conteudo, loading, error } = useContentId<INoticiaDetalhe[]>("blog/post", String(slug))

  const contentRef = useRef<HTMLDivElement | null>(null)
  const [lightbox, setLightbox] = useState<LightboxState>({ open: false, images: [], index: 0 })

  // Conecta as imagens de galerias do WP ao lightbox
  useEffect(() => {
    const root = contentRef.current
    if (!root) return

    // Usamos *delegação* de evento para evitar o bug em que o HTML do WP
    // é re-renderizado e as referências dos <img> mudam (listeners antigos
    // deixam de funcionar após abrir/fechar o lightbox).
    const getImgs = () => Array.from(root.querySelectorAll("figure.wp-block-gallery img")) as HTMLImageElement[]

    // Apenas um toque visual (cursor) – seguro reaplicar.
    getImgs().forEach((img) => {
      img.style.cursor = "zoom-in"
    })

    const onClick = (e: MouseEvent) => {
      const target = e.target as unknown

      // Clique direto no <img>
      let imgEl: HTMLImageElement | null = target instanceof HTMLImageElement ? target : null

      // Clique em <a> envolvendo o <img>
      if (!imgEl && target instanceof HTMLElement) {
        const maybeImg = target.querySelector?.("img")
        if (maybeImg instanceof HTMLImageElement) imgEl = maybeImg
      }

      if (!imgEl) return
      if (!imgEl.closest("figure.wp-block-gallery")) return

      e.preventDefault()
      e.stopPropagation()

      const imgs = getImgs()
      if (!imgs.length) return

      const sources = imgs.map((img) => img.currentSrc || img.src).filter(Boolean)
      const idx = Math.max(0, imgs.indexOf(imgEl))

      setLightbox({ open: true, images: sources, index: idx })
    }

    root.addEventListener("click", onClick)
    return () => root.removeEventListener("click", onClick)
  }, [conteudo])

  // Bloqueia scroll do body quando o lightbox estiver aberto
  useEffect(() => {
    if (!lightbox.open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [lightbox.open])

  // Atalhos de teclado (ESC, setas)
  useEffect(() => {
    if (!lightbox.open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox((s) => ({ ...s, open: false }))
      if (e.key === "ArrowRight") setLightbox((s) => ({ ...s, index: Math.min(s.index + 1, s.images.length - 1) }))
      if (e.key === "ArrowLeft") setLightbox((s) => ({ ...s, index: Math.max(s.index - 1, 0) }))
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [lightbox.open])

  if (loading) return <div className="py-20 text-center">Carregando…</div>
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>
  if (!conteudo || !Array.isArray(conteudo) || conteudo.length === 0) return null

  const currentImg = lightbox.images[lightbox.index]

  return (
    <main className="flex justify-center items-start my-12 md:my-20 px-4">
      <section className="w-full max-w-[1200px] flex flex-col gap-6">
        {conteudo.map((item) => (
          <div key={item.id} className="flex flex-col gap-6">
            {/* Título */}
            <h1>{item.title || "Notícia"}</h1>

            {/* Imagem destacada (50% e centralizada) */}
            {item.featured?.url && (
              <div className="w-full flex justify-center">
                <img
                  src={item.featured.url}
                  alt={item.featured.alt || item.title}
                  className="block w-full md:w-1/2 mx-auto h-auto rounded-lg object-cover"
                />
              </div>
            )}

            {/* Conteúdo */}
            {item.content && (
              <div
                ref={contentRef}
                className="wp-content content-html text-lg text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            )}
          </div>
        ))}
      </section>

      {/* Lightbox */}
      {lightbox.open && currentImg && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox((s) => ({ ...s, open: false }))}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightbox((s) => ({ ...s, open: false }))}
              className="absolute -top-10 right-0 rounded-md bg-white/10 px-3 py-1 text-white hover:bg-white/20"
              aria-label="Fechar"
            >
              Fechar ✕
            </button>

            <img
              src={currentImg}
              alt="Imagem ampliada"
              className="w-full max-h-[85vh] object-contain rounded-lg"
            />

            {/* Navegação */}
            {lightbox.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setLightbox((s) => ({ ...s, index: Math.max(s.index - 1, 0) }))}
                  className="absolute left-0 top-1/2 -translate-y-1/2 rounded-md bg-white/10 px-3 py-2 text-white hover:bg-white/20"
                  aria-label="Imagem anterior"
                  disabled={lightbox.index === 0}
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setLightbox((s) => ({ ...s, index: Math.min(s.index + 1, s.images.length - 1) }))}
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-md bg-white/10 px-3 py-2 text-white hover:bg-white/20"
                  aria-label="Próxima imagem"
                  disabled={lightbox.index === lightbox.images.length - 1}
                >
                  ›
                </button>

                <div className="mt-3 text-center text-sm text-white/80">
                  {lightbox.index + 1} / {lightbox.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
