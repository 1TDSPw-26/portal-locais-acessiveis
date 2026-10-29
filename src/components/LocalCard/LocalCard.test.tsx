import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LocalCard from './LocalCard'

describe('LocalCard', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('deve permitir favoritar e desfavoritar um local', async () => {
    const usuario = userEvent.setup()

    const local = {
      id: 1,
      nome: 'Biblioteca',
      categoria: 'Cultura',
      descricao: 'Biblioteca acessível',
      endereco: 'Rua Central',
      acessibilidades: ['Rampa'],
    }
    
    render(<LocalCard local={local} />)

    const botaoFavoritar = screen.getByRole('button', {
      name: 'Favoritar',
    })

    await usuario.click(botaoFavoritar)

    expect(
      screen.getByRole('button', { name: 'Desfavoritar' })
    ).toHaveAttribute('aria-pressed', 'true')

    await usuario.click(
      screen.getByRole('button', { name: 'Desfavoritar' })
    )

    expect(
      screen.getByRole('button', { name: 'Favoritar' })
    ).toHaveAttribute('aria-pressed', 'false')
  })
})