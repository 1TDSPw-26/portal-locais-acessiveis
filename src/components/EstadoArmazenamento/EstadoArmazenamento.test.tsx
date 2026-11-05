import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EstadoArmazenamento from './EstadoArmazenamento'

describe('EstadoArmazenamento', () => {
  it('exibe o estado indisponível com orientação', () => {
    render(<EstadoArmazenamento estado="indisponivel" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Armazenamento indisponível')).toBeInTheDocument()
    expect(screen.getByText(/recarregue a página/i)).toBeInTheDocument()
  })

  it('exibe o estado de dados corrompidos', () => {
    render(<EstadoArmazenamento estado="corrompido" />)
    expect(screen.getByText('Dados armazenados inválidos')).toBeInTheDocument()
  })

  it('exibe o estado sem permissão', () => {
    render(<EstadoArmazenamento estado="sem-permissao" />)
    expect(screen.getByText('Sem permissão de armazenamento')).toBeInTheDocument()
  })

  it('usa a mensagem recebida por props no lugar da padrão', () => {
    render(<EstadoArmazenamento estado="indisponivel" mensagem="Mensagem personalizada" />)
    expect(screen.getByText('Mensagem personalizada')).toBeInTheDocument()
  })

  it('não é confundido com lista vazia nem com falha de rede', () => {
    render(<EstadoArmazenamento estado="indisponivel" />)
    expect(screen.queryByText(/nenhum local/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/conexão/i)).not.toBeInTheDocument()
  })

  it('não possui botão de retry', () => {
    render(<EstadoArmazenamento estado="indisponivel" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})