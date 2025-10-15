import useSeo from "@/hooks/useSeo"

export default function HomePage() {
  useSeo({
    title: "Home",
    description: "Home",
    image: "https://via.placeholder.com/150",
    icon: "https://via.placeholder.com/150",  
  })
  return (
    <main style={{ padding: 20 }}>
      <h1>Bem‑vindo ao Template React</h1>
      <p>Use este projeto como base para seus sites institucionais.</p>
    </main>
  )
}
