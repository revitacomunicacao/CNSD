import useSeo from "@/hooks/useSeo"

export default function AboutPage() {
  useSeo({
    title: "Sobre Nós",
    description: "Sobre Nós",
    image: "https://via.placeholder.com/150",
    icon: "https://via.placeholder.com/150",
  })
  return (
    <main style={{ padding: 20 }}>
      <h1>Sobre Nós</h1>
      <p>
        Aqui você coloca informações institucionais, missão, visão e valores.
      </p>
    </main>
  )
}
