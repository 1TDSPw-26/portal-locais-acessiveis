import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfirmDialog from './ConfirmDialog'

function renderDialog(props: Partial<Parameters<typeof ConfirmDialog>[0]> = {}) {
  const onConfirmar = vi.fn()
  const onCancelar = vi.fn()

  const view = render(
    <ConfirmDialog
      aberto
      titulo="Excluir local?"
      onConfirmar={onConfirmar}
      onCancelar={onCancelar}
      {...props}
    >
      Esta ação não pode ser desfeita.
    </ConfirmDialog>,
  )

  return { onConfirmar, onCancelar, unmount: view.unmount }
}

describe('ConfirmDialog', () => {
  it('não renderiza o diálogo nem disponibiliza controles quando fechado', () => {
    renderDialog({ aberto: false })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('abre como modal e expõe nome e descrição acessíveis', () => {
    renderDialog()
    const dialog = screen.getByRole('dialog', { name: 'Excluir local?' })

    expect(dialog).toHaveAttribute('aria-labelledby')
    expect(dialog).toHaveAccessibleDescription('Esta ação não pode ser desfeita.')
    expect(dialog).toHaveAttribute('open')
  })

  it('move o foco inicial para Cancelar e retorna o foco ao elemento de abertura', async () => {
    const user = userEvent.setup()
    const abrir = document.createElement('button')
    abrir.type = 'button'
    abrir.textContent = 'Abrir confirmação'
    document.body.append(abrir)
    abrir.focus()

    const { unmount } = renderDialog()
    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveFocus()

    unmount()
    expect(abrir).toHaveFocus()

    await user.click(abrir)
    abrir.remove()
  })

  it('expõe os nomes acessíveis personalizados dos botões', () => {
    renderDialog({ textoConfirmar: 'Remover local', textoCancelar: 'Manter local' })

    expect(screen.getByRole('button', { name: 'Remover local' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Manter local' })).toBeVisible()
  })

  it('dispara confirmação e cancelamento uma única vez pelos botões', async () => {
    const user = userEvent.setup()
    const { onConfirmar, onCancelar } = renderDialog()

    await user.click(screen.getByRole('button', { name: 'Excluir' }))
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(onConfirmar).toHaveBeenCalledOnce()
    expect(onCancelar).toHaveBeenCalledOnce()
  })

  it('cancela com a tecla Escape e impede o fechamento nativo', () => {
    const { onCancelar } = renderDialog()
    const dialog = screen.getByRole('dialog')
    const evento = new Event('cancel', { cancelable: true })

    fireEvent(dialog, evento)

    expect(evento.defaultPrevented).toBe(true)
    expect(onCancelar).toHaveBeenCalledOnce()
  })

  it('cancela ao clicar no fundo do diálogo', () => {
    const { onCancelar } = renderDialog()
    const dialog = screen.getByRole('dialog')

    fireEvent.click(dialog)

    expect(onCancelar).toHaveBeenCalledOnce()
  })

  it('não permite confirmação ou cancelamento durante o processamento', async () => {
    const user = userEvent.setup()
    const { onConfirmar, onCancelar } = renderDialog({ processando: true })

    const confirmar = screen.getByRole('button', { name: 'Excluindo…' })
    const cancelar = screen.getByRole('button', { name: 'Cancelar' })

    expect(confirmar).toBeDisabled()
    expect(cancelar).toBeDisabled()

    await user.click(confirmar)
    await user.click(cancelar)
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }))

    expect(onConfirmar).not.toHaveBeenCalled()
    expect(onCancelar).not.toHaveBeenCalled()
  })
})
