import { Routes, Route } from 'react-router-dom'
import NotFound from '../pages/NotFound/NotFound'

export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<></>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}