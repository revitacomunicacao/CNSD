import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useContent } from "@/hooks/useContent";
import useSeo from "@/hooks/useSeo";
import { IHome } from "./home/types";
import { HiLightBulb } from "react-icons/hi";
import { LuPencilRuler } from "react-icons/lu";
import metodo1 from "@/assets/logo-omb.png";
import metodo2 from "@/assets/logo-bernoulli.png";
import fundodiferenciais from "@/assets/fundo-cursos-e-atividades.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import fundodepoimento from "@/assets/fundo-depoimento.jpg";
import { Link } from "react-router-dom";

interface IGaleriaDeFotos {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
}

export default function HomePage() {
  const bannerAutoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useSeo({
    title: "Colégio Nossa Senhora das Dores - CNSD",
    description: "Colégio Nossa Senhora das Dores - Educação de qualidade em Uberaba",
  });

  const { data: home, loading, error } = useContent<IHome>("/home");
  const { data: destaques, loading: loadingDestaques } = useContent<any>("blog/ultimos-por-categoria");
  const { data: galeriaDeFotos, loading: loadingGaleria } = useContent<IGaleriaDeFotos>("fotos")
  console.log(galeriaDeFotos)

  if (loading) return "carregando";
  if (error) return "erro ao carregar conteúdo";

  const root = home?.[0];
  const banners = (root as any)?.banners ?? (root as any)?.banner ?? [];
  const banner = banners?.[0];
  const fiqueLigado = root?.fique_ligado ?? [];
  const ensinoCNSD = root?.ensino_cnsd;
  const ensino = root?.ensino ?? [];
  const diferenciais = root?.diferenciais ?? [];
  const depoimentos = root?.depoimentos ?? [];

  // Função para formatar data e hora
  const formatarDataHora = (dataString: string) => {
    if (!dataString) return "";
    const data = new Date(dataString);
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // normaliza link do banner (se vier sem protocolo)
  const href =
    banner?.link && /^https?:\/\//i.test(banner.link)
      ? banner.link
      : banner?.link
      ? `https://${banner.link}`
      : undefined;

  return (
    <main>
      {/* */}
      {/* HERO rotativo full-screen */}
      {/* */}
      {Array.isArray(banners) && banners.length > 0 && (
        <section className="w-full overflow-hidden">
          <Carousel
            className="w-full h-full"
            opts={{ align: "start", loop: true }}
            plugins={banners.length > 1 ? [bannerAutoplay.current] : undefined}
          >
            <CarouselContent className="h-full">
              {banners.map((b: any, idx: number) => {
                const toHref = (link?: string) =>
                  link
                    ? /^https?:\/\//i.test(link)
                      ? link
                      : `https://${link}`
                    : undefined;
                const href = toHref(b?.link);

                const Img = (
                  <img
                    src={b?.foto}
                    alt={b?.nome || `Banner ${idx + 1}`}
                    className="block w-full h-full object-cover"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                );

                return (
                  <CarouselItem
                    key={`${idx}-${b?.foto || "banner"}`}
                    className="basis-full h-full"
                  >
                    {href ? (
                      <a
                        href={href}
                        target=""
                        rel="noopener noreferrer"
                        aria-label={b?.nome || "Banner"}
                      >
                        {Img}
                      </a>
                    ) : (
                      Img
                    )}
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {banners.length > 1 && (
              <>
                <CarouselPrevious className="left-4 bg-white/80 hover:bg-white text-[#0B2A4A]" />
                <CarouselNext className="right-4 bg-white/80 hover:bg-white text-[#0B2A4A]" />
              </>
            )}
          </Carousel>
        </section>
      )}

      {/* */}
      {/* Fique Ligado */}
      {/* */}
      {fiqueLigado?.length ? (
        <section className="w-full bg-[#FFEB00] py-6">
          <div className="max-w-full mx-auto px-2 flex flex-col md:flex-row items-center gap-4">
            <HiLightBulb className="text-[50px]" />
            <h2 className="shrink-0 text-[28px] leading-none font-extrabold text-[#0B2A4A]">
              Fique
              <br className="hidden sm:block" /> Ligado
            </h2>

            <nav className="flex-1">
              <ul className="flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-1 md:gap-y-3">
                {fiqueLigado.map(({ nome, link }, idx) => (
                  <li
                    key={`${idx}-${link}`}
                    className="text-[#0B2A4A] font-bold text-[16px]"
                  >
                    <a
                      href={link}
                      target=""
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex items-center gap-2"
                    >
                      <span>•</span>
                      <span>{nome}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      ) : null}

      {/* */}
      {/* Ensino CNSD */}
      {/* */}
      <section className="px-10">
        <div className="flex flex-row justify-center items-center pt-20 gap-4">
          <LuPencilRuler className="text-[#0B2A4A] text-[50px]" />
          <h3 className="text-[32px] font-semibold">Ensino CNSD</h3>
        </div>
        {ensinoCNSD ? (
          <div
            className="mt-10 text-[16px] leading-7 text-[#0B2A4A]"
            dangerouslySetInnerHTML={{ __html: ensinoCNSD }}
          />
        ) : null}

        <div className="mx-auto px-4 mt-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10">
            {ensino.map(({ nome, imagem, link }, idx) => {
              const href =
                link && /^https?:\/\//i.test(link)
                  ? link
                  : link
                  ? `https://${link}`
                  : undefined;

              const Card = (
                <div className="text-center">
                  {/* círculo + imagem */}
                  <div className="overflow-hidden flex justify-center">
                    <img
                      src={imagem}
                      alt={nome}
                      className="h-auto w-[320px]"
                      loading="lazy"
                    />
                  </div>

                  {/* título */}
                  <h3 className="mt-4 text-sm font-extrabold tracking-wide text-[#0B2A4A] uppercase">
                    {nome}
                  </h3>
                </div>
              );

              return (
                <li key={`${idx}-${nome}`}>
                  {href ? (
                    <a
                      href={href}
                      target=""
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {Card}
                    </a>
                  ) : (
                    Card
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-20 my-10">
          <div className="flex flex-col gap-3">
            <img src={metodo1} className="h-20 w-auto" />
            <p className="font-semibold">Método de ensino Montessori</p>
          </div>

          <div className="flex flex-col gap-3">
            <img src={metodo2} className="h-20 w-auto" />
            <p className="font-semibold">
              O sistema de ensino que mais aprova no ENEM
            </p>
          </div>
        </div>
      </section>

      {/* */}
      {/* Diferenciais */}
      {/* */}
      <section
        className="w-full py-12"
        style={{
          backgroundImage: `url(${fundodiferenciais})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-center text-[30px] font-semibold text-[#0B2A4A] mb-8">
            Diferenciais
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
            {diferenciais.map(({ nome, foto, link }, idx) => {
              const href =
                link && /^https?:\/\//i.test(link)
                  ? link
                  : link
                  ? `https://${link}`
                  : undefined;

              const Card = (
                <div className="text-center">
                  {/* círculo com imagem */}
                  <div className="overflow-hidden flex items-center justify-center">
                    <img
                      src={foto}
                      alt={nome}
                      className="w-auto h-65"
                      loading="lazy"
                    />
                  </div>

                  {/* título */}
                  <h3 className="mt-4 text-sm font-bold tracking-wide text-[#0B2A4A] uppercase">
                    {nome}
                  </h3>
                </div>
              );

              return (
                <li key={`${idx}-${nome}`}>
                  {href ? (
                    <a
                      href={href}
                      target=""
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {Card}
                    </a>
                  ) : (
                    Card
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* */}
      {/* --- DEPOIMENTOS --- */}
      {/* */}
      <section className="w-full bg-white py-14">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-center text-[28px] font-bold text-[#0B2A4A] mb-10">
            Depoimentos
          </h2>

          <Carousel
            className="w-full"
            opts={{
              align: "start", // evita o “meio slide” ao avançar
              loop: false,
              slidesToScroll: 2, // avança de 2 em 2 (já que exibimos 2 por vez no desktop)
            }}
          >
            <CarouselContent className="-ml-4">
              {depoimentos.map(
                ({ nome, foto, periodo_estudo, ocupacao, depoimento }, idx) => (
                  <CarouselItem
                    key={idx}
                    className="pl-4 basis-full md:basis-1/2"
                  >
                    <div
                      className="rounded-lg text-white p-6 h-[360px] flex flex-col gap-4"
                      style={{
                        backgroundImage: `url(${fundodepoimento})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Topo: avatar + texto rolável */}
                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0">
                          {foto ? (
                            <img
                              src={foto}
                              alt={nome}
                              className="w-16 h-16 rounded-full object-cover border-2 border-white/80"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center text-white">
                              <span className="text-xl">👤</span>
                            </div>
                          )}
                        </div>

                        {/* ÁREA COM SCROLL */}
                        <div className="flex-1 pr-2">
                          <div className="max-h-[200px] overflow-y-auto leading-relaxed text-sm">
                            {depoimento}
                          </div>
                        </div>
                      </div>

                      {/* Rodapé fixo do card */}
                      <div className="mt-auto pt-2">
                        <p className="font-bold">{nome}</p>
                        {periodo_estudo && (
                          <p className="text-sm">
                            Estudou no CNSD no período de {periodo_estudo}
                          </p>
                        )}
                        {ocupacao && <p className="text-sm">{ocupacao}</p>}
                      </div>
                    </div>
                  </CarouselItem>
                )
              )}
            </CarouselContent>

            <CarouselPrevious className="bg-white text-[#00B5D9] hover:bg-white/80" />
            <CarouselNext className="bg-white text-[#00B5D9] hover:bg-white/80" />
          </Carousel>
        </div>
      </section>

      {/* */}
      {/* DESTAQUES */}
      {/* */}
      {destaques && destaques.length > 0 && (
        <section className="w-full bg-white py-14">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-center text-[28px] font-bold text-[#0B2A4A] mb-10">
              Destaques
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {destaques.map((item: any) => {
                const foto = item.post?.featured?.url || "";
                const dataPublicacao = item.post?.datetime || item.post?.date || "";
                const categoriaNome = item.category?.name || "Sem categoria";
                const slug = item.post?.slug || "";
                const titulo = item.post?.title || "";

                return (
                  <Link
                    key={item.post?.id || Math.random()}
                    to={`/publicacoes/noticias/${slug}`}
                    className="block"
                  >
                    <div
                      className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                      style={{
                        backgroundImage: `url(${foto})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Overlay escuro no canto inferior */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 min-h-[130px] flex justify-between flex-col">
                        <div className="flex flex-col justify-center gap-1">
                          <p className="text-white text-xs mb-1 opacity-90">
                            {dataPublicacao || ""}
                          </p>
                          <p className="text-white font-bold text-sm mb-2 line-clamp-2">
                            {titulo}
                          </p>
                        </div>
                        <p className="text-white font-semibold text-sm">
                          {categoriaNome}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <section className="flex flex-col justify-center items-center my-20">
        <h2 className="text-center text-[28px] font-bold text-[#0B2A4A] mb-10">
          Fotos
        </h2>
        {galeriaDeFotos.map(({ 
          excerpt,
          featured_image,
          id,
          slug,
          title,
        }) => (
          <a href={`/publicacoes/noticias/${slug}`} key={id} className="w-[400px] text-center">
            <img src={featured_image} />
            <h2>{title}</h2>
            <div className="text-black" dangerouslySetInnerHTML={{ __html:excerpt }} />
          </a>
        ))}
      </section>
    </main>
  );
}
