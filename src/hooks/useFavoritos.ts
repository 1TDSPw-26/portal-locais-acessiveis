import { useEffect, useState } from 'react'
import type { Local } from '../types/Local'
import {
  lerFavoritos,
  salvarFavoritos,
  type ErroStorage,
} from '../storage/favoritosStorage'

const MENSAGENS_ERRO: Record<ErroStorage, string> = {
  leitura:
    'Não foi possível ler seus favoritos salvos. O armazenamento pode estar indisponível neste navegador.',
  'dados-invalidos':
    'Alguns favoritos salvos estavam corrompidos e foram ignorados.',
  escrita:
    'Não foi possível salvar seus favoritos. As alterações valem apenas até você recarregar a página.',
}

export default function useFavoritos() {
  const [inicial] = useState(lerFavoritos)
  const [favoritos, setFavoritos] = useState<Local[]>(inicial.favoritos)
  const [erro, setErro] = useState<string | null>(
    inicial.erro ? MENSAGENS_ERRO[inicial.erro] : null,
  )

  useEffect(() => {
    // ainda é o que veio do storage: não regrava (evita apagar dados
    // quando a leitura falhou ou estava inválida)
    if (favoritos === inicial.favoritos) return

    const resultado = salvarFavoritos(favoritos)

    if (!resultado.ok) {
      // eslint-disable-next-line react/set-state-in-effect
      setErro(MENSAGENS_ERRO[resultado.erro])
      return
    }

    // eslint-disable-next-line react/set-state-in-effect
    setErro(null)
    window.dispatchEvent(new Event('favoritos-atualizados'))
  }, [favoritos, inicial])

  useEffect(() => {
    function atualizarFavoritos() {
      const { favoritos: salvos, erro: erroLeitura } = lerFavoritos()

      // leitura indisponível: mantém o que já está na tela
      if (erroLeitura === 'leitura') return

      setFavoritos((atuais) =>
        JSON.stringify(atuais) === JSON.stringify(salvos) ? atuais : salvos,
      )
    }

    window.addEventListener('favoritos-atualizados', atualizarFavoritos)
    return () => {
      window.removeEventListener('favoritos-atualizados', atualizarFavoritos)
    }
  }, [])

  function ehFavorito(id: number): boolean {
    return favoritos.some((local) => local.id === id)
  }

  function adicionarFavorito(local: Local): void {
    setFavoritos((atuais) =>
      atuais.some((item) => item.id === local.id) ? atuais : [...atuais, local],
    )
  }

  function removerFavorito(id: number): void {
    setFavoritos((atuais) => atuais.filter((local) => local.id !== id))
  }

  function alternarFavorito(local: Local): void {
    if (ehFavorito(local.id)) {
      removerFavorito(local.id)
    } else {
      adicionarFavorito(local)
    }
  }

  function limparErro(): void {
    setErro(null)
  }

  return {
    favoritos,
    erro,
    limparErro,
    ehFavorito,
    adicionarFavorito,
    removerFavorito,
    alternarFavorito,
  }
}