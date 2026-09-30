import { useEffect, useState } from "react"
import LocalCard from "../../components/LocalCard"
import { buscarLocais } from "../../services/localService"
import type { Local } from "../../types/types"

function Locais() {
  const [locais, setLocais] = useState<Local[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")

  useEffect(() => {
    async function carregarLocais() {
      try {
        setCarregando(true)
        setErro("")

        const dados = await buscarLocais()

        setLocais(dados)
      } catch {
        setErro("Não foi possível carregar os locais.")
      } finally {
        setCarregando(false)
      }
    }

    carregarLocais()
  }, [])

  if (carregando) {
    return (
      <section>
        <h2>Locais</h2>

        <p className="mt-4">
          Carregando locais...
        </p>
      </section>
    )
  }

  if (erro) {
    return (
      <section>
        <h2>Locais</h2>

        <p className="mt-4">
          {erro}
        </p>
      </section>
    )
  }

  return (
    <section>
      <h2>Locais</h2>

      <p className="mt-2">
        Encontre locais acessíveis.
      </p>

      <p className="mt-4">
        {locais.length} local(is) encontrado(s)
      </p>

      {locais.length === 0 ? (
        <p className="mt-4">
          Nenhum local encontrado.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locais.map((local) => (
            <LocalCard
              key={local.id}
              local={local}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Locais