import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom'
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

function LocalizacaoAtual() {
  const location = useLocation()
  return (
    <output data-testid="url-atual">
      {location.pathname + location.search}
    </output>
  )
}

// Simula o botão voltar do navegador
function BotaoVoltar() {
  const navigate = useNavigate()
  return (
    <button type="button" onClick={() => navigate(-1)}>
      Voltar no histórico
    </button>
  )
}

function renderLocaisEm(url: string) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Locais />
      <LocalizacaoAtual />
      <BotaoVoltar />
    </MemoryRouter>,
  )
}

function urlAtual() {
  return screen.getByTestId('url-atual').textContent ?? ''
}

function campoBusca() {
  return screen.getByRole('searchbox', {
    name: 'Buscar por nome, categoria ou endereço',
  })
}

function campoCategoria() {
  return screen.getByRole('combobox', { name: 'Categoria' })
}

describe('Página Locais — consulta persistida na URL', () => {
  // LEITURA: a URL define o que aparece
  it('reproduz busca e categoria a partir da URL', () => {
    renderLocaisEm('/locais?q=municipal&categoria=Lazer')

    expect(campoBusca()).toHaveValue('municipal')
    expect(campoCategoria()).toHaveValue('Lazer')
    expect(screen.getByText('2 locais encontrados')).toBeInTheDocument()
  })

  // ATUALIZAÇÃO: mexer no controle muda a URL
  it('grava a busca na URL enquanto o usuário digita', async () => {
    const user = userEvent.setup()
    renderLocaisEm('/locais')

    await user.type(campoBusca(), 'parque')

    expect(urlAtual()).toBe('/locais?q=parque')
  })

  // RECARREGAR: desmonta e monta de novo com a URL gerada
  it('preserva o estado ao recarregar com a mesma URL', async () => {
    const user = userEvent.setup()
    const { unmount } = renderLocaisEm('/locais')

    await user.type(campoBusca(), 'museu')
    await user.selectOptions(campoCategoria(), 'Cultura')
    const urlCompartilhada = urlAtual()
    unmount()

    renderLocaisEm(urlCompartilhada)

    expect(campoBusca()).toHaveValue('museu')
    expect(campoCategoria()).toHaveValue('Cultura')
  })

  // INVÁLIDOS: it.each roda o mesmo teste para vários valores
  it.each(['abc', '0', '-1', '2.5', '1e3', ''])(
    'ignora pagina=%s e mostra a primeira página',
    (pagina) => {
      renderLocaisEm(`/locais?pagina=${pagina}`)

      expect(
        screen.getByRole('list', { name: 'Lista de locais, página 1 de 3' }),
      ).toBeInTheDocument()
    },
  )

  // TECLADO: a URL atualiza e o foco não se perde
  it('mantém o foco e a ordem de tabulação após gravar na URL', async () => {
    const user = userEvent.setup()
    renderLocaisEm('/locais')

    await user.tab()
    expect(campoBusca()).toHaveFocus()

    await user.keyboard('museu')
    expect(urlAtual()).toBe('/locais?q=museu')
    expect(campoBusca()).toHaveFocus()

    await user.tab()
    expect(campoCategoria()).toHaveFocus()
  })
})