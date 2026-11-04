import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import LocalDetalhe from './LocalDetalhe'
import { useLocalDetalhe } from '../../hooks/useLocalDetalhe'

vi.mock('../../hooks/useLocalDetalhe')

const local = {
  id: 1,
  nome: 'Biblioteca Municipal',
  categoria: 'Educação',
  descricao: 'Biblioteca com ampla coleção de livros.',
  endereco: 'Centro - São Paulo/SP',
  acessibilidades: ['Rampa de acesso', 'Banheiro adaptado'],
}

function renderizar(rota: string, estado: Partial<ReturnType<typeof useLocalDetalhe>>) {
  const recarregar = vi.fn()
  vi.mocked(useLocalDetalhe).mockReturnValue({
    dado: undefined,
    carregando: false,
    erro: null,
    recarregar,
    ...estado,
  })

  render(
    <MemoryRouter initialEntries={[rota]}>
      <Routes>
        <Route path="/locais/:id" element={<LocalDetalhe />} />
        <Route path="/locais" element={<h1>Lista de locais</h1>} />
      </Routes>
    </MemoryRouter>,
  )

  return { recarregar }
}

describe('LocalDetalhe', () => {
  it('mostra as informações do local', () => {
    renderizar('/locais/1', { dado: local })

    expect(useLocalDetalhe).toHaveBeenCalledWith('1')
    expect(screen.getByRole('heading', { name: 'Biblioteca Municipal' })).toBeInTheDocument()
    expect(screen.getByText('Educação')).toBeInTheDocument()
    expect(screen.getByText('Centro - São Paulo/SP')).toBeInTheDocument()
    expect(screen.getByText('Rampa de acesso')).toBeInTheDocument()
    expect(document.title).toBe('Biblioteca Municipal | AcessoLocal')
  })

  it('mostra o carregamento', () => {
    renderizar('/locais/1', { carregando: true })

    expect(screen.getByRole('status')).toHaveTextContent('Carregando detalhes do local...')
  })

  it('mostra local não encontrado para id inválido', () => {
    renderizar('/locais/abc', { dado: undefined })

    expect(screen.getByRole('heading', { name: 'Local não encontrado' })).toBeInTheDocument()
    expect(screen.getByText(/código “abc”/)).toBeInTheDocument()
  })

  it('mostra erro e permite tentar novamente', async () => {
    const { recarregar } = renderizar('/locais/1', { erro: 'Não foi possível carregar.' })

    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível carregar.')
    await userEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(recarregar).toHaveBeenCalledOnce()
  })

  it('tem breadcrumb e volta para a lista de locais', async () => {
    renderizar('/locais/1', { dado: local })

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('link', { name: /Voltar para a lista de locais/ }))
    expect(screen.getByRole('heading', { name: 'Lista de locais' })).toBeInTheDocument()
  })
})
