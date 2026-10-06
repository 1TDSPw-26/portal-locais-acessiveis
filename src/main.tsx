import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Home/index.tsx'
import Locais from './pages/Locais/Locais'
import Cadastro from './routes/Cadastro/index.tsx'
import Sobre from './routes/Sobre/index.tsx'
import NotFound from './pages/NotFound/NotFound.tsx'
import Detalhe from './pages/Locais/Detalhe.tsx'

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
        element: <Detalhe />,
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
    <RouterProvider router={router} />
  </StrictMode>,
)