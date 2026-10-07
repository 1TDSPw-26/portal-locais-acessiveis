import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter } from 'react-router-dom'
import Cadastro from './Cadastro'
import { cadastrarLocal } from '../../services/locaisService'

vi.mock('../../services/locaisService', () => ({ cadastrarLocal: vi.fn() }))

const cadastrarLocalMock = vi.mocked(cadastrarLocal)

function renderizar() {
  return render(<MemoryRouter><Cadastro /></MemoryRouter>)
}

async function preencherValido(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Nome do local'), 'Biblioteca')
  await user.type(screen.getByLabelText('Categoria'), 'Cultura')
  await user.type(screen.getByLabelText('Endereço'), 'Rua A, 10')
  await user.type(screen.getByLabelText('Descrição'), 'Entrada com rampa')
}

beforeEach(() => {
  cadastrarLocalMock.mockReset()
})

afterEach(cleanup)

describe('Mensagens por campo do cadastro', () => {
  it('começa sem erros e valida somente o campo visitado', async () => {
    const user = userEvent.setup()
    renderizar()
    expect(screen.queryByText('Informe o nome do local.')).not.toBeInTheDocument()
    await user.click(screen.getByLabelText('Nome do local'))
    await user.tab()
    expect(screen.getByLabelText('Nome do local')).toHaveAccessibleDescription('Informe o nome do local.')
    expect(screen.getByLabelText('Categoria')).not.toHaveAttribute('aria-invalid')
  })

  it('mostra todos os erros ao enviar e foca o primeiro campo inválido', async () => {
    const user = userEvent.setup()
    renderizar()
    await user.click(screen.getByRole('button', { name: 'Cadastrar local' }))
    expect(screen.getByLabelText('Nome do local')).toHaveFocus()
    for (const rotulo of ['Nome do local', 'Categoria', 'Endereço', 'Descrição']) {
      expect(screen.getByLabelText(rotulo)).toHaveAttribute('aria-invalid', 'true')
      expect(screen.getByLabelText(rotulo)).toHaveAccessibleDescription()
    }
    expect(cadastrarLocalMock).not.toHaveBeenCalled()
  })

  it('rejeita espaços e remove apenas o erro corrigido preservando os dados', async () => {
    const user = userEvent.setup()
    renderizar()
    const nome = screen.getByLabelText('Nome do local')
    await user.type(nome, '   ')
    await user.click(screen.getByRole('button', { name: 'Cadastrar local' }))
    expect(nome).toHaveAttribute('aria-invalid', 'true')
    await user.type(nome, 'Biblioteca')
    expect(nome).not.toHaveAttribute('aria-invalid')
    expect(nome).not.toHaveAttribute('aria-describedby')
    expect(screen.getByLabelText('Categoria')).toHaveAttribute('aria-invalid', 'true')
    await user.click(screen.getByRole('button', { name: 'Cadastrar local' }))
    expect(screen.getByLabelText('Categoria')).toHaveFocus()
    expect(nome).toHaveValue('   Biblioteca')
  })
})

describe('Integração do cadastro com o serviço', () => {
  it('envia pelo teclado, indica o envio em andamento e confirma o cadastro', async () => {
    let concluir: (valor: Awaited<ReturnType<typeof cadastrarLocal>>) => void = () => {}
    cadastrarLocalMock.mockReturnValue(new Promise((resolve) => { concluir = resolve }))
    const user = userEvent.setup()
    renderizar()
    await user.tab()
    for (const valor of ['Biblioteca', 'Cultura', 'Rua A, 10', 'Entrada com rampa']) {
      await user.keyboard(valor)
      await user.tab()
    }
    expect(screen.getByRole('button', { name: 'Cadastrar local' })).toHaveFocus()
    await user.keyboard('{Enter}')

    const botao = screen.getByRole('button', { name: 'Enviando cadastro...' })
    expect(botao).toBeDisabled()
    await user.click(botao)
    expect(cadastrarLocalMock).toHaveBeenCalledTimes(1)
    expect(cadastrarLocalMock).toHaveBeenCalledWith({
      nome: 'Biblioteca',
      categoria: 'Cultura',
      endereco: 'Rua A, 10',
      descricao: 'Entrada com rampa',
      accessibilidades: [],
    })

    concluir({ id: 19, nome: 'Biblioteca', categoria: 'Cultura', endereco: 'Rua A, 10', descricao: 'Entrada com rampa', accessibilidades: [] })
    expect(await screen.findByText('Local "Biblioteca" cadastrado com sucesso.')).toHaveAttribute('role', 'status')
    expect(screen.getByRole('link', { name: 'Ver lista de locais' })).toHaveAttribute('href', '/locais')
    expect(screen.getByLabelText('Nome do local')).toHaveValue('')
    expect(screen.getByRole('button', { name: 'Cadastrar local' })).toBeEnabled()
  })

  it('mostra o erro do serviço e preserva os dados digitados', async () => {
    cadastrarLocalMock.mockRejectedValue(new Error('Já existe um local cadastrado com este nome e endereço.'))
    const user = userEvent.setup()
    renderizar()
    await preencherValido(user)
    await user.click(screen.getByRole('button', { name: 'Cadastrar local' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Já existe um local cadastrado com este nome e endereço.')
    expect(screen.getByLabelText('Nome do local')).toHaveValue('Biblioteca')
    expect(screen.getByLabelText('Descrição')).toHaveValue('Entrada com rampa')
    expect(screen.getByRole('button', { name: 'Cadastrar local' })).toBeEnabled()
    expect(screen.queryByRole('link', { name: 'Ver lista de locais' })).not.toBeInTheDocument()
  })
})
