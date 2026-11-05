import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Notificacao from './Notificacao'

describe('Notificacao', () => {
  it.each([
    ['sucesso', 'status'],
    ['aviso', 'alert'],
    ['erro', 'alert'],
  ] as const)('expõe o papel acessível para o tipo %s', (tipo, papel) => {
    render(<Notificacao tipo={tipo} titulo="Operação concluída" />)
    expect(screen.getByRole(papel)).toHaveTextContent(tipo === 'sucesso' ? 'Sucesso' : tipo === 'aviso' ? 'Aviso' : 'Erro')
  })

  it('exibe título e conteúdo sem depender de uma página', () => {
    render(
      <Notificacao tipo="sucesso" titulo="Local salvo">
        O local foi cadastrado.
      </Notificacao>,
    )

    expect(screen.getByRole('status')).toHaveAccessibleName('Local salvo')
    expect(screen.getByText('O local foi cadastrado.')).toBeInTheDocument()
  })

  it('fecha manualmente por teclado', async () => {
    const user = userEvent.setup()
    const aoFechar = vi.fn()
    render(<Notificacao tipo="aviso" titulo="Atenção" aoFechar={aoFechar} />)

    await user.tab()
    await user.keyboard('{Enter}')

    expect(aoFechar).toHaveBeenCalledOnce()
  })

  it('fecha automaticamente após a duração configurada', () => {
    vi.useFakeTimers()
    const aoFechar = vi.fn()
    render(<Notificacao tipo="erro" titulo="Falha" duracao={2000} aoFechar={aoFechar} />)

    vi.advanceTimersByTime(1999)
    expect(aoFechar).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(aoFechar).toHaveBeenCalledOnce()
    vi.useRealTimers()
  })

  it('não cria temporizador quando a duração é zero', () => {
    vi.useFakeTimers()
    const aoFechar = vi.fn()
    render(<Notificacao tipo="sucesso" titulo="Pronto" duracao={0} aoFechar={aoFechar} />)

    vi.runAllTimers()
    expect(aoFechar).not.toHaveBeenCalled()
    vi.useRealTimers()
  })
})
