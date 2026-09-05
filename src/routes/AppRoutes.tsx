
import { Routes, Route } from 'react-router-dom'

import MainLayout from '../components/MainLayout/Main'
import Cadastro from '../pages/Cadastro/Cadastro'
import Home from '../pages/Home/Home'
import Locais from '../pages/Locais/Locais'
import Sobre from '../pages/Sobre/Sobre'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="locais" element={<Locais />} />
                <Route path="cadastro" element={<Cadastro />} />
                <Route path="sobre" element={<Sobre />} />
                
            </Route>
        </Routes>
    )
}

export default AppRoutes