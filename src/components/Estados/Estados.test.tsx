import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import Loading from '../Loading/Loading'
import EstadoVazio from '../EstadoVazio/EstadoVazio'
import EstadoErro from '../EstadoErro/EstadoErro'

describe('Componentes de estado (Loading, Vazio, Erro)', () => {
  it('renderiza o componente Loading com mensagem personalizada e atributos a11y', () => {
    render(<Loading mensagem="Carregando dados..." />)
    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('Carregando dados...')
    expect(status).toHaveAttribute('aria-live', 'polite')
  })

  it('renderiza o componente EstadoVazio com título e mensagem padrão e customizados', () => {
    const { rerender } = render(<EstadoVazio />)
    expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument()
    expect(screen.getByText('Não há itens para exibir no momento.')).toBeInTheDocument()

    rerender(<EstadoVazio titulo="Sem itens" mensagem="Lista vazia." />)
    expect(screen.getByText('Sem itens')).toBeInTheDocument()
    expect(screen.getByText('Lista vazia.')).toBeInTheDocument()
  })

  it('renderiza o componente EstadoErro e dispara ação de tentar novamente', async () => {
    const user = userEvent.setup()
    const aoTentarNovamente = vi.fn()

    render(
      <EstadoErro
        titulo="Erro de conexão"
        mensagem="Falha ao conectar ao servidor."
        aoTentarNovamente={aoTentarNovamente}
      />,
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Erro de conexão')).toBeInTheDocument()
    expect(screen.getByText('Falha ao conectar ao servidor.')).toBeInTheDocument()

    const botao = screen.getByRole('button', { name: 'Tentar novamente' })
    await user.click(botao)
    expect(aoTentarNovamente).toHaveBeenCalledTimes(1)
  })
})
