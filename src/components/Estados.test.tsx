import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Loading from './Loading/Loading'
import EstadoVazio from './EstadoVazio/EstadoVazio'
import EstadoErro from './EstadoErro/EstadoErro'

describe('estados de interface', () => {
  it('anuncia carregamento e estado vazio', () => {
    render(<><Loading /><EstadoVazio /></>)
    expect(screen.getAllByRole('status')[0]).toHaveTextContent('Carregando...')
    expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument()
  })

  it('permite tentar novamente após erro', async () => {
    const user = userEvent.setup()
    const aoTentarNovamente = vi.fn()
    render(<EstadoErro aoTentarNovamente={aoTentarNovamente} />)
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(aoTentarNovamente).toHaveBeenCalledOnce()
  })
})
