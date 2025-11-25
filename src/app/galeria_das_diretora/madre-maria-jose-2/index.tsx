import { Link } from "react-router-dom"
import useSeo from "@/hooks/useSeo"

export default function MadreMariaJose() {
  useSeo({
    title: "Madre Maria José - Galeria das Diretoras - CNSD",
    description: "Conheça a trajetória de Madre Maria José, primeira diretora do Colégio Nossa Senhora das Dores (1885-1909)",
  })

  const foto = "https://cnsd.com.br/admin/wp-content/uploads/2025/11/Madre-Maria-Jose-fundadora-224x300-1.jpg"
  const nome = "Madre Maria José"
  const periodo = "1885 – 1909"
  const conteudo = `
    <p>Nascida em Villefranquette, Aveyron, na França, Madre Maria José ingressou na Congregação das Irmãs Dominicanas de Nossa Senhora do Rosário de Monteils, fundada no ano de 1850. Foi aluna da fundadora da Congregação – Madre Anastasie.</p>
    
    <p>No ano de 1885, veio para o Brasil, coordenando o grupo das primeiras Irmãs Francesas Dominicanas que chegaram ao País no dia 10 de junho, e se instalaram numa residência próxima à Santa Casa de Misericórdia, até o término das adaptações feitas numa ala da Santa Casa.</p>
    
    <p>Irmã de muita coragem e dedicação, logo com o contato com as crianças e pessoas que ali trabalhavam, melhor conhecia a língua portuguesa. Missionária e educadora assumiu a Direção do Colégio Nossa Senhora das Dores que naquele local teve o seu início.</p>
    
    <p>Irmã Maria José com o apoio dos Padres Dominicanos, dos pais das alunas e com autoridades locais conduziu a construção do Colégio que foi inaugurado em 30 de dezembro de 1895 (dez anos após a chegada das Irmãs a Uberaba).</p>
    
    <p>Irmã Maria José continuou na Coordenação e Direção do Colégio sempre com muita fé em Deus e sob a proteção de Nossa Senhora das Dores. O número de alunas crescia e Madre Maria José com sua equipe continuou firme, e o Colégio cada vez mais procurado.</p>
    
    <p>No ano de 1906, foi equiparado às Escolas Normais Estaduais que atendiam às jovens de Uberaba e de outras regiões do Brasil Central. Madre Maria José, mulher corajosa, de muita fé, rezava sem cessar para que o CNSD pudesse formar jovens cristãs sábias.</p>
    
    <p>Em 1909, houve uma exposição de trabalhos em Belo Horizonte, em que se destacaram os trabalhos apresentados pelas alunas do CNSD. A Comissão Examinadora distinguiu o Colégio e cada uma das alunas participantes, com seus nomes inscritos, em um quadro de honra. Nos arquivos do CNSD, encontram-se vários termos de inspeção do Curso Normal que traduzem o prestígio de que o Colégio já gozava.</p>
    
    <p>Graças à serenidade do trabalho das Irmãs Dominicanas, gozava também, o Colégio, da admiração e simpatia dos governantes de Minas Gerais. Ele foi visitado por Presidentes de Estado, como os Doutores Bueno Brandão e Fernando de Melo Viena, quando estiveram em visita à cidade.</p>
    
    <p>Vinte e quatro anos de dedicação e amor às crianças e à juventude, transmite o cargo de Diretora à Madre Maria Alexandra do Menino Jesus.</p>
    
    <p>No dia 03 de agosto de 1933, às 9h30, ouvindo a "Salve Rainha" que as Irmãs cantavam para ela, Madre Maria José fechou os olhos para a vida terrena. Faleceu com 81 anos de idade, tendo vivido 48 desses, em Uberaba, sem jamais voltar a sua pátria.</p>
    
    <p>Seu velório atraiu multidões para a Capela do Convento, no dia anterior ao funeral, e seu corpo foi levado, em um caixão branco, para o Cemitério São João Batista e colocado no túmulo das Dominicanas, em Uberaba.</p>
    
    <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
      <p style="font-weight: 600; margin-bottom: 0.5rem;">Fontes:</p>
      <ul style="list-style: disc; margin-left: 1.5rem; color: #6b7280;">
        <li>Pesquisas feitas pela Irmã Maria Beatriz Manna</li>
        <li>Livro Primórdios das Dominicanas no Brasil Central</li>
      </ul>
    </div>
  `

  return (
    <main>
      <main className="flex justify-center items-start my-12 md:my-20">
        <section className="w-full max-w-[1200px] flex flex-col gap-10 px-4">
          <div className="flex flex-col gap-3 items-center text-center">
            <Link to="/o-colegio/galeria-das-diretoras" className="self-start text-sm text-primary hover:underline">
              ← Voltar para a galeria
            </Link>
          </div>

          {foto && (
            <div className="w-full max-w-2xl mx-auto flex flex-col md:flex-row gap-10 justify-center items-center">
              <img
                src={foto}
                alt={nome}
                className="w-80 h-auto rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-primary mt-2 leading-snug">{nome}</h1>
                {periodo && (
                  <div className="flex mt-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-base font-semibold text-primary">
                      <span>Período</span>
                      <span className="text-primary/80">{periodo}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {conteudo && (
            <div
              className="content-html text-lg text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: conteudo }}
            />
          )}
        </section>
      </main>
    </main>
  )
}

