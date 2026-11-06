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

describe('Página Locais — limpar busca e filtros', () => {
  const nomeBotao = 'Limpar busca e filtros'

  it('não mostra o botão sem busca nem filtro', () => {
    renderLocais()

    expect(
      screen.queryByRole('button', { name: nomeBotao }),
    ).not.toBeInTheDocument()
  })

  it('limpa somente a busca', async () => {
    const user = userEvent.setup()
    renderLocais()
    const total = listarLocais().length

    const campo = screen.getByLabelText(/Buscar por nome/)
    await user.type(campo, 'Parque Municipal')
    await user.click(screen.getByRole('button', { name: nomeBotao }))

    expect(campo).toHaveValue('')
    expect(campo).toHaveFocus()
    expect(
      screen.getByText(`Busca e filtros removidos. ${total} locais exibidos.`),
    ).toBeInTheDocument()
    expect(screen.getByText(`${total} locais encontrados`)).toBeInTheDocument()
  })

  it('limpa somente a categoria', async () => {
    const user = userEvent.setup()
    renderLocais()
    const total = listarLocais().length

    const select = screen.getByLabelText('Categoria')
    await user.selectOptions(select, listarLocais()[0].categoria)
    await user.click(screen.getByRole('button', { name: nomeBotao }))

    expect(select).toHaveValue('')
    expect(screen.getByText(`${total} locais encontrados`)).toBeInTheDocument()
  })

  it('limpa busca e categoria combinadas', async () => {
    const user = userEvent.setup()
    renderLocais()
    const total = listarLocais().length

    const campo = screen.getByLabelText(/Buscar por nome/)
    const select = screen.getByLabelText('Categoria')
    await user.type(campo, 'Parque')
    await user.selectOptions(select, listarLocais()[0].categoria)
    await user.click(screen.getByRole('button', { name: nomeBotao }))

    expect(campo).toHaveValue('')
    expect(select).toHaveValue('')
    expect(screen.getByText(`${total} locais encontrados`)).toBeInTheDocument()
  })

  it('funciona com teclado', async () => {
    const user = userEvent.setup()
    renderLocais()

    const campo = screen.getByLabelText(/Buscar por nome/)
    await user.type(campo, 'Parque')
    screen.getByRole('button', { name: nomeBotao }).focus()
    await user.keyboard('{Enter}')

    expect(campo).toHaveValue('')
    expect(campo).toHaveFocus()
  })
})
