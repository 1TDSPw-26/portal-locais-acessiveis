import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import EditarLocal from './EditarLocal'
import { buscarLocalPorId } from '../../services/locaisService'

describe('EditarLocal', () => {
  beforeEach(() => localStorage.clear())

  it('atualiza e persiste os dados de um local', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/locais/1/editar']}><Routes><Route path="/locais/:id/editar" element={<EditarLocal />} /></Routes></MemoryRouter>)
    await user.clear(screen.getByLabelText('Nome do local'))
    await user.type(screen.getByLabelText('Nome do local'), 'Biblioteca Atualizada')
    await user.click(screen.getByRole('button', { name: 'Salvar alterações' }))
    expect(screen.getByRole('status')).toHaveTextContent('atualizado com sucesso')
    expect(buscarLocalPorId(1)?.nome).toBe('Biblioteca Atualizada')
  })
})
