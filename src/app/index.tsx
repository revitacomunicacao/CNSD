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

export default function HomePage() {
  useSeo({
    title: "Home",
    description: "Home",
    image: "https://via.placeholder.com/150",
    icon: "https://via.placeholder.com/150",
  });

  const { data: home, loading, error } = useContent<IHome>("/home");

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

  // normaliza link do banner (se vier sem protocolo)
  const href =
    banner?.link && /^https?:\/\//i.test(banner.link)
      ? banner.link
      : banner?.link
      ? `https://${banner.link}`
      : undefined;

  return (
    <main>
      {/* Banner full width */}
      {banner?.foto ? (
        <section className="w-full">
          {href ? (
            <a
              href={href}
              aria-label={banner?.nome || "Banner"}
              target="_blank"
              rel="noopener noreferrer"
            >
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
      {/* Fique Ligado */}
      {fiqueLigado?.length ? (
        <section className="w-full bg-[#FFEB00] py-6">
          <div className="max-w-[1200px] mx-auto px-2 flex items-center gap-4">
            <HiLightBulb className="text-[50px]" />
            <h2 className="shrink-0 text-[28px] leading-none font-extrabold text-[#0B2A4A]">
              Fique
              <br className="hidden sm:block" /> Ligado
            </h2>

            <nav className="flex-1">
              <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
                {fiqueLigado.map(({ nome, link }, idx) => (
                  <li
                    key={`${idx}-${link}`}
                    className="text-[#0B2A4A] font-bold text-[16px]"
                  >
                    <a
                      href={link}
                      target="_blank"
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
      {/* Ensino CNSD */}
      <section className="px-10">
        <div className="flex flex-row justify-center items-center pt-20 gap-4">
          <LuPencilRuler className="text-[#0B2A4A] text-[50px]" />
          <h3 className="text-[32px] font-semibold">Ensino CNSD</h3>
        </div>
        <p className="mt-10">{ensinoCNSD}</p>

        <div className="mx-auto px-4 mt-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
                      className="h-[320px] w-auto"
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
                      target="_blank"
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

        <div className="flex justify-center gap-20 my-10">
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

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
                      target="_blank"
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

      {/* --- DEPOIMENTOS --- */}
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
    </main>
  );
}
