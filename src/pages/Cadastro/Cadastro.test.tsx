import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import Cadastro from './Cadastro'

afterEach(cleanup)

describe('Mensagens por campo do cadastro', () => {
  it('começa sem erros e valida somente o campo visitado', async () => {
    const user = userEvent.setup()
    render(<Cadastro />)
    expect(screen.queryByText('Informe o nome do local.')).not.toBeInTheDocument()
    await user.click(screen.getByLabelText('Nome do local'))
    await user.tab()
    expect(screen.getByLabelText('Nome do local')).toHaveAccessibleDescription('Informe o nome do local.')
    expect(screen.getByLabelText('Categoria')).not.toHaveAttribute('aria-invalid')
  })

  it('mostra todos os erros ao enviar e foca o primeiro campo inválido', async () => {
    const user = userEvent.setup()
    render(<Cadastro />)
    await user.click(screen.getByRole('button', { name: 'Validar dados' }))
    expect(screen.getByLabelText('Nome do local')).toHaveFocus()
    for (const rotulo of ['Nome do local', 'Categoria', 'Endereço', 'Descrição']) {
      expect(screen.getByLabelText(rotulo)).toHaveAttribute('aria-invalid', 'true')
      expect(screen.getByLabelText(rotulo)).toHaveAccessibleDescription()
    }
  })

  it('rejeita espaços e remove apenas o erro corrigido preservando os dados', async () => {
    const user = userEvent.setup()
    render(<Cadastro />)
    const nome = screen.getByLabelText('Nome do local')
    await user.type(nome, '   ')
    await user.click(screen.getByRole('button', { name: 'Validar dados' }))
    expect(nome).toHaveAttribute('aria-invalid', 'true')
    await user.type(nome, 'Biblioteca')
    expect(nome).not.toHaveAttribute('aria-invalid')
    expect(nome).not.toHaveAttribute('aria-describedby')
    expect(screen.getByLabelText('Categoria')).toHaveAttribute('aria-invalid', 'true')
    await user.click(screen.getByRole('button', { name: 'Validar dados' }))
    expect(screen.getByLabelText('Categoria')).toHaveFocus()
    expect(nome).toHaveValue('   Biblioteca')
  })

  it('valida por teclado sem informar salvamento e limpa o status ao editar', async () => {
    const user = userEvent.setup()
    render(<Cadastro />)
    await user.tab()
    for (const valor of ['Biblioteca', 'Cultura', 'Rua A, 10', 'Entrada com rampa']) {
      await user.keyboard(valor)
      await user.tab()
    }
    expect(screen.getByRole('button', { name: 'Validar dados' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('status')).toHaveTextContent('nenhum local foi salvo')
    await user.clear(screen.getByLabelText('Nome do local'))
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    expect(screen.getByLabelText('Nome do local')).toHaveAttribute('aria-invalid', 'true')
  })
})
