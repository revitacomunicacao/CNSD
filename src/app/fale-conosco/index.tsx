import { useState } from "react"
import faleConoscoImg from "@/assets/fale-conosco-v2.jpg"
import { axiosClient } from "@/api/axiosClient"
import useSeo from "@/hooks/useSeo"

interface FormValues {
  nome: string
  email: string
  telefone: string
  assunto: string
  mensagem: string
  honeypot: string
}

type FeedbackState = {
  type: "success" | "error"
  message: string
} | null

const initialValues: FormValues = {
  nome: "",
  email: "",
  telefone: "",
  assunto: "",
  mensagem: "",
  honeypot: "",
}

type FormErrors = Partial<Record<keyof FormValues, string>>

export default function FaleConosco() {
  useSeo({
    title: "Fale Conosco - CNSD",
    description: "Entre em contato com o Colégio Nossa Senhora das Dores",
  })

  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState>(null)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const nextErrors: FormErrors = {}
    if (!values.nome.trim()) nextErrors.nome = "Informe seu nome."
    if (!values.email.trim()) nextErrors.email = "Informe um e-mail válido."
    if (!values.telefone.trim()) nextErrors.telefone = "Informe seu telefone."
    if (!values.mensagem.trim()) nextErrors.mensagem = "Escreva sua mensagem."
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const parseErrorMessage = (error: any) => {
    const defaultMessage = "Não foi possível enviar o formulário. Verifique os dados e tente novamente."
    const responseData = error?.response?.data
    if (!responseData) return defaultMessage
    const rawMessage = responseData.message
    if (typeof rawMessage === "string") return rawMessage
    try {
      return JSON.stringify(responseData)
    } catch {
      return defaultMessage
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (values.honeypot.trim()) {
      return
    }

    if (!validate()) {
      setFeedback({ type: "error", message: "Verifique os campos obrigatórios." })
      return
    }

    const payload = new FormData()
    payload.append("nome", values.nome.trim())
    payload.append("email", values.email.trim())
    payload.append("telefone", values.telefone.trim())
    payload.append("assunto", values.assunto.trim())
    payload.append("mensagem", values.mensagem.trim())
    payload.append("_hp", values.honeypot.trim())

    setSubmitting(true)
    setFeedback(null)

    try {
      const { data } = await axiosClient.post("fale-conosco", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setFeedback({
        type: "success",
        message: data?.message || "Mensagem enviada com sucesso.",
      })
      resetForm()
    } catch (error) {
      const message = parseErrorMessage(error)
      setFeedback({ type: "error", message })
      console.error("Erro ao enviar formulário Fale Conosco:", error)
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
              <input
                type="text"
                name="honeypot"
                value={values.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {feedback?.type === "error" && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {feedback.message}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                  Seu nome <span className="text-red-600">(Obrigatório)</span>
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  className={`border rounded-md px-3 py-2 bg-gray-50 w-full ${errors.nome ? "border-red-400" : ""}`}
                  value={values.nome}
                  onChange={handleChange}
                  required
                />
                {errors.nome && <span className="text-xs text-red-600">{errors.nome}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Seu e-mail <span className="text-red-600">(Obrigatório)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`border rounded-md px-3 py-2 bg-gray-50 w-full ${errors.email ? "border-red-400" : ""}`}
                  value={values.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                  Seu telefone <span className="text-red-600">(Obrigatório)</span>
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  className={`border rounded-md px-3 py-2 bg-gray-50 w-full ${errors.telefone ? "border-red-400" : ""}`}
                  value={values.telefone}
                  onChange={handleChange}
                  required
                />
                {errors.telefone && <span className="text-xs text-red-600">{errors.telefone}</span>}
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
                  value={values.assunto}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="mensagem" className="text-sm font-medium text-gray-700">
                  Sua mensagem <span className="text-red-600">(Obrigatório)</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  className={`border rounded-md px-3 py-2 bg-gray-50 min-h-32 resize-y w-full ${errors.mensagem ? "border-red-400" : ""}`}
                  value={values.mensagem}
                  onChange={handleChange}
                  required
                />
                {errors.mensagem && <span className="text-xs text-red-600">{errors.mensagem}</span>}
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
          {feedback?.type === "success" && (
            <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {feedback.message}
            </div>
          )}
        </section>
      </main>
    </main>
  )
}