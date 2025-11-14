import { useContent } from "@/hooks/useContent";
import { INossaMissao } from "./types/INossaMissao";
import useSeo from "@/hooks/useSeo";

type Bloco = {
  titulo: string;
  descricao: string; // pode vir com <strong>, etc.
};

function PainelBloco({ titulo, descricao }: Bloco) {
  return (
    <div className="relative bg-[#2f3236] text-white px-6 md:px-10 py-10">
      {/* Linha superior + triângulo */}
      <div className="relative mx-2 md:mx-6 mb-8">
        <div className="h-[2px] bg-white/80" />
      </div>

      {/* Título */}
      <h3 className="text-[#01befe] text-[22px] md:text-[24px] font-bold uppercase text-center tracking-wide">
        {titulo}
      </h3>

      {/* Descrição (pode vir com <strong> etc.) */}
      <div
        className="mt-4 text-center leading-relaxed text-sm md:text-[15px] space-y-3 text-white [&_*]:text-white"
        dangerouslySetInnerHTML={{ __html: descricao }}
      />
    </div>
  );
}

export default function NossaMissao() {
  useSeo({
    title: "Nossa Missão - CNSD",
    description: "Conheça a missão e valores do Colégio Nossa Senhora das Dores",
  })

  const { data: conteudo, loading, error } =
    useContent<INossaMissao>("o-colegio/nossa-missao");

  if (loading) return <div className="py-20 text-center">Carregando…</div>;
  if (error) return <div className="py-20 text-center text-red-600">Erro ao carregar.</div>;
  if (!conteudo?.length) return null;

  return (
    <section>
      {conteudo.map(({ id, title, blocos_de_nossa_missao_e_valores }) => (
        <main key={id} className="flex justify-center items-center my-12 md:my-20">
          <section className="w-full max-w-[1200px] flex flex-col gap-10 md:gap-20">
            <h1 className="text-primary text-[28px] md:text-[32px] font-bold">
              {title}
            </h1>

            {/* Painéis lado a lado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blocos_de_nossa_missao_e_valores.slice(0, 2).map((bloco, idx) => (
                <PainelBloco
                  key={`${id}-bloco-${idx}`}
                  titulo={bloco.titulo}
                  descricao={bloco.descricao}
                />
              ))}
            </div>
          </section>
        </main>
      ))}
    </section>
  );
}
