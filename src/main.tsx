import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Home/index.tsx'
import Locais from './pages/Locais/Locais.tsx'
import Cadastro from './routes/Cadastro/index.tsx'
import Sobre from './routes/Sobre/index.tsx'
import NotFound from './pages/NotFound/NotFound.tsx'
import LocalDetalhe from './pages/LocalDetalhe/LocalDetalhe.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/locais',
        element: <Locais />,
      },
      {
        path: '/locais/:id',
        element: <LocalDetalhe />,
      },
      {
        path: '/cadastro',
        element: <Cadastro />,
      },
      {
        path: '/sobre',
        element: <Sobre />,
      },
      {
        path: '/*',
        element: <NotFound />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)