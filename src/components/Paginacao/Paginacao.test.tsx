import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Paginacao from './Paginacao'

function renderPaginacao(
  props: Partial<{
    paginaAtual: number
    totalPaginas: number
    aoMudarPagina: (pagina: number) => void
  }> = {},
) {
  const padrao = {
    paginaAtual: 1,
    totalPaginas: 3,
    aoMudarPagina: vi.fn(),
    ...props,
  }

  return {
    ...render(<Paginacao {...padrao} />),
    aoMudarPagina: padrao.aoMudarPagina,
  }
}

function PaginacaoControlada({ totalPaginas = 3 }: { totalPaginas?: number }) {
  const [pagina, setPagina] = useState(1)
  return (
    <Paginacao
      paginaAtual={pagina}
      totalPaginas={totalPaginas}
      aoMudarPagina={setPagina}
    />
  )
}

describe('Paginacao', () => {
  describe('primeira página', () => {
    it('desabilita o botão anterior', () => {
      renderPaginacao({ paginaAtual: 1, totalPaginas: 3 })
      expect(
        screen.getByRole('button', { name: /anterior/i }),
      ).toBeDisabled()
    })

    it('habilita o botão próxima', () => {
      renderPaginacao({ paginaAtual: 1, totalPaginas: 3 })
      expect(
        screen.getByRole('button', { name: /próxima/i }),
      ).toBeEnabled()
    })

    it('marca a página 1 como atual', () => {
      renderPaginacao({ paginaAtual: 1, totalPaginas: 3 })
      expect(
        screen.getByRole('button', { name: /página 1, atual/i }),
      ).toHaveAttribute('aria-current', 'page')
    })

    it('anuncia página 1 de 3', () => {
      renderPaginacao({ paginaAtual: 1, totalPaginas: 3 })
      expect(screen.getByText('Página 1 de 3')).toBeInTheDocument()
    })
  })

  describe('página intermediária', () => {
    it('habilita ambos os botões de navegação', () => {
      renderPaginacao({ paginaAtual: 2, totalPaginas: 3 })
      expect(
        screen.getByRole('button', { name: /anterior/i }),
      ).toBeEnabled()
      expect(
        screen.getByRole('button', { name: /próxima/i }),
      ).toBeEnabled()
    })

    it('marca a página 2 como atual', () => {
      renderPaginacao({ paginaAtual: 2, totalPaginas: 3 })
      expect(
        screen.getByRole('button', { name: /página 2, atual/i }),
      ).toHaveAttribute('aria-current', 'page')
    })

    it('não marca as outras páginas como atuais', () => {
      renderPaginacao({ paginaAtual: 2, totalPaginas: 3 })
      expect(
        screen.getByRole('button', { name: /ir para a página 1/i }),
      ).not.toHaveAttribute('aria-current')
      expect(
        screen.getByRole('button', { name: /ir para a página 3/i }),
      ).not.toHaveAttribute('aria-current')
    })
  })

  describe('última página', () => {
    it('desabilita o botão próxima', () => {
      renderPaginacao({ paginaAtual: 3, totalPaginas: 3 })
      expect(
        screen.getByRole('button', { name: /próxima/i }),
      ).toBeDisabled()
    })

    it('habilita o botão anterior', () => {
      renderPaginacao({ paginaAtual: 3, totalPaginas: 3 })
      expect(
        screen.getByRole('button', { name: /anterior/i }),
      ).toBeEnabled()
    })

    it('marca a última página como atual', () => {
      renderPaginacao({ paginaAtual: 3, totalPaginas: 3 })
      expect(
        screen.getByRole('button', { name: /página 3, atual/i }),
      ).toHaveAttribute('aria-current', 'page')
    })
  })

  describe('lista vazia ou página única', () => {
    it('não renderiza quando totalPaginas é 1', () => {
      const { container } = renderPaginacao({ totalPaginas: 1 })
      expect(container).toBeEmptyDOMElement()
    })

    it('não renderiza quando totalPaginas é 0', () => {
      const { container } = renderPaginacao({ totalPaginas: 0 })
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('navegação por teclado', () => {
    it('percorre os controles em ordem lógica com Tab', async () => {
      const user = userEvent.setup()
      renderPaginacao({ paginaAtual: 2, totalPaginas: 3 })

      const anterior = screen.getByRole('button', { name: /anterior/i })
      const pagina1 = screen.getByRole('button', {
        name: /ir para a página 1/i,
      })
      const pagina2 = screen.getByRole('button', {
        name: /página 2, atual/i,
      })
      const pagina3 = screen.getByRole('button', {
        name: /ir para a página 3/i,
      })
      const proxima = screen.getByRole('button', { name: /próxima/i })

      anterior.focus()
      expect(anterior).toHaveFocus()

      await user.tab()
      expect(pagina1).toHaveFocus()

      await user.tab()
      expect(pagina2).toHaveFocus()

      await user.tab()
      expect(pagina3).toHaveFocus()

      await user.tab()
      expect(proxima).toHaveFocus()
    })

    it('ativa botão próxima com Enter', async () => {
      const user = userEvent.setup()
      const { aoMudarPagina } = renderPaginacao({
        paginaAtual: 1,
        totalPaginas: 3,
      })

      screen.getByRole('button', { name: /próxima/i }).focus()
      await user.keyboard('{Enter}')

      expect(aoMudarPagina).toHaveBeenCalledWith(2)
    })

    it('ativa botão anterior com Enter', async () => {
      const user = userEvent.setup()
      const { aoMudarPagina } = renderPaginacao({
        paginaAtual: 2,
        totalPaginas: 3,
      })

      screen.getByRole('button', { name: /anterior/i }).focus()
      await user.keyboard('{Enter}')

      expect(aoMudarPagina).toHaveBeenCalledWith(1)
    })

    it('ativa número de página com Espaço', async () => {
      const user = userEvent.setup()
      const { aoMudarPagina } = renderPaginacao({
        paginaAtual: 1,
        totalPaginas: 3,
      })

      screen.getByRole('button', { name: /ir para a página 3/i }).focus()
      await user.keyboard(' ')

      expect(aoMudarPagina).toHaveBeenCalledWith(3)
    })
  })

  describe('interação', () => {
    it('chama aoMudarPagina ao clicar em próxima', async () => {
      const user = userEvent.setup()
      const { aoMudarPagina } = renderPaginacao({
        paginaAtual: 1,
        totalPaginas: 3,
      })

      await user.click(screen.getByRole('button', { name: /próxima/i }))
      expect(aoMudarPagina).toHaveBeenCalledWith(2)
    })

    it('chama aoMudarPagina ao clicar em anterior', async () => {
      const user = userEvent.setup()
      const { aoMudarPagina } = renderPaginacao({
        paginaAtual: 2,
        totalPaginas: 3,
      })

      await user.click(screen.getByRole('button', { name: /anterior/i }))
      expect(aoMudarPagina).toHaveBeenCalledWith(1)
    })

    it('chama aoMudarPagina ao clicar em número de página', async () => {
      const user = userEvent.setup()
      const { aoMudarPagina } = renderPaginacao({
        paginaAtual: 1,
        totalPaginas: 3,
      })

      await user.click(
        screen.getByRole('button', { name: /ir para a página 3/i }),
      )
      expect(aoMudarPagina).toHaveBeenCalledWith(3)
    })

    it('não chama aoMudarPagina ao clicar na página atual', async () => {
      const user = userEvent.setup()
      const { aoMudarPagina } = renderPaginacao({
        paginaAtual: 2,
        totalPaginas: 3,
      })

      await user.click(
        screen.getByRole('button', { name: /página 2, atual/i }),
      )
      expect(aoMudarPagina).not.toHaveBeenCalled()
    })
  })

  describe('preservação de foco', () => {
    it('move o foco para o botão da nova página ao clicar em próxima', async () => {
      const user = userEvent.setup()
      render(<PaginacaoControlada totalPaginas={3} />)

      await user.click(screen.getByRole('button', { name: /próxima/i }))

      expect(
        screen.getByRole('button', { name: /página 2, atual/i }),
      ).toHaveFocus()
    })

    it('move o foco para o botão da nova página ao clicar em anterior', async () => {
      const user = userEvent.setup()
      render(<PaginacaoControlada totalPaginas={3} />)

      await user.click(screen.getByRole('button', { name: /próxima/i }))
      await user.click(screen.getByRole('button', { name: /anterior/i }))

      expect(
        screen.getByRole('button', { name: /página 1, atual/i }),
      ).toHaveFocus()
    })

    it('move o foco ao clicar em um número de página', async () => {
      const user = userEvent.setup()
      render(<PaginacaoControlada totalPaginas={3} />)

      await user.click(
        screen.getByRole('button', { name: /ir para a página 3/i }),
      )

      expect(
        screen.getByRole('button', { name: /página 3, atual/i }),
      ).toHaveFocus()
    })
  })

  describe('semântica e acessibilidade', () => {
    it('possui navegação com aria-label', () => {
      renderPaginacao({ paginaAtual: 1, totalPaginas: 3 })
      expect(
        screen.getByRole('navigation', { name: /paginação dos locais/i }),
      ).toBeInTheDocument()
    })

    it('agrupa os números de página com role group', () => {
      renderPaginacao({ paginaAtual: 1, totalPaginas: 3 })
      expect(
        screen.getByRole('group', { name: /páginas disponíveis/i }),
      ).toBeInTheDocument()
    })

    it('possui região aria-live para anúncio', () => {
      renderPaginacao({ paginaAtual: 2, totalPaginas: 5 })
      expect(screen.getByText('Página 2 de 5')).toBeInTheDocument()
    })
  })
})
