import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfirmDialog from './ConfirmDialog'

function renderDialog(props: Partial<Parameters<typeof ConfirmDialog>[0]> = {}) {
  const onConfirmar = vi.fn()
  const onCancelar = vi.fn()

  render(
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

  return { onConfirmar, onCancelar }
}

describe('ConfirmDialog', () => {
  it('não renderiza nada quando fechado', () => {
    renderDialog({ aberto: false })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('expõe nome e descrição acessíveis e foca em Cancelar', () => {
    renderDialog()
    const dialog = screen.getByRole('dialog', { name: 'Excluir local?' })

    expect(dialog).toHaveAccessibleDescription('Esta ação não pode ser desfeita.')
    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveFocus()
  })

  it('chama onConfirmar e onCancelar pelos botões', async () => {
    const user = userEvent.setup()
    const { onConfirmar, onCancelar } = renderDialog()

    await user.click(screen.getByRole('button', { name: 'Excluir' }))
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(onConfirmar).toHaveBeenCalledOnce()
    expect(onCancelar).toHaveBeenCalledOnce()
  })

  it('cancela com a tecla Esc (evento cancel do dialog)', () => {
    const { onCancelar } = renderDialog()
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }))
    expect(onCancelar).toHaveBeenCalledOnce()
  })

  it('desabilita os botões enquanto processa', () => {
    renderDialog({ processando: true })
    expect(screen.getByRole('button', { name: 'Excluindo…' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDisabled()
  })
})
