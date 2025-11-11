import { useMemo, useRef, useState } from "react"
import { axiosClient } from "@/api/axiosClient"

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]

interface FormValues {
  nomeCompleto: string
  periodoCNSP: string
  email: string
  celular: string
  profissao: string
  genero: string
  depoimento: string
  foto: File | null
  honeypot: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type FeedbackState = {
  type: "success" | "error"
  message: string
} | null

const initialValues: FormValues = {
  nomeCompleto: "",
  periodoCNSP: "",
  email: "",
  celular: "",
  profissao: "",
  genero: "",
  depoimento: "",
  foto: null,
  honeypot: "",
}

export default function DepoimentosEgresso() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const isRequiredFilled = useMemo(() => {
    return (
      values.nomeCompleto.trim() &&
      values.depoimento.trim() &&
      values.foto instanceof File
    )
  }, [values])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    let error: string | undefined

    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        error = "A foto deve ter no máximo 5 MB."
      } else if (file.type && !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        error = "Formatos permitidos: JPG, PNG, WEBP, HEIC."
      }
    } else {
      error = "Envie sua foto."
    }

    setValues((prev) => ({ ...prev, foto: file }))
    setErrors((prev) => ({ ...prev, foto: error }))
  }

  const validate = () => {
    const nextErrors: FormErrors = {}
    if (!values.nomeCompleto.trim()) nextErrors.nomeCompleto = "Informe seu nome."
    if (!values.depoimento.trim()) nextErrors.depoimento = "Escreva o depoimento."
    if (!(values.foto instanceof File)) {
      nextErrors.foto = "Envie sua foto (até 5 MB)."
    } else {
      if (values.foto.size > MAX_IMAGE_SIZE) {
        nextErrors.foto = "A foto deve ter no máximo 5 MB."
      } else if (values.foto.type && !ACCEPTED_IMAGE_TYPES.includes(values.foto.type)) {
        nextErrors.foto = "Formatos permitidos: JPG, PNG, WEBP, HEIC."
      }
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const parseErrorMessage = (error: any) => {
    const defaultMessage = "Não foi possível enviar o depoimento. Verifique os dados e tente novamente."
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
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

    const formData = new FormData()
    formData.append("nome_completo", values.nomeCompleto.trim())
    formData.append("periodo_cnsp", values.periodoCNSP.trim())
    formData.append("email", values.email.trim())
    formData.append("celular", values.celular.trim())
    formData.append("profissao", values.profissao.trim())
    formData.append("genero", values.genero.trim())
    formData.append("depoimento", values.depoimento.trim())
    formData.append("_hp", values.honeypot.trim())
    if (values.foto) {
      formData.append("foto", values.foto)
    }

    setSubmitting(true)
    setFeedback(null)

    try {
      const { data } = await axiosClient.post("depoimentos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      setFeedback({
        type: "success",
        message: data?.message || "Depoimento enviado com sucesso!",
      })
      resetForm()
    } catch (error) {
      const message = parseErrorMessage(error)
      setFeedback({ type: "error", message })
      console.error("Erro ao enviar depoimento de egresso:", error)
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
            <input
              type="text"
              name="honeypot"
              value={values.honeypot}
              onChange={handleChange}
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
                <label htmlFor="nomeCompleto" className="text-sm font-medium text-gray-700">Nome completo</label>
                <input
                  id="nomeCompleto"
                  name="nomeCompleto"
                  type="text"
                  className={`border rounded-md px-3 py-2 ${errors.nomeCompleto ? "border-red-400" : ""}`}
                  value={values.nomeCompleto}
                  onChange={handleChange}
                  required
                />
                {errors.nomeCompleto && <span className="text-xs text-red-600">{errors.nomeCompleto}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="periodoCNSD" className="text-sm font-medium text-gray-700">Estou no CNSD no período de</label>
                <input
                  id="periodoCNSD"
                  name="periodoCNSP"
                  type="text"
                  className="border rounded-md px-3 py-2"
                  placeholder="Ex.: 2005 - 2012"
                  value={values.periodoCNSP}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="border rounded-md px-3 py-2"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="celular" className="text-sm font-medium text-gray-700">Celular</label>
                <input
                  id="celular"
                  name="celular"
                  type="tel"
                  className="border rounded-md px-3 py-2"
                  value={values.celular}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="profissao" className="text-sm font-medium text-gray-700">Profissão</label>
                <input
                  id="profissao"
                  name="profissao"
                  type="text"
                  className="border rounded-md px-3 py-2"
                  value={values.profissao}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="genero" className="text-sm font-medium text-gray-700">Gênero</label>
                <select
                  id="genero"
                  name="genero"
                  className="border rounded-md px-3 py-2"
                  value={values.genero}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                  <option value="prefiro_nao_informar">Prefiro não informar</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="depoimento" className="text-sm font-medium text-gray-700">Texto de depoimento</label>
                <textarea
                  id="depoimento"
                  name="depoimento"
                  className={`border rounded-md px-3 py-2 min-h-32 ${errors.depoimento ? "border-red-400" : ""}`}
                  value={values.depoimento}
                  onChange={handleChange}
                  required
                />
                {errors.depoimento && <span className="text-xs text-red-600">{errors.depoimento}</span>}
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="foto" className="text-sm font-medium text-gray-700">Foto</label>
                <input
                  id="foto"
                  name="foto"
                  type="file"
                  accept="image/*"
                  className={`border rounded-md px-3 py-2 ${errors.foto ? "border-red-400" : ""}`}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  required
                />
                {errors.foto && <span className="text-xs text-red-600">{errors.foto}</span>}
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md disabled:opacity-50" disabled={submitting || !isRequiredFilled}>
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