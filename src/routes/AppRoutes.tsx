import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/MainLayout/Main'
import Cadastro from '../pages/Cadastro/Cadastro'
import Home from '../pages/Home/Home'
import Locais from '../pages/Locais/Locais'
import Sobre from '../pages/Sobre/Sobre'
import Acessibilidade from '../pages/Acessibilidade/Acessibilidade'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="locais" element={<Locais />} />
        <Route path="cadastrar" element={<Cadastro />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="acessibilidade" element={<Acessibilidade />} />
      </Route>
    </Routes>
  )
}