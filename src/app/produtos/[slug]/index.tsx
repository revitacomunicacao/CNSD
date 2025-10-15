import useSeo from "@/hooks/useSeo"
import { useParams } from 'react-router-dom'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  useSeo({
    title: "Produto: " + slug,
    description: "Produto: " + slug,
    image: "https://via.placeholder.com/150",
    icon: "https://via.placeholder.com/150",
  })
  return (
    <main style={{ padding: 20 }}>
      <h1>Produto: {slug}</h1>
      <p>Detalhes do produto <strong>{slug}</strong> vão aqui.</p>
    </main>
  )
}
