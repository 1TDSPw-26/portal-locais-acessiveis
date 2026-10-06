import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter } from 'react-router-dom'
import Sobre from './Sobre'

afterEach(cleanup)

function renderizarSobre() {
  return render(
    <MemoryRouter>
      <Sobre />
    </MemoryRouter>,
  )
}

describe('Página Sobre', () => {
  it('apresenta o propósito do portal com hierarquia de títulos acessível', () => {
    renderizarSobre()

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Informação para tornar a cidade mais acessível',
      }),
    ).toBeInTheDocument()

    const secoes = [
      'Ampliar autonomia por meio da informação',
      'Nossos pilares',
      'Um projeto acadêmico em evolução',
      'Faça parte dessa construção',
    ]

    for (const nome of secoes) {
      expect(screen.getByRole('heading', { level: 2, name: nome })).toBeInTheDocument()
    }
  })

  it('descreve os três pilares em artigos identificáveis', () => {
    renderizarSobre()

    const regiaoPilares = screen.getByRole('region', { name: 'Nossos pilares' })
    const artigos = within(regiaoPilares).getAllByRole('article')

    expect(artigos).toHaveLength(3)
    expect(within(regiaoPilares).getByText('Informação clara')).toBeInTheDocument()
    expect(within(regiaoPilares).getByText('Construção colaborativa')).toBeInTheDocument()
    expect(within(regiaoPilares).getByText('Acessibilidade desde o início')).toBeInTheDocument()
  })

  it('oferece chamadas para ação com destinos corretos e acessíveis por teclado', async () => {
    const user = userEvent.setup()
    renderizarSobre()

    const explorar = screen.getByRole('link', { name: 'Explorar locais' })
    const cadastrar = screen.getByRole('link', { name: 'Cadastrar um local' })

    expect(explorar).toHaveAttribute('href', '/locais')
    expect(cadastrar).toHaveAttribute('href', '/cadastro')

    await user.tab()
    expect(explorar).toHaveFocus()
    await user.tab()
    expect(cadastrar).toHaveFocus()
  })
})
