import { useContent } from "@/hooks/useContent"
import { IHistoria } from "./types/IHistoria"

export default function NossaHistoria() {
  const { data: historia, loading, error, refetch } = useContent<IHistoria>('o-colegio/nossa-historia')
  console.log(historia)
  return(
    <main>
      {historia.map(({ 
        coluna_da_direita,
        foto_da_pagina,
        id,
        inicio_da_gestao_leiga,
        irmas,
        legenda_da_foto,
        slug,
        texto_1,
        texto_2,
        texto_3,
        title,
        titulo 
      }) => (
        <>
          <main className="flex justify-center items-center my-20">
            <section className="w-[1200px] flex flex-row gap-20">
              <div className="flex flex-col justify-start items-start gap-5">
                <h1 className="text-primary text-[32px] font-bold">{title}</h1>
                <div className="content-html" dangerouslySetInnerHTML={{ __html:texto_1 }} />

                <div className="flex flex-row">
                  <div className="flex flex-col justify-center items-center w-[50%]">
                    <img src={foto_da_pagina} alt="foto da pagina" />
                    <p>{legenda_da_foto}</p>
                  </div>
                  <div className="w-[50%]">
                    <div className="content-html" dangerouslySetInnerHTML={{ __html:texto_2 }} />
                  </div>
                </div>
                <div className="content-html" dangerouslySetInnerHTML={{ __html:texto_3 }} />
              </div>
                
              <div className="flex flex-col gap-4 mt-20">
                {coluna_da_direita.map(({ descricao,foto,nome }) => (
                  <div className="flex flex-col justify-center gap-3 items-center">
                    <img src={foto} alt="foto das pessoas" />
                    <h2 className="font-bold text-center">{nome}</h2>
                    <p className="content-html text-center text-[12px]" dangerouslySetInnerHTML={{ __html:descricao }} />
                  </div>
                ))}
              </div>
            </section>
          </main>
          <div className="flex justify-center items-center my-10">
            <div className="flex flex-col justify-center w-[1200px] items-center">
              <h2 className="text-center text-[21px] font-bold flex justify-center">
                IRMÃS DOMINICANAS COMO DIRETORA DO COLÉGIO NOSSA SENHORA DAS DORES
              </h2>
              <div className="grid grid-cols-6 gap-4 ">
                {irmas.map(({ foto,nome,periodo }) => (
                  <div className="flex flex-col justify-center text-center gap-2 ">
                    <img src={foto} alt="Foto da irmã" />
                    <div className="bg-[#ececec] p-4 rounded-2xl flex flex-col gap-2 min-h-[120px]">
                      <h2 className="text-black font-bold text-[16px] leading-4.5">{nome}</h2>
                      <p className="text-black">{periodo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center my-10">
            <div className="flex flex-col justify-center w-[1200px] items-center">
              <h2 className="text-center text-[21px] font-bold flex justify-center">
                INÍCIO DA GESTÃO LEIGA
              </h2>
              <div className="grid grid-cols-6 gap-4 ">
                {inicio_da_gestao_leiga.map(({ foto,nome,periodo }) => (
                  <div className="flex flex-col justify-center text-center gap-2 ">
                    <img src={foto} alt="Foto da irmã" />
                    <div className="bg-[#ececec] p-4 rounded-2xl flex flex-col gap-2 min-h-[120px]">
                      <h2 className="text-black font-bold text-[16px] leading-4.5">{nome}</h2>
                      <p className="text-black">{periodo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ))}
    </main>
  )
}