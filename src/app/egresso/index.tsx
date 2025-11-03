import { useState } from "react"

export default function Egresso() {
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
      console.log("Egresso form:", data)
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
          <h1>Egresso</h1>
          <div className="space-y-3 text-gray-700">
            <p>Querido egresso,</p>
            <p>Queremos saber de você! Saber como você está, saber de sua história…</p>
            <p>Preencha o formulário abaixo, para que possamos mantê-lo atualizado das atividades que acontecem no CNSD. E aproveite para deixar o seu depoimento!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Informações Pessoais */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary mb-10">Informações pessoais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nomeCompleto" className="text-sm font-medium text-gray-700">Nome completo</label>
                  <input id="nomeCompleto" name="nomeCompleto" type="text" className="border rounded-md px-3 py-2" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="dataNascimento" className="text-sm font-medium text-gray-700">Data de nascimento</label>
                  <input id="dataNascimento" name="dataNascimento" type="date" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="telefone" className="text-sm font-medium text-gray-700">Telefone</label>
                  <input id="telefone" name="telefone" type="tel" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="celular" className="text-sm font-medium text-gray-700">Celular</label>
                  <input id="celular" name="celular" type="tel" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="facebook" className="text-sm font-medium text-gray-700">Facebook</label>
                  <input id="facebook" name="facebook" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="instagram" className="text-sm font-medium text-gray-700">Instagram</label>
                  <input id="instagram" name="instagram" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
                  <input id="email" name="email" type="email" className="border rounded-md px-3 py-2" />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary my-10">Endereço</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="cep" className="text-sm font-medium text-gray-700">CEP</label>
                  <input id="cep" name="cep" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="logradouro" className="text-sm font-medium text-gray-700">Logradouro</label>
                  <input id="logradouro" name="logradouro" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="numero" className="text-sm font-medium text-gray-700">Número</label>
                  <input id="numero" name="numero" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="complemento" className="text-sm font-medium text-gray-700">Complemento</label>
                  <input id="complemento" name="complemento" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="bairro" className="text-sm font-medium text-gray-700">Bairro</label>
                  <input id="bairro" name="bairro" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="cidade" className="text-sm font-medium text-gray-700">Cidade</label>
                  <input id="cidade" name="cidade" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="estado" className="text-sm font-medium text-gray-700">Estado</label>
                  <input id="estado" name="estado" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="pais" className="text-sm font-medium text-gray-700">País</label>
                  <input id="pais" name="pais" type="text" className="border rounded-md px-3 py-2" />
                </div>
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary my-10">Informações adicionais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="profissao" className="text-sm font-medium text-gray-700">Profissão</label>
                  <input id="profissao" name="profissao" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="trabalhoAtual" className="text-sm font-medium text-gray-700">Onde trabalha atualmente</label>
                  <input id="trabalhoAtual" name="trabalhoAtual" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label htmlFor="periodoCNSD" className="text-sm font-medium text-gray-700">Período em que estudou no CNSD</label>
                  <input id="periodoCNSD" name="periodoCNSD" type="text" className="border rounded-md px-3 py-2" placeholder="Ex.: 2005 - 2012" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label htmlFor="citacaoFuncionarios" className="text-sm font-medium text-gray-700">Cite algum(uns) funcionário(s) e seu(s) respectivo(s) cargo(s) que de alguma maneira marcou(aram) sua passagem pelo CNSD</label>
                  <textarea id="citacaoFuncionarios" name="citacaoFuncionarios" className="border rounded-md px-3 py-2 min-h-28" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label htmlFor="historia" className="text-sm font-medium text-gray-700">Conte alguma história, lembrança ou fato marcante da sua fase de estudante no CNSD</label>
                  <textarea id="historia" name="historia" className="border rounded-md px-3 py-2 min-h-28" />
                  <p className="italic text-sm text-gray-600">Tem algum amigo ou ex-colega que também tenha estudado no CNSD e que poderíamos entrar em contato?</p>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="amigoNome" className="text-sm font-medium text-gray-700">Nome</label>
                  <input id="amigoNome" name="amigoNome" type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="amigoTelefone" className="text-sm font-medium text-gray-700">Telefone</label>
                  <input id="amigoTelefone" name="amigoTelefone" type="tel" className="border rounded-md px-3 py-2" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label htmlFor="amigoEmail" className="text-sm font-medium text-gray-700">E-mail</label>
                  <input id="amigoEmail" name="amigoEmail" type="email" className="border rounded-md px-3 py-2" />
                </div>
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