import { describe, it, expect } from 'vitest'
import { useRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResumoErros from './ResumoErros'
import type { ErroFormulario } from './ResumoErros'

function Formulario({ erros }: { erros: ErroFormulario[] }) {
  const nomeRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <ResumoErros erros={erros} referencias={{ nome: nomeRef, email: emailRef }} />
      <input aria-label="Nome" ref={nomeRef} />
      <input aria-label="E-mail" ref={emailRef} />
    </>
  )
}

describe('ResumoErros', () => {
  it('não renderiza nada com zero erros', () => {
    const { container } = render(<Formulario erros={[]} />)
    expect(container.querySelector('section')).toBeNull()
  })

  it('mostra um erro no singular', () => {
    render(<Formulario erros={[{ campo: 'nome', mensagem: 'Informe o nome' }]} />)
    expect(screen.getByRole('heading', { name: '1 erro encontrado' })).not.toBeNull()
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })

  it('mostra vários erros na ordem recebida', () => {
    render(
      <Formulario
        erros={[
          { campo: 'email', mensagem: 'E-mail inválido' },
          { campo: 'nome', mensagem: 'Informe o nome' },
        ]}
      />,
    )
    expect(screen.getByRole('heading', { name: '2 erros encontrados' })).not.toBeNull()
    const botoes = screen.getAllByRole('button')
    expect(botoes[0].textContent).toBe('E-mail inválido')
    expect(botoes[1].textContent).toBe('Informe o nome')
  })

  it('não move o foco sem ação do usuário', () => {
    render(<Formulario erros={[{ campo: 'nome', mensagem: 'Informe o nome' }]} />)
    expect(document.activeElement).toBe(document.body)
  })

  it('move o foco para o campo ao ativar o erro', () => {
    render(<Formulario erros={[{ campo: 'email', mensagem: 'E-mail inválido' }]} />)
    fireEvent.click(screen.getByRole('button', { name: 'E-mail inválido' }))
    expect(document.activeElement).toBe(screen.getByLabelText('E-mail'))
  })

  it('ignora erro de campo que não existe', () => {
    render(<Formulario erros={[{ campo: 'cpf', mensagem: 'CPF inválido' }]} />)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('ignora chave herdada que não é um campo do formulário', () => {
    render(<Formulario erros={[{ campo: 'toString', mensagem: 'Erro inválido' }]} />)
    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.queryByRole('heading')).toBeNull()
  })

  it.each([
    ['Enter', '{Enter}'],
    ['Espaço', ' '],
  ])('ativa o erro com %s e foca somente o campo correspondente', async (_nome, tecla) => {
    const user = userEvent.setup()
    render(
      <Formulario
        erros={[
          { campo: 'nome', mensagem: 'Informe o nome' },
          { campo: 'email', mensagem: 'E-mail inválido' },
        ]}
      />,
    )

    await user.tab()
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'E-mail inválido' }))

    await user.keyboard(tecla)

    expect(document.activeElement).toBe(screen.getByLabelText('E-mail'))
    expect(document.activeElement).not.toBe(screen.getByLabelText('Nome'))
  })
})