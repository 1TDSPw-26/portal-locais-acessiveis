import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResumoFiltros from './ResumoFiltros'

function criarFiltros() {
  return [
    { id: 'categoria', nome: 'Categoria: Museu', onRemover: vi.fn() },
    { id: 'busca', nome: 'Busca: biblioteca', onRemover: vi.fn() },
    { id: 'recurso', nome: 'Recurso: Rampa de acesso', onRemover: vi.fn() },
  ]
}

describe('ResumoFiltros', () => {
  it('exibe o estado sem filtros ativos e nenhuma ação de remoção', () => {
    render(<ResumoFiltros filtros={[]} />)

    const resumo = screen.getByRole('region', { name: 'Resumo dos filtros' })
    expect(within(resumo).getByText('Nenhum filtro ativo.')).toBeInTheDocument()
    expect(within(resumo).queryByRole('button')).not.toBeInTheDocument()
  })

  it('exibe um filtro com nome legível e ação acessível', () => {
    const [filtro] = criarFiltros()
    render(<ResumoFiltros filtros={[filtro]} />)

    expect(screen.getByRole('heading', { name: 'Filtros ativos' })).toBeInTheDocument()
    const lista = screen.getByRole('list', { name: 'Filtros ativos' })
    const itens = within(lista).getAllByRole('listitem')

    expect(itens).toHaveLength(1)
    expect(within(itens[0]).getByText('Categoria: Museu')).toBeInTheDocument()
    expect(
      within(itens[0]).getByRole('button', { name: 'Remover filtro Categoria: Museu' }),
    ).toBeInTheDocument()
    expect(filtro.onRemover).not.toHaveBeenCalled()
  })

  it('exibe vários filtros em uma lista com suas ações individuais', () => {
    const filtros = criarFiltros()
    render(<ResumoFiltros filtros={filtros} />)

    const lista = screen.getByRole('list', { name: 'Filtros ativos' })
    const itens = within(lista).getAllByRole('listitem')

    expect(itens).toHaveLength(3)
    filtros.forEach((filtro, indice) => {
      expect(within(itens[indice]).getByText(filtro.nome)).toBeInTheDocument()
      expect(
        within(itens[indice]).getByRole('button', { name: `Remover filtro ${filtro.nome}` }),
      ).toBeInTheDocument()
    })
    expect(within(lista).getAllByRole('button')).toHaveLength(3)
  })

  it.each([0, 1, 2])('chama somente o callback do filtro de índice %i ao remover', async (indice) => {
    const user = userEvent.setup()
    const filtros = criarFiltros()
    render(<ResumoFiltros filtros={filtros} />)

    await user.click(
      screen.getByRole('button', { name: `Remover filtro ${filtros[indice].nome}` }),
    )

    filtros.forEach((filtro, indiceFiltro) => {
      expect(filtro.onRemover).toHaveBeenCalledTimes(indiceFiltro === indice ? 1 : 0)
    })
  })

  it('permite percorrer as ações com Tab e Shift+Tab sem remover filtros', async () => {
    const user = userEvent.setup()
    const filtros = criarFiltros()
    render(<ResumoFiltros filtros={filtros} />)

    const botoes = filtros.map((filtro) => (
      screen.getByRole('button', { name: `Remover filtro ${filtro.nome}` })
    ))

    await user.tab()
    expect(botoes[0]).toHaveFocus()
    await user.tab()
    expect(botoes[1]).toHaveFocus()
    await user.tab()
    expect(botoes[2]).toHaveFocus()
    await user.tab({ shift: true })
    expect(botoes[1]).toHaveFocus()
    await user.tab({ shift: true })
    expect(botoes[0]).toHaveFocus()

    filtros.forEach((filtro) => {
      expect(filtro.onRemover).not.toHaveBeenCalled()
    })
  })

  it.each([
    ['Enter', '{Enter}'],
    ['Espaço', ' '],
  ])('remove somente o filtro focado pela tecla %s', async (_nomeTecla, tecla) => {
    const user = userEvent.setup()
    const filtros = criarFiltros()
    render(<ResumoFiltros filtros={filtros} />)

    await user.tab()
    await user.tab()
    expect(
      screen.getByRole('button', { name: 'Remover filtro Busca: biblioteca' }),
    ).toHaveFocus()

    await user.keyboard(tecla)

    expect(filtros[0].onRemover).not.toHaveBeenCalled()
    expect(filtros[1].onRemover).toHaveBeenCalledOnce()
    expect(filtros[2].onRemover).not.toHaveBeenCalled()
  })

  it('mantém a exibição controlada pelas props após solicitar uma remoção', async () => {
    const user = userEvent.setup()
    const filtros = criarFiltros()
    const { rerender } = render(<ResumoFiltros filtros={filtros} />)

    await user.click(
      screen.getByRole('button', { name: 'Remover filtro Busca: biblioteca' }),
    )

    expect(filtros[1].onRemover).toHaveBeenCalledOnce()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByText('Busca: biblioteca')).toBeInTheDocument()

    rerender(<ResumoFiltros filtros={[filtros[0], filtros[2]]} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.queryByText('Busca: biblioteca')).not.toBeInTheDocument()
    expect(screen.getByText('Categoria: Museu')).toBeInTheDocument()
    expect(screen.getByText('Recurso: Rampa de acesso')).toBeInTheDocument()

    rerender(<ResumoFiltros filtros={[]} />)

    expect(screen.getByText('Nenhum filtro ativo.')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(filtros[0].onRemover).not.toHaveBeenCalled()
    expect(filtros[1].onRemover).toHaveBeenCalledOnce()
    expect(filtros[2].onRemover).not.toHaveBeenCalled()
  })

  it('não envia o formulário ao solicitar a remoção de um filtro', async () => {
    const user = userEvent.setup()
    const [filtro] = criarFiltros()
    const onEnviar = vi.fn()
    render(
      <form onSubmit={(evento) => {
        evento.preventDefault()
        onEnviar()
      }}>
        <ResumoFiltros filtros={[filtro]} />
      </form>,
    )

    await user.click(
      screen.getByRole('button', { name: 'Remover filtro Categoria: Museu' }),
    )

    expect(filtro.onRemover).toHaveBeenCalledOnce()
    expect(onEnviar).not.toHaveBeenCalled()
  })
})
