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
        <main className="flex justify-center items-center">
          <section className="w-[1200px] flex flex-row gap-20">
            <div className="flex flex-col justify-start items-start gap-5">
              <h1 className="text-primary text-[32px] font-bold">{title}</h1>
              <div dangerouslySetInnerHTML={{ __html:texto_1 }} />

              <div className="flex flex-row">
                <div className="flex flex-col justify-center items-center w-[50%]">
                  <img src={foto_da_pagina} alt="foto da pagina" />
                  <p>{legenda_da_foto}</p>
                </div>
                <div className="w-[50%]">
                  <div dangerouslySetInnerHTML={{ __html:texto_2 }} />
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html:texto_3 }} />
            </div>
              
            <div className="flex flex-col gap-4 mt-20">
              {coluna_da_direita.map(({ descricao,foto,nome }) => (
                <div className="flex flex-col justify-center gap-3 items-center">
                  <img src={foto} alt="foto das pessoas" />
                  <h2 className="font-bold text-center">{nome}</h2>
                  <p className="text-center text-[12px]" dangerouslySetInnerHTML={{ __html:descricao }} />
                </div>
              ))}
            </div>
          </section>
        </main>
      ))}
    </main>
  )
}