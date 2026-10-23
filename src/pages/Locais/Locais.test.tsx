import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Locais from './Locais'
import { excluirLocal, listarLocais } from '../../services/locaisService'
import * as locaisService from '../../services/locaisService'

function renderLocais() {
  return render(
    <MemoryRouter>
      <Locais />
    </MemoryRouter>,
  )
}

function nomesNaLista() {
  return screen.queryAllByRole('heading', { level: 3 })
    .map((titulo) => titulo.textContent)
}

describe('Página Locais — exclusão com confirmação', () => {
  it('pede confirmação e não exclui ao cancelar', async () => {
    const user = userEvent.setup()
    renderLocais()
    await user.click(screen.getByRole('button', { name: 'Excluir Parque Municipal' }))
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
    await user.click(screen.getByRole('button', { name: 'Excluir Parque Municipal' }))
    await user.click(within(screen.getByRole('dialog')).getByRole('button', {
      name: 'Excluir',
    }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await waitFor(() => {
      expect(nomesNaLista()).not.toContain('Parque Municipal')
    })
    expect(screen.getByText('Local "Parque Municipal" excluído com sucesso.')).toBeInTheDocument()
    expect(screen.getByText('17 locais encontrados')).toBeInTheDocument()
    expect(screen.getByRole('heading', {
      level: 1,
      name: 'Locais acessíveis',
    })).toHaveFocus()
    expect(listarLocais().map((local) => local.id)).not.toContain(4)
  })

  it('funciona apenas com teclado', async () => {
    const user = userEvent.setup()
    renderLocais()
    screen.getByRole('button', { name: 'Excluir Biblioteca Municipal' }).focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Excluir' })).toHaveFocus()
    await user.keyboard('{Enter}')
    await waitFor(() => {
      expect(nomesNaLista()).not.toContain('Biblioteca Municipal')
    })
  })

  it('mostra erro se o local já tiver sido removido', async () => {
    const user = userEvent.setup()
    renderLocais()
    await user.click(screen.getByRole('button', { name: 'Excluir Parque Municipal' }))
    excluirLocal(4)
    await user.click(within(screen.getByRole('dialog')).getByRole('button', {
      name: 'Excluir',
    }))
    expect(screen.getByText(/Não foi possível excluir/)).toBeInTheDocument()
    await waitFor(() => {
      expect(nomesNaLista()).not.toContain('Parque Municipal')
    })
  })

  it('mostra estado vazio quando todos os locais são excluídos', () => {
    listarLocais().forEach((local) => excluirLocal(local.id))
    renderLocais()
    expect(screen.getByText('Nenhum local cadastrado ainda.')).toBeInTheDocument()
  })
})

describe('Página Locais — nova tentativa de carregamento', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exibe erro e botão quando o carregamento falha', () => {
    vi.spyOn(locaisService, 'listarLocais').mockImplementation(() => {
      throw new Error('Falha no armazenamento')
    })
    renderLocais()
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os locais',
    )
    expect(screen.getByRole('button', {
      name: 'Tentar novamente',
    })).toBeEnabled()
  })

  it('carrega os locais após uma nova tentativa bem-sucedida', async () => {
    const user = userEvent.setup()
    const locais = locaisService.listarLocais()
    const listarSpy = vi.spyOn(locaisService, 'listarLocais')
      .mockImplementationOnce(() => {
        throw new Error('Falha inicial')
      })
      .mockReturnValueOnce(locais)

    renderLocais()
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
    expect(screen.getByText('18 locais encontrados')).toBeInTheDocument()
    expect(nomesNaLista()).toContain('Parque Municipal')
    expect(listarSpy).toHaveBeenCalledTimes(2)
  })

  it('permite tentar novamente após falhas consecutivas', async () => {
    const user = userEvent.setup()
    const listarSpy = vi.spyOn(locaisService, 'listarLocais')
      .mockImplementation(() => {
        throw new Error('Falha no carregamento')
      })

    renderLocais()
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: 'Tentar novamente',
      })).toBeEnabled()
    })
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Não foi possível carregar os locais',
    )
    expect(listarSpy).toHaveBeenCalledTimes(2)
  })

  it('desabilita o botão enquanto tenta carregar novamente', async () => {
    const user = userEvent.setup()
    vi.spyOn(locaisService, 'listarLocais').mockImplementation(() => {
      throw new Error('Falha no carregamento')
    })

    renderLocais()
    const botao = screen.getByRole('button', { name: 'Tentar novamente' })
    await user.click(botao)

    expect(await screen.findByRole('button', {
      name: 'Tentar novamente',
    })).toBeEnabled()
  })

  it('exibe estado vazio após uma tentativa bem-sucedida', async () => {
    const user = userEvent.setup()
    vi.spyOn(locaisService, 'listarLocais')
      .mockImplementationOnce(() => {
        throw new Error('Falha inicial')
      })
      .mockReturnValueOnce([])

    renderLocais()
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))

    expect(await screen.findByText(
      'Nenhum local cadastrado ainda.',
    )).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('preserva a busca após falha e nova tentativa', async () => {
    const user = userEvent.setup()
    const locais = locaisService.listarLocais()
    vi.spyOn(locaisService, 'listarLocais')
      .mockImplementationOnce(() => {
        throw new Error('Falha inicial')
      })
      .mockReturnValueOnce(locais)

    renderLocais()
    const busca = screen.getByRole('searchbox')
    await user.type(busca, 'Parque')
    expect(busca).toHaveValue('Parque')

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    expect(busca).toHaveValue('Parque')
    expect(nomesNaLista()).toContain('Parque Municipal')
    expect(screen.getByText('1 local encontrado')).toBeInTheDocument()
  })

  it('mantém a categoria selecionada após uma falha consecutiva', async () => {
    const user = userEvent.setup()
    vi.spyOn(locaisService, 'listarLocais').mockImplementation(() => {
      throw new Error('Falha no carregamento')
    })

    renderLocais()
    const categoria = screen.getByRole('combobox', { name: 'Categoria' })
    expect(categoria).toHaveValue('')

    const busca = screen.getByRole('searchbox')
    await user.type(busca, 'Biblioteca')
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: 'Tentar novamente',
      })).toBeEnabled()
    })
    expect(busca).toHaveValue('Biblioteca')
    expect(categoria).toHaveValue('')
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})