import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Home/index.tsx'
import Locais from './routes/Locais/index.tsx'
import Cadastro from './routes/Cadastro/index.tsx'
import Sobre from './routes/Sobre/index.tsx'
import NotFound from './pages/NotFound/NotFound.tsx'

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