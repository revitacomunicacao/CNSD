import { useContent } from "@/hooks/useContent"
import { ISecretariaAcademica } from "./types/ISecretariaAcademica"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { axiosClient } from "@/api/axiosClient"

interface FormData {
  nome: string
  email: string
  celular: string
  segmento: string
  honeypot: string
}

interface FormErrors {
  nome?: string
  email?: string
  celular?: string
  segmento?: string
}

export default function SecretariaDigital() {
  const { data: secretaria, loading, error, refetch } = useContent<ISecretariaAcademica>("o-colegio/secretaria-academica")
  
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    celular: "",
    segmento: "",
    honeypot: ""
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const formatPhone = (value: string) => {
    const numbers = 
    value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3')
        .replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3')
        .replace(/^(\d{2})(\d{0,5})/, '($1) $2')
        .replace(/^(\d*)/, '$1')
    }
    return value
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'celular') {
      setFormData(prev => ({ ...prev, [name]: formatPhone(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Limpa o erro do campo ao digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    // Validação do nome
    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório"
    }
    
    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido"
    }
    
    // Validação do celular
    const phoneNumbers = formData.celular.replace(/\D/g, '')
    if (!formData.celular.trim()) {
      newErrors.celular = "Celular é obrigatório"
    } else if (phoneNumbers.length !== 11) {
      newErrors.celular = "Celular deve ter 11 dígitos"
    }
    
    // Validação do segmento
    if (!formData.segmento) {
      newErrors.segmento = "Selecione um segmento"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Proteção anti-spam
    if (formData.honeypot) {
      return
    }
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitMessage(null)
    
    try {
      await axiosClient.post('/contact', formData)
      
      setSubmitMessage({
        type: 'success',
        text: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
      })
      
      // Limpa o formulário
      setFormData({
        nome: "",
        email: "",
        celular: "",
        segmento: "",
        honeypot: ""
      })
    } catch (err) {
      setSubmitMessage({
        type: 'error',
        text: 'Erro ao enviar mensagem. Por favor, tente novamente.'
      })
      console.error('Erro ao enviar formulário:', err)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return(
    <main>
      {secretaria.map(({ 
        conteudo,
        foto,
        id,
        matricula,
        title,
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
            <div>
              <h1 className="text-primary text-[28px] md:text-[32px] font-bold">
                Matrícula
              </h1>
              <div dangerouslySetInnerHTML={{ __html:matricula }} />
            </div>
            {/* FORMULÁRIO */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex flex-col justify-center items-center text-center mb-6">
                <h1 className="text-3xl font-bold text-primary">Precisa de mais informações?</h1>
                <h2 className="text-2xl text-gray-700">Deixe seus dados que entraremos em contato!</h2>
              </div>
              
              {submitMessage && (
                <div className={`p-4 mb-6 rounded-md ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {submitMessage.text}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
                {/* Campo Honeypot - oculto para evitar spam */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="nome" className="font-medium text-gray-700">
                    Nome*
                  </label>
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                    aria-invalid={!!errors.nome}
                  />
                  {errors.nome && (
                    <span className="text-sm text-red-600">{errors.nome}</span>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-medium text-gray-700">
                    Email*
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-600">{errors.email}</span>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="celular" className="font-medium text-gray-700">
                    Celular*
                  </label>
                  <Input
                    id="celular"
                    name="celular"
                    type="tel"
                    value={formData.celular}
                    onChange={handleInputChange}
                    placeholder="(11) 98888-7777"
                    maxLength={15}
                    aria-invalid={!!errors.celular}
                  />
                  {errors.celular && (
                    <span className="text-sm text-red-600">{errors.celular}</span>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="segmento" className="font-medium text-gray-700">
                    Segmento de Interesse*
                  </label>
                  <select
                    id="segmento"
                    name="segmento"
                    value={formData.segmento}
                    onChange={handleInputChange}
                    className="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                    aria-invalid={!!errors.segmento}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="Educação Infantil">Educação Infantil</option>
                    <option value="Ensino Fundamental I">Ensino Fundamental I</option>
                    <option value="Ensino Fundamental II">Ensino Fundamental II</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                  </select>
                  {errors.segmento && (
                    <span className="text-sm text-red-600">{errors.segmento}</span>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
            </div>
          </section>
        </main>
      ))}
    </main>
  )
}