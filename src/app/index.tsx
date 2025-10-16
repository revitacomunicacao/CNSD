import { useContent } from "@/hooks/useContent"
import useSeo from "@/hooks/useSeo"
import { IHome } from "./home/types"

export default function HomePage() {
  useSeo({
    title: "Home",
    description: "Home",
    image: "https://via.placeholder.com/150",
    icon: "https://via.placeholder.com/150",  
  })

  const { data : home,loading,error } = useContent<IHome>('/home')
  console.log(home)
  console.log("oi")
  if(loading) return "carregando"
  return (
    <main style={{ padding: 20 }}>
      {home.map(({banners,id,title})=>(
        <div>
          {title}     
        </div>
      ))}
    </main>
  )
}
