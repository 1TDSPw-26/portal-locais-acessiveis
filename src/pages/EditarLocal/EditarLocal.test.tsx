import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import EditarLocal from './EditarLocal'
import { buscarLocalPorId } from '../../services/locaisService'

describe('EditarLocal', () => {
  beforeEach(() => localStorage.clear())

  it('impede editar um local para duplicar outro existente', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/locais/1/editar']}><Routes><Route path="/locais/:id/editar" element={<EditarLocal />} /></Routes></MemoryRouter>)
    const original = buscarLocalPorId(1)
    const outro = buscarLocalPorId(2)
    if (!original) throw new Error('Local original não encontrado')
    if (!outro) throw new Error('Local de teste não encontrado')
    await user.clear(screen.getByLabelText('Nome do local'))
    await user.type(screen.getByLabelText('Nome do local'), `  ${outro.nome.toLocaleUpperCase('pt-BR')}  `)
    await user.clear(screen.getByLabelText('Endereço'))
    await user.type(screen.getByLabelText('Endereço'), `  ${outro.endereco}  `)
    await user.click(screen.getByRole('button', { name: 'Salvar alterações' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Já existe um local com as mesmas informações.')
    expect(buscarLocalPorId(1)).toEqual(original)
  })
  it('atualiza e persiste os dados de um local', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/locais/1/editar']}><Routes><Route path="/locais/:id/editar" element={<EditarLocal />} /></Routes></MemoryRouter>)
    await user.clear(screen.getByLabelText('Descrição'))
    await user.type(screen.getByLabelText('Descrição'), 'Descrição atualizada')
    await user.click(screen.getByRole('button', { name: 'Salvar alterações' }))
    expect(screen.getByRole('status')).toHaveTextContent('atualizado com sucesso')
    expect(buscarLocalPorId(1)?.descricao).toBe('Descrição atualizada')
  })
})
