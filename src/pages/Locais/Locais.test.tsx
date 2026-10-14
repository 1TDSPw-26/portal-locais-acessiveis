import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Locais from './Locais'
import { excluirLocal, listarLocais } from '../../services/locaisService'

function renderLocais() {
  return render(
    <MemoryRouter>
      <Locais />
    </MemoryRouter>,
  )
}

function nomesNaLista() {
  return screen
    .queryAllByRole('heading', { level: 3 })
    .map((titulo) => titulo.textContent)
}

describe('Página Locais — exclusão com confirmação', () => {
  it('pede confirmação e não exclui ao cancelar', async () => {
    const user = userEvent.setup()
    renderLocais()

    await user.click(
      screen.getByRole('button', { name: 'Excluir Parque Municipal' }),
    )

    const dialog = screen.getByRole('dialog', { name: 'Excluir local?' })
    expect(dialog).toHaveTextContent('Parque Municipal')

    await user.click(within(dialog).getByRole('button', { name: 'Cancelar' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(nomesNaLista()).toContain('Parque Municipal')
    expect(listarLocais()).toHaveLength(18)
  })

  it('exclui após confirmar, anuncia o resultado e persiste', async () => {
    const user = userEvent.setup()
    renderLocais()

    await user.click(
      screen.getByRole('button', { name: 'Excluir Parque Municipal' }),
    )
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Excluir',
      }),
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(nomesNaLista()).not.toContain('Parque Municipal')
    expect(
      screen.getByText('Local "Parque Municipal" excluído com sucesso.'),
    ).toBeInTheDocument()
    expect(screen.getByText('17 locais encontrados')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Locais acessíveis',
      }),
    ).toHaveFocus()
    expect(listarLocais().map((local) => local.id)).not.toContain(4)
  })

  it('funciona apenas com teclado', async () => {
    const user = userEvent.setup()
    renderLocais()

    screen
      .getByRole('button', { name: 'Excluir Biblioteca Municipal' })
      .focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Excluir' })).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(nomesNaLista()).not.toContain('Biblioteca Municipal')
  })

  it('mostra erro se o local já tiver sido removido', async () => {
    const user = userEvent.setup()
    renderLocais()

    await user.click(
      screen.getByRole('button', { name: 'Excluir Parque Municipal' }),
    )
    excluirLocal(4)

    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Excluir',
      }),
    )

    expect(screen.getByText(/Não foi possível excluir/)).toBeInTheDocument()
    expect(nomesNaLista()).not.toContain('Parque Municipal')
  })

  it('mostra estado vazio quando todos os locais são excluídos', () => {
    listarLocais().forEach((local) => excluirLocal(local.id))
    renderLocais()

    expect(
      screen.getByText('Nenhum local cadastrado ainda.'),
    ).toBeInTheDocument()
  })
})
