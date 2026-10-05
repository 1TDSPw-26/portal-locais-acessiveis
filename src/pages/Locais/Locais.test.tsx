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
      screen.getByRole('button', { name: 'Excluir Parque Linear Vila Serena' }),
    )

    const dialog = screen.getByRole('dialog', { name: 'Excluir local?' })
    expect(dialog).toHaveTextContent('Parque Linear Vila Serena')

    await user.click(within(dialog).getByRole('button', { name: 'Cancelar' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(nomesNaLista()).toContain('Parque Linear Vila Serena')
    expect(listarLocais()).toHaveLength(3)
  })

  it('exclui após confirmar, anuncia o resultado e persiste', async () => {
    const user = userEvent.setup()
    renderLocais()

    await user.click(
      screen.getByRole('button', { name: 'Excluir Parque Linear Vila Serena' }),
    )
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Excluir',
      }),
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(nomesNaLista()).not.toContain('Parque Linear Vila Serena')
    expect(
      screen.getByText(
        'Local "Parque Linear Vila Serena" excluído com sucesso.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('2 locais encontrados')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Locais' }),
    ).toHaveFocus()
    expect(listarLocais().map((local) => local.id)).toEqual(['1', '3'])
  })

  it('funciona apenas com teclado', async () => {
    const user = userEvent.setup()
    renderLocais()

    screen
      .getByRole('button', {
        name: 'Excluir Biblioteca Comunitária Jardim das Letras',
      })
      .focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Excluir' })).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(nomesNaLista()).not.toContain(
      'Biblioteca Comunitária Jardim das Letras',
    )
  })

  it('mostra erro se o local já tiver sido removido', async () => {
    const user = userEvent.setup()
    renderLocais()

    await user.click(
      screen.getByRole('button', { name: 'Excluir Parque Linear Vila Serena' }),
    )
    excluirLocal('2') // simula remoção feita em outra aba
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Excluir',
      }),
    )

    expect(screen.getByText(/Não foi possível excluir/)).toBeInTheDocument()
    expect(nomesNaLista()).not.toContain('Parque Linear Vila Serena')
  })

  it('mostra estado vazio quando todos os locais são excluídos', () => {
    ;['1', '2', '3'].forEach((id) => excluirLocal(id))
    renderLocais()
    expect(
      screen.getByText('Nenhum local cadastrado ainda.'),
    ).toBeInTheDocument()
  })
})
