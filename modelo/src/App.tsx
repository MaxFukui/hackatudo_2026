import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { GuiaPage } from '@/pages/guia/GuiaPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuiaPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
