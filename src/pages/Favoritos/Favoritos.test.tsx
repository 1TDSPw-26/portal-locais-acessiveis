import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Favoritos from './Favoritos'
import AppRoutes from '../../routes/AppRoutes'
import { CHAVE_FAVORITOS } from '../../storage/favoritosStorage'
import { CHAVE_LOCAIS, excluirLocal, listarLocais } from '../../services/locaisService'

afterEach(() => { vi.restoreAllMocks() })

function renderFavoritos() {
  return render(<MemoryRouter><Favoritos /></MemoryRouter>)
}

describe('Página Favoritos', () => {
  it('mostra somente os locais salvos, com os dados do card reutilizado', async () => {
    const [primeiro, segundo, terceiro] = listarLocais()
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([primeiro.id, terceiro.id]))
    renderFavoritos()

    expect(await screen.findByRole('heading', { level: 3, name: primeiro.nome })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: terceiro.nome })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: segundo.nome })).not.toBeInTheDocument()
    expect(screen.getByText(primeiro.endereco)).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('2 locais favoritos disponíveis.')
    expect(document.title).toBe('Favoritos | AcessoLocal')
    expect(screen.getByRole('heading', { level: 1, name: 'Favoritos' })).toHaveFocus()
  })

  it('orienta a voltar à busca quando não existem favoritos', async () => {
    renderFavoritos()
    expect(await screen.findByRole('heading', { name: 'Nenhum favorito por aqui' })).toBeInTheDocument()
    expect(screen.getByText(/Volte à busca para encontrar locais acessíveis/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explorar locais' })).toHaveAttribute('href', '/locais')
  })

  it('remove pelo teclado, persiste e atualiza a lista sem sair da página', async () => {
    const user = userEvent.setup()
    const [primeiro, segundo] = listarLocais()
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([primeiro.id, segundo.id]))
    const tela = renderFavoritos()

    const botao = await screen.findByRole('button', { name: `Remover ${primeiro.nome} dos favoritos` })
    botao.focus()
    await user.keyboard('{Enter}')
    expect(screen.queryByRole('heading', { level: 3, name: primeiro.nome })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: segundo.nome })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('1 local favorito disponível.')
    expect(screen.getByRole('heading', { level: 1, name: 'Favoritos' })).toHaveFocus()
    expect(JSON.parse(localStorage.getItem(CHAVE_FAVORITOS)!)).toEqual([segundo.id])

    tela.unmount()
    renderFavoritos()
    expect(await screen.findByRole('heading', { level: 3, name: segundo.nome })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: primeiro.nome })).not.toBeInTheDocument()
  })

  it('mostra o estado vazio após remover o último favorito', async () => {
    const user = userEvent.setup()
    const [local] = listarLocais()
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([local.id]))
    renderFavoritos()
    await user.click(await screen.findByRole('button', { name: `Remover ${local.nome} dos favoritos` }))
    expect(screen.getByRole('heading', { name: 'Nenhum favorito por aqui' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('0 locais favoritos disponíveis.')
  })

  it.each(['{', '{}', 'null', '["1", null, -1, 0]'])(
    'trata favoritos inválidos sem quebrar: %s',
    async (valor) => {
      localStorage.setItem(CHAVE_FAVORITOS, valor)
      renderFavoritos()
      expect(await screen.findByRole('heading', { name: 'Nenhum favorito por aqui' })).toBeInTheDocument()
      expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0)
    },
  )

  it('omite locais removidos e inexistentes preservando os favoritos disponíveis', async () => {
    const [primeiro, segundo] = listarLocais()
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([primeiro.id, segundo.id, 999999, primeiro.id]))
    excluirLocal(segundo.id)
    renderFavoritos()

    expect(await screen.findByRole('heading', { level: 3, name: primeiro.nome })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: segundo.nome })).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('1 local favorito disponível.')
    expect(screen.getByText(/Alguns locais salvos não estão mais disponíveis/)).toBeInTheDocument()
    expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(1)
  })

  it('orienta a buscar locais quando todos os favoritos estão indisponíveis', async () => {
    localStorage.setItem(CHAVE_FAVORITOS, '[999999]')
    renderFavoritos()
    expect(await screen.findByRole('heading', { name: 'Nenhum favorito por aqui' })).toBeInTheDocument()
    expect(screen.getByText(/Alguns locais salvos não estão mais disponíveis/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explorar locais' })).toHaveAttribute('href', '/locais')
  })

  it('mantém o card e informa a falha se não conseguir salvar a remoção', async () => {
    const user = userEvent.setup()
    const [local] = listarLocais()
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([local.id]))
    renderFavoritos()
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Sem espaço') })

    await user.click(await screen.findByRole('button', { name: `Remover ${local.nome} dos favoritos` }))
    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível salvar os favoritos')
    expect(screen.getByRole('heading', { level: 3, name: local.nome })).toBeInTheDocument()
  })

  it('permite tentar novamente quando os dados dos locais estão corrompidos', async () => {
    const user = userEvent.setup()
    const [local] = listarLocais()
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([local.id]))
    localStorage.setItem(CHAVE_LOCAIS, '{')
    renderFavoritos()

    expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível carregar os locais')
    expect(screen.queryByRole('heading', { name: 'Nenhum favorito por aqui' })).not.toBeInTheDocument()
    localStorage.removeItem(CHAVE_LOCAIS)
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(await screen.findByRole('heading', { level: 3, name: local.nome })).toBeInTheDocument()
  })

  it('integra navegação, rota, título e retorno à busca em um único layout', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/favoritos']}><AppRoutes /></MemoryRouter>)
    expect(await screen.findByRole('heading', { level: 1, name: 'Favoritos' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Favoritos' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getAllByRole('main')).toHaveLength(1)
    expect(screen.getAllByRole('banner')).toHaveLength(1)

    await user.click(screen.getByRole('link', { name: 'Explorar locais' }))
    expect(await screen.findByRole('heading', { level: 1, name: 'Locais acessíveis' })).toBeInTheDocument()
  })

  it('restaura o título anterior ao sair da página', () => {
    document.title = 'Página anterior'
    const tela = renderFavoritos()
    tela.unmount()
    expect(document.title).toBe('Página anterior')
  })
})
