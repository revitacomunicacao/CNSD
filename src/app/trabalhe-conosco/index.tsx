import { useState } from "react"

export default function TrabalheConosco() {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: Record<string, FormDataEntryValue> = {}
    formData.forEach((value, key) => {
      data[key] = value
    })
    setSubmitting(true)
    try {
      console.log("Trabalhe Conosco:", data)
      // TODO: enviar para API quando disponível
      alert("Formulário enviado!")
      e.currentTarget.reset()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <main className="flex justify-center items-center my-12 md:my-20">
        <section className="w-full max-w-[1200px] flex flex-col gap-10 px-4">
          <h1>Trabalhe Conosco</h1>

          <div className="space-y-3 text-gray-700">
            <p>O Colégio Nossa Senhora das Dores acredita na excelência acadêmica e formação integral do ser e busca pessoas capazes de contribuir com a instituição, para que ela permaneça reconhecida por seus valores e proposta pedagógica.</p>
            <p>Venha fazer parte dessa história!</p>
            <p>Seu currículo será mantido em nosso banco de dados durante um ano para futuras oportunidades.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="text-sm font-medium text-gray-700">Seu nome <span className="text-red-600">(Obrigatório)</span></label>
                <input id="nome" name="nome" type="text" className="border rounded-md px-3 py-2" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Seu e-mail <span className="text-red-600">(Obrigatório)</span></label>
                <input id="email" name="email" type="email" className="border rounded-md px-3 py-2" required />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="tipoCurriculo" className="text-sm font-medium text-gray-700">Tipos de currículo <span className="text-red-600">(Obrigatório)</span></label>
                <select id="tipoCurriculo" name="tipoCurriculo" className="border rounded-md px-3 py-2" required>
                  <option value="">Selecione uma opção</option>
                  <option value="estagiario">Estagiário — Melhor opção para quem cursa o Ensino Médio, Técnico ou Superior e está em busca de estágio</option>
                  <option value="operacional">Operacional — Adequado para cargos operacionais, tais como: Administrativo, Financeiro, Recepção, Disciplinários e Serviços Gerais</option>
                  <option value="pcd">PcD — Voltado para pessoas com deficiência física, auditiva, visual, mental ou múltipla</option>
                  <option value="profissional">Profissional — Indicação para profissionais com ou sem formação superior, recém-formados ou no último ano de graduação</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="facebook" className="text-sm font-medium text-gray-700">Facebook</label>
                <input id="facebook" name="facebook" type="text" className="border rounded-md px-3 py-2" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="linkedin" className="text-sm font-medium text-gray-700">LinkedIn</label>
                <input id="linkedin" name="linkedin" type="text" className="border rounded-md px-3 py-2" />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="resumo" className="text-sm font-medium text-gray-700">Resumo Profissional <span className="text-red-600">(Obrigatório)</span></label>
                <textarea id="resumo" name="resumo" className="border rounded-md px-3 py-2 min-h-28" required />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="mensagem" className="text-sm font-medium text-gray-700">Sua mensagem <span className="text-red-600">(Obrigatório)</span></label>
                <textarea id="mensagem" name="mensagem" className="border rounded-md px-3 py-2 min-h-28" required />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="curriculo" className="text-sm font-medium text-gray-700">Anexar currículo</label>
                <input id="curriculo" name="curriculo" type="file" accept=".pdf,.doc,.docx,.odt" className="border rounded-md px-3 py-2" />
              </div>
            </div>

            <div className="flex gap-4 my-10">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md disabled:opacity-50" disabled={submitting}>
                {submitting ? "Enviando..." : "Enviar"}
              </button>
              <button type="reset" className="border border-gray-300 px-6 py-2 rounded-md">Limpar</button>
            </div>
          </form>
        </section>
      </main>
    </main>
  )
}