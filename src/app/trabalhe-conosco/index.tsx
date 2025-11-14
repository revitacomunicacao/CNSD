import { useMemo, useRef, useState } from "react"
import { axiosClient } from "@/api/axiosClient"
import useSeo from "@/hooks/useSeo"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ACCEPTED_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

interface FormValues {
  nome: string
  email: string
  tipoCurriculo: string
  facebook: string
  linkedin: string
  resumo: string
  mensagem: string
  curriculo: File | null
  honeypot: string
}

type FeedbackState = {
  type: "success" | "error"
  message: string
} | null

type FormErrors = Partial<Record<keyof FormValues, string>> & { geral?: string }

const initialValues: FormValues = {
  nome: "",
  email: "",
  tipoCurriculo: "",
  facebook: "",
  linkedin: "",
  resumo: "",
  mensagem: "",
  curriculo: null,
  honeypot: "",
}

const tipoCurriculoOptions = [
  {
    value: "estagiario",
    label:
      "Estagiário — Melhor opção para quem cursa o Ensino Médio, Técnico ou Superior e está em busca de estágio",
  },
  {
    value: "operacional",
    label:
      "Operacional — Adequado para cargos operacionais, tais como: Administrativo, Financeiro, Recepção, Disciplinares e Serviços Gerais",
  },
  {
    value: "pcd",
    label:
      "PcD — Voltado para pessoas com deficiência física, auditiva, visual, mental ou múltipla",
  },
  {
    value: "profissional",
    label:
      "Profissional — Indicação para profissionais com ou sem formação superior, recém-formados ou no último ano de graduação",
  },
]

export default function TrabalheConosco() {
  useSeo({
    title: "Trabalhe Conosco - CNSD",
    description: "Venha fazer parte da equipe do Colégio Nossa Senhora das Dores",
  })

  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const isRequiredFilled = useMemo(() => {
    return (
      values.nome.trim() &&
      values.email.trim() &&
      values.tipoCurriculo.trim() &&
      values.resumo.trim() &&
      values.mensagem.trim() &&
      values.curriculo instanceof File
    )
  }, [values])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined, geral: undefined }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    let error: string | undefined

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        error = "O arquivo deve ter no máximo 5 MB."
      } else if (!ACCEPTED_TYPES.includes(file.type)) {
        error = "Tipos permitidos: PDF, DOC ou DOCX."
      }
    } else {
      error = "Anexe seu currículo."
    }

    setValues((prev) => ({ ...prev, curriculo: file }))
    setErrors((prev) => ({ ...prev, curriculo: error, geral: undefined }))
  }

  const validate = () => {
    const nextErrors: FormErrors = {}

    if (!values.nome.trim()) nextErrors.nome = "Informe seu nome completo."
    if (!values.email.trim()) nextErrors.email = "Informe um e-mail válido."
    if (!values.tipoCurriculo.trim()) nextErrors.tipoCurriculo = "Selecione um tipo de currículo."
    if (!values.resumo.trim()) nextErrors.resumo = "Descreva seu resumo profissional."
    if (!values.mensagem.trim()) nextErrors.mensagem = "Escreva uma mensagem."

    if (!(values.curriculo instanceof File)) {
      nextErrors.curriculo = "Anexe seu currículo em PDF, DOC ou DOCX (máx. 5 MB)."
    } else {
      if (values.curriculo.size > MAX_FILE_SIZE) {
        nextErrors.curriculo = "O arquivo deve ter no máximo 5 MB."
      } else if (!ACCEPTED_TYPES.includes(values.curriculo.type)) {
        nextErrors.curriculo = "Tipos permitidos: PDF, DOC ou DOCX."
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const parseErrorMessage = (error: any) => {
    const defaultMessage = "Não foi possível enviar o formulário. Verifique os dados e tente novamente."

    const responseData = error?.response?.data
    if (!responseData) return defaultMessage

    const rawMessage = responseData.message
    if (typeof rawMessage === "string") return rawMessage
    if (rawMessage && typeof rawMessage === "object") {
      const mainMessage = typeof rawMessage.message === "string" ? rawMessage.message : ""
      const fields = Array.isArray(rawMessage.fields) ? rawMessage.fields : []
      if (mainMessage || fields.length) {
        const fieldsMsg = fields.length ? ` Campos: ${Object.keys(fields).join(", ")}.` : ""
        return `${mainMessage}${fieldsMsg}`.trim() || defaultMessage
      }
      try {
        return JSON.stringify(rawMessage)
      } catch {
        /* noop */
      }
    }

    const nestedMessage = responseData?.message?.message
    if (typeof nestedMessage === "string") {
      return nestedMessage
    }

    const params = responseData?.data?.params
    if (Array.isArray(params) && params.length) {
      return `${defaultMessage} Campos: ${params.join(", ")}.`
    }

    try {
      return JSON.stringify(responseData)
    } catch {
      return defaultMessage
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (values.honeypot.trim()) {
      return
    }

    if (!validate()) {
      setFeedback({ type: "error", message: "Verifique os campos destacados e tente novamente." })
      return
    }

    const formData = new FormData()
    formData.append("nome", values.nome.trim())
    formData.append("email", values.email.trim())
    formData.append("tipo_curriculo", values.tipoCurriculo.trim())
    formData.append("resumo_profissional", values.resumo.trim())
    formData.append("mensagem", values.mensagem.trim())
    formData.append("_hp", values.honeypot.trim())

    if (values.facebook.trim()) formData.append("facebook", values.facebook.trim())
    if (values.linkedin.trim()) formData.append("linkedin", values.linkedin.trim())
    if (values.curriculo) formData.append("curriculo", values.curriculo)

    setSubmitting(true)
    setFeedback(null)

    try {
      const { data } = await axiosClient.post("trabalhe-conosco", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setFeedback({
        type: "success",
        message: data?.message || "Formulário enviado com sucesso.",
      })
      resetForm()
    } catch (error) {
      const message = parseErrorMessage(error)
      setFeedback({ type: "error", message })
      console.error("Erro ao enviar formulário Trabalhe Conosco:", error)
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
            <p>
              O Colégio Nossa Senhora das Dores acredita na excelência acadêmica e formação integral do ser e busca pessoas capazes de contribuir com a instituição, para que ela permaneça reconhecida por seus valores e proposta pedagógica.
            </p>
            <p>Venha fazer parte dessa história!</p>
            <p>Seu currículo será mantido em nosso banco de dados durante um ano para futuras oportunidades.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <input
              type="text"
              name="honeypot"
              value={values.honeypot}
              onChange={handleInputChange}
              className="hidden"
              autoComplete="off"
              tabIndex={-1}
            />

            {feedback?.type === "error" && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {feedback.message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                  Seu nome <span className="text-red-600">(Obrigatório)</span>
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  className={`border rounded-md px-3 py-2 ${errors.nome ? "border-red-400" : ""}`}
                  value={values.nome}
                  onChange={handleInputChange}
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
                  className={`border rounded-md px-3 py-2 ${errors.email ? "border-red-400" : ""}`}
                  value={values.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="tipoCurriculo" className="text-sm font-medium text-gray-700">
                  Tipos de currículo <span className="text-red-600">(Obrigatório)</span>
                </label>
                <select
                  id="tipoCurriculo"
                  name="tipoCurriculo"
                  className={`border rounded-md px-3 py-2 ${errors.tipoCurriculo ? "border-red-400" : ""}`}
                  value={values.tipoCurriculo}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione uma opção</option>
                  {tipoCurriculoOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.tipoCurriculo && <span className="text-xs text-red-600">{errors.tipoCurriculo}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="facebook" className="text-sm font-medium text-gray-700">
                  Facebook
                </label>
                <input
                  id="facebook"
                  name="facebook"
                  type="text"
                  className="border rounded-md px-3 py-2"
                  value={values.facebook}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="linkedin" className="text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <input
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  className="border rounded-md px-3 py-2"
                  value={values.linkedin}
                  onChange={handleInputChange}
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="resumo" className="text-sm font-medium text-gray-700">
                  Resumo Profissional <span className="text-red-600">(Obrigatório)</span>
                </label>
                <textarea
                  id="resumo"
                  name="resumo"
                  className={`border rounded-md px-3 py-2 min-h-28 ${errors.resumo ? "border-red-400" : ""}`}
                  value={values.resumo}
                  onChange={handleInputChange}
                  required
                />
                {errors.resumo && <span className="text-xs text-red-600">{errors.resumo}</span>}
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="mensagem" className="text-sm font-medium text-gray-700">
                  Sua mensagem <span className="text-red-600">(Obrigatório)</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  className={`border rounded-md px-3 py-2 min-h-28 ${errors.mensagem ? "border-red-400" : ""}`}
                  value={values.mensagem}
                  onChange={handleInputChange}
                  required
                />
                {errors.mensagem && <span className="text-xs text-red-600">{errors.mensagem}</span>}
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="curriculo" className="text-sm font-medium text-gray-700">
                  Anexar currículo <span className="text-red-600">(Obrigatório — PDF, DOC ou DOCX até 5 MB)</span>
                </label>
                <input
                  id="curriculo"
                  name="curriculo"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className={`border rounded-md px-3 py-2 ${errors.curriculo ? "border-red-400" : ""}`}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  required
                />
                {errors.curriculo && <span className="text-xs text-red-600">{errors.curriculo}</span>}
              </div>
            </div>

            <div className="flex gap-4 my-10">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md disabled:opacity-50"
                disabled={submitting || !isRequiredFilled}
              >
                {submitting ? "Enviando..." : "Enviar"}
              </button>
              <button
                type="button"
                className="border border-gray-300 px-6 py-2 rounded-md"
                onClick={resetForm}
                disabled={submitting}
              >
                Limpar
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