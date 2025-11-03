import { useState } from "react"

export default function DepoimentosEgresso() {
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
      console.log("Depoimento egresso:", data)
      // TODO: enviar para API quando disponível
      alert("Depoimento enviado!")
      e.currentTarget.reset()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <main className="flex justify-center items-center my-12 md:my-20">
        <section className="w-full max-w-[1200px] flex flex-col gap-10 px-4">
          <h1>Depoimentos</h1>
          <div className="space-y-3 text-gray-700">
            <p>Querido egresso,</p>
            <p>Conte para nós como foi a sua experiência durante o período que estudou no CNSD.</p>
            <p className="font-semibold">DEIXE TAMBÉM O SEU DEPOIMENTO</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="nomeCompleto" className="text-sm font-medium text-gray-700">Nome completo</label>
                <input id="nomeCompleto" name="nomeCompleto" type="text" className="border rounded-md px-3 py-2" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="periodoCNSD" className="text-sm font-medium text-gray-700">Estou no CNSD no período de</label>
                <input id="periodoCNSD" name="periodoCNSD" type="text" className="border rounded-md px-3 py-2" placeholder="Ex.: 2005 - 2012" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
                <input id="email" name="email" type="email" className="border rounded-md px-3 py-2" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="celular" className="text-sm font-medium text-gray-700">Celular</label>
                <input id="celular" name="celular" type="tel" className="border rounded-md px-3 py-2" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="profissao" className="text-sm font-medium text-gray-700">Profissão</label>
                <input id="profissao" name="profissao" type="text" className="border rounded-md px-3 py-2" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="genero" className="text-sm font-medium text-gray-700">Gênero</label>
                <select id="genero" name="genero" className="border rounded-md px-3 py-2">
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                  <option value="prefiro_nao_informar">Prefiro não informar</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="depoimento" className="text-sm font-medium text-gray-700">Texto de depoimento</label>
                <textarea id="depoimento" name="depoimento" className="border rounded-md px-3 py-2 min-h-32" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="foto" className="text-sm font-medium text-gray-700">Foto</label>
                <input id="foto" name="foto" type="file" accept="image/*" className="border rounded-md px-3 py-2" />
              </div>
            </div>

            <div className="flex gap-4">
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