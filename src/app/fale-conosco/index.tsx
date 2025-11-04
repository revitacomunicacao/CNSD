import { useState } from "react"
import faleConoscoImg from "@/assets/fale-conosco-v2.jpg"

export default function FaleConosco() {
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
      console.log("Fale Conosco:", data)
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
        <section className="w-full max-w-[1200px] flex flex-col md:flex-row justify-center items-center gap-10 px-4">
          <div className="flex flex-col">
            <h1 className="text-center md:text-left">Fale Conosco</h1>
            <img className="w-full max-w-md h-auto" src={faleConoscoImg} alt="Fale Conosco" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md flex flex-col">
              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                  Seu nome <span className="text-red-600">(Obrigatório)</span>
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  className="border rounded-md px-3 py-2 bg-gray-50 w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Seu e-mail <span className="text-red-600">(Obrigatório)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="border rounded-md px-3 py-2 bg-gray-50 w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                  Seu telefone <span className="text-red-600">(Obrigatório)</span>
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  className="border rounded-md px-3 py-2 bg-gray-50 w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="assunto" className="text-sm font-medium text-gray-700">
                  Assunto
                </label>
                <input
                  id="assunto"
                  name="assunto"
                  type="text"
                  className="border rounded-md px-3 py-2 bg-gray-50 w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="mensagem" className="text-sm font-medium text-gray-700">
                  Sua mensagem <span className="text-red-600">(Obrigatório)</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  className="border rounded-md px-3 py-2 bg-gray-50 min-h-32 resize-y w-full"
                  required
                />
              </div>

              <div className="flex justify-start mt-4">
                <button
                  type="submit"
                  className="text-white px-6 py-3 rounded-md font-semibold disabled:opacity-50 bg-primary hover:bg-primary/70 transition-colors"
                  disabled={submitting}
                >
                  {submitting ? "Enviando..." : "ENVIAR"}
                </button>
              </div>
            </form>
        </section>
      </main>
    </main>
  )
}