import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Locais from './Locais'
import * as locaisService from '../../services/locaisService'
import { MemoryRouter } from 'react-router-dom'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Página Locais - Estados de carregamento, erro e vazio', () => {
  it('exibe estado de carregamento enquanto a busca está pendente', () => {
    vi.spyOn(locaisService, 'buscarLocais').mockImplementation(() => new Promise(() => {}))
    render(
      <MemoryRouter>
        <Locais />
      </MemoryRouter>,
    )

    expect(screen.getByText('Carregando locais acessíveis...')).toBeInTheDocument()
  })

  it('exibe estado de erro se a busca falhar', async () => {
    vi.spyOn(locaisService, 'buscarLocais').mockRejectedValue(new Error('Erro de API'))
    render(
      <MemoryRouter>
        <Locais />
      </MemoryRouter>,
    )

    const alerta = await screen.findByRole('alert')
    expect(alerta).toBeInTheDocument()
    expect(screen.getByText('Erro ao carregar locais')).toBeInTheDocument()
  })

  it('exibe estado vazio se a lista de locais for vazia', async () => {
    vi.spyOn(locaisService, 'buscarLocais').mockResolvedValue([])
    render(
      <MemoryRouter>
        <Locais />
      </MemoryRouter>,
    )

    const textoVazio = await screen.findByText('Nenhum local cadastrado')
    expect(textoVazio).toBeInTheDocument()
    expect(screen.getByText('Ainda não há locais cadastrados no portal. Volte em breve!')).toBeInTheDocument()
  })

  it('exibe lista de locais quando a busca for bem-sucedida', async () => {
    vi.spyOn(locaisService, 'buscarLocais').mockResolvedValue([
      {
        id: 1,
        nome: 'Local Teste',
        categoria: 'Cultura',
        descricao: 'Descrição teste',
        endereco: 'Endereço teste',
        accessibilidades: ['Rampa'],
      },
    ])

    render(
      <MemoryRouter>
        <Locais />
      </MemoryRouter>,
    )

    const nomeLocal = await screen.findByText('Local Teste')
    expect(nomeLocal).toBeInTheDocument()
  })
})
