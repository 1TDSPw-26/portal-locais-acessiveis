import { useEffect, useId } from 'react'
import type { ReactNode } from 'react'

export type TipoNotificacao = 'sucesso' | 'aviso' | 'erro'

type NotificacaoProps = {
  tipo: TipoNotificacao
  titulo: string
  children?: ReactNode
  conteudo?: ReactNode
  duracao?: number
  aoFechar?: () => void
}

const configuracoes = {
  sucesso: {
    rotulo: 'Sucesso',
    icone: '✓',
    classes: 'border-green-700 bg-green-50 text-green-950',
  },
  aviso: {
    rotulo: 'Aviso',
    icone: '!',
    classes: 'border-yellow-700 bg-yellow-50 text-yellow-950',
  },
  erro: {
    rotulo: 'Erro',
    icone: '×',
    classes: 'border-red-700 bg-red-50 text-red-950',
  },
} as const

export default function Notificacao({
  tipo,
  titulo,
  children,
  conteudo,
  duracao = 5000,
  aoFechar,
}: NotificacaoProps) {
  const tituloId = useId()
  const configuracao = configuracoes[tipo]
  const papel = tipo === 'sucesso' ? 'status' : 'alert'

  useEffect(() => {
    if (!aoFechar || duracao <= 0) return
    const temporizador = window.setTimeout(aoFechar, duracao)
    return () => window.clearTimeout(temporizador)
  }, [aoFechar, duracao])

  return (
    <div
      role={papel}
      aria-live={tipo === 'erro' ? 'assertive' : 'polite'}
      aria-labelledby={tituloId}
      className={`flex items-start gap-3 rounded-md border-l-4 p-4 shadow-md ${configuracao.classes}`}
    >
      <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-current font-bold">
        {configuracao.icone}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wide">{configuracao.rotulo}</p>
        <h2 id={tituloId} className="font-bold">{titulo}</h2>
        {(children || conteudo) && <div className="mt-1 text-sm">{children ?? conteudo}</div>}
      </div>
      {aoFechar && (
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar notificação"
          className="min-h-11 min-w-11 rounded-md p-2 text-xl font-bold leading-none hover:bg-black/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  )
}
