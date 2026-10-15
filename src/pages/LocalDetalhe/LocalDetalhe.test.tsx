import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import LocalDetalhe from './LocalDetalhe'

describe('LocalDetalhe', () => {
  it('renderiza breadcrumb e links de retorno', () => {
    render(
      <MemoryRouter initialEntries={['/locais/1']}>
        <Routes>
          <Route path="/locais/:id" element={<LocalDetalhe />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Locais' })).toHaveAttribute('href', '/locais')
  })
})
