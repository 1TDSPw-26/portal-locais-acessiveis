import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/locais" element={<App />} />
        <Route path="/sobre" element={<App />} />
        <Route path="/acessibilidade" element={<App />} />
        <Route path="/cadastro" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
