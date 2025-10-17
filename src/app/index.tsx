import { useContent } from "@/hooks/useContent";
import useSeo from "@/hooks/useSeo";
import { IHome } from "./home/types";
import { HiLightBulb } from "react-icons/hi";
import { LuPencilRuler } from "react-icons/lu";

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
      </section>
    </main>
  );
}
