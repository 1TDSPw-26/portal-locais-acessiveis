import { useEffect, useId, useRef } from 'react'
import type { MouseEvent, ReactNode, SyntheticEvent } from 'react'

type ConfirmDialogProps = {
  aberto: boolean
  titulo: string
  children: ReactNode
  textoConfirmar?: string
  textoCancelar?: string
  processando?: boolean
  onConfirmar: () => void
  onCancelar: () => void
}

/**
 * Diálogo modal de confirmação baseado no <dialog> nativo.
 * - showModal() garante foco preso no diálogo e fundo inerte;
 * - Esc ou clique fora cancelam;
 * - o foco inicial vai para "Cancelar", a opção segura em ações destrutivas;
 * - ao fechar, o foco volta para o elemento que abriu o diálogo.
 */
export default function ConfirmDialog({
  aberto,
  titulo,
  children,
  textoConfirmar = 'Excluir',
  textoCancelar = 'Cancelar',
  processando = false,
  onConfirmar,
  onCancelar,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const cancelarRef = useRef<HTMLButtonElement>(null)
  const tituloId = useId()
  const descricaoId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !aberto) return

    const elementoAnterior = document.activeElement as HTMLElement | null

    if (!dialog.open) dialog.showModal()
    cancelarRef.current?.focus()

    return () => {
      if (dialog.open) dialog.close()
      elementoAnterior?.focus?.()
    }
  }, [aberto])

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    // Esc: o fechamento é controlado pelo estado do componente pai.
    event.preventDefault()
    if (!processando) onCancelar()
  }

  function handleClickFundo(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current && !processando) onCancelar()
  }

  if (!aberto) return null

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={tituloId}
      aria-describedby={descricaoId}
      onCancel={handleCancel}
      onClick={handleClickFundo}
      className="m-auto w-[min(28rem,calc(100%-2rem))] rounded-lg border border-border-subtle bg-white p-0 text-gray-900 shadow-xl backdrop:bg-black/50"
    >
      <div className="flex flex-col gap-4 p-6">
        <h2 id={tituloId} className="text-lg font-bold">
          {titulo}
        </h2>

        <div id={descricaoId} className="text-sm leading-relaxed">
          {children}
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={cancelarRef}
            type="button"
            onClick={onCancelar}
            disabled={processando}
            className="min-h-11 rounded-md border border-gray-400 px-5 text-sm font-bold text-gray-900 hover:bg-gray-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:opacity-60"
          >
            {textoCancelar}
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            disabled={processando}
            className="min-h-11 rounded-md bg-red-700 px-5 text-sm font-bold text-white hover:bg-red-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:opacity-60"
          >
            {processando ? 'Excluindo…' : textoConfirmar}
          </button>
        </div>
      </div>
    </dialog>
  )
}
