import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import LocalDetalhe from './LocalDetalhe'

function renderizar(rota = '/locais/1') {
  render(
    <MemoryRouter initialEntries={[rota]}>
      <Routes>
        <Route path="/locais/:id" element={<LocalDetalhe />} />
      </Routes>
    </MemoryRouter>,
  )
}

function definirNavigator(propriedade: 'share' | 'clipboard', valor: unknown) {
  Object.defineProperty(navigator, propriedade, {
    configurable: true,
    value: valor,
  })
}

describe('LocalDetalhe', () => {
  it('renderiza breadcrumb e links de retorno', () => {
    renderizar()

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Locais' })).toHaveAttribute('href', '/locais')
  })
})

describe('LocalDetalhe - compartilhamento', () => {
  const urlEsperada = `${window.location.origin}/locais/1`

  afterEach(() => {
    definirNavigator('share', undefined)
    definirNavigator('clipboard', undefined)
  })

  it('usa a API de compartilhamento com o link da rota do local', async () => {
    const share = vi.fn().mockResolvedValue(undefined)
    definirNavigator('share', share)

    renderizar()
    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar local' }))

    expect(await screen.findByText(/Link compartilhado com sucesso/)).toBeInTheDocument()
    expect(share).toHaveBeenCalledWith(expect.objectContaining({ url: urlEsperada }))
  })

  it('não mostra erro quando o usuário cancela o compartilhamento', async () => {
    const share = vi
      .fn()
      .mockRejectedValue(new DOMException('cancelado', 'AbortError'))
    const writeText = vi.fn()
    definirNavigator('share', share)
    definirNavigator('clipboard', { writeText })

    renderizar()
    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar local' }))

    await vi.waitFor(() => expect(share).toHaveBeenCalled())
    expect(writeText).not.toHaveBeenCalled()
    expect(screen.queryByRole('alert')).toBeEmptyDOMElement()
    expect(screen.queryByText(/sucesso/)).not.toBeInTheDocument()
  })

  it('copia o link para a área de transferência quando não há API de compartilhamento', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    definirNavigator('clipboard', { writeText })

    renderizar()
    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar local' }))

    expect(await screen.findByText(/Link copiado com sucesso/)).toBeInTheDocument()
    expect(writeText).toHaveBeenCalledWith(urlEsperada)
  })

  it('copia o link quando a API de compartilhamento falha', async () => {
    const share = vi.fn().mockRejectedValue(new Error('falha'))
    const writeText = vi.fn().mockResolvedValue(undefined)
    definirNavigator('share', share)
    definirNavigator('clipboard', { writeText })

    renderizar()
    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar local' }))

    expect(await screen.findByText(/Link copiado com sucesso/)).toBeInTheDocument()
    expect(writeText).toHaveBeenCalledWith(urlEsperada)
  })

  it('exibe o link para cópia manual quando o navegador não oferece nenhum recurso', async () => {
    renderizar()
    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar local' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /não permite copiar automaticamente/,
    )
    expect(screen.getByLabelText('Link do local')).toHaveValue(urlEsperada)
  })

  it('explica a falha quando a permissão da área de transferência é negada', async () => {
    const writeText = vi
      .fn()
      .mockRejectedValue(new DOMException('negado', 'NotAllowedError'))
    definirNavigator('clipboard', { writeText })

    renderizar()
    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar local' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /bloqueou o acesso à área de transferência/,
    )
    expect(screen.getByLabelText('Link do local')).toHaveValue(urlEsperada)
  })

  it('informa falha genérica da área de transferência', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('falha'))
    definirNavigator('clipboard', { writeText })

    renderizar()
    fireEvent.click(screen.getByRole('button', { name: 'Compartilhar local' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /Não foi possível copiar o link/,
    )
    expect(screen.getByLabelText('Link do local')).toHaveValue(urlEsperada)
  })

  it('não oferece compartilhamento para um local inexistente', () => {
    renderizar('/locais/999999')

    expect(
      screen.queryByRole('button', { name: 'Compartilhar local' }),
    ).not.toBeInTheDocument()
  })
})
