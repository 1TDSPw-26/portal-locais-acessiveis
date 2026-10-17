import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home/Home'
import Sobre from './Sobre/Sobre'
import Acessibilidade from './Acessibilidade/Acessibilidade'
import Cadastro from './Cadastro/Cadastro'
import Locais from './Locais/Locais'
import NotFound from './NotFound/NotFound'

afterEach(() => {
  cleanup()
  document.title = ''
})

describe('títulos das páginas', () => {
  it.each([
    [Home, 'Página inicial | AcessoLocal'],
    [Sobre, 'Sobre | AcessoLocal'],
    [Acessibilidade, 'Acessibilidade | AcessoLocal'],
    [Cadastro, 'Cadastrar local | AcessoLocal'],
    [Locais, 'Locais acessíveis | AcessoLocal'],
    [NotFound, 'Página não encontrada | AcessoLocal'],
  ])('define o título correto', async (Pagina, titulo) => {
    render(
      <MemoryRouter>
        <Pagina />
      </MemoryRouter>,
    )
    expect(document.title).toBe(titulo)
  })
})
