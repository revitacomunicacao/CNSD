import { useContent } from "@/hooks/useContent"
import { IHistoria } from "./types/IHistoria"

export default function NossaHistoria() {
  const { data: historia, loading, error, refetch } = useContent<IHistoria>('o-colegio/nossa-historia')
  console.log(historia)
  return(
    <main>
      <section className="w-[1400px] flex justify-center">
        <div className="flex flex-col">
        </div>

        <div>

        </div>
      </section>
    </main>
  )
}