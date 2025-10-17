import { useContent } from "@/hooks/useContent"
import { ISecretariaAcademica } from "./types/ISecretariaAcademica"

export default function SecretariaDigital() {
  const { data: secretaria, loading, error, refetch } = useContent<ISecretariaAcademica>("o-colegio/secretaria-academica")
  
  return(
    <main>
      {secretaria.map(({ 
        conteudo,
        foto,
        id,
        matricula,
        slug,
        title,
        titulo,
       }) => (
        <main key={id} className="flex justify-center items-center my-12 md:my-20">
          <section className="w-full max-w-[1200px] flex flex-col gap-10 md:gap-10">
            <h1 className="text-primary text-[28px] md:text-[32px] font-bold">
              {title}
            </h1>
            <div className="flex flex-row gap-10">
              <div className="w-[50%]">
                <div className="content-html" dangerouslySetInnerHTML={{ __html:conteudo }} />
              </div>
              <div className="w-[50%]">
                <img src={foto} alt="foto da pagina de secretaria acadêmica" />
              </div>
            </div>
          </section>
        </main>
      ))}
    </main>
  )
}