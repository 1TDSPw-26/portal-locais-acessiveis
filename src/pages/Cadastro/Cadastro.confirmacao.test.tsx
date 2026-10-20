import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cadastro from './Cadastro'

describe('Confirmação do cadastro', () => {
  it('abre o diálogo com o nome e permite confirmar', async () => {
    const user = userEvent.setup()
    render(<Cadastro />)

    await user.type(screen.getByLabelText('Nome do local'), 'Biblioteca')
    await user.type(screen.getByLabelText('Categoria'), 'Educação')
    await user.type(screen.getByLabelText('Endereço'), 'Rua A, 10')
    await user.type(screen.getByLabelText('Descrição'), 'Entrada com rampa')
    await user.click(screen.getByRole('button', { name: 'Validar dados' }))

    expect(screen.getByRole('heading', { name: 'Confirmar cadastro' })).toBeInTheDocument()
    expect(screen.getByText('Biblioteca', { selector: 'strong' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Confirmar cadastro' }))
    expect(screen.getByRole('status')).toHaveTextContent('Local "Biblioteca" cadastrado com sucesso.')
  })
})
