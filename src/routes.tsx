// ⚠️ Arquivo compartilhado. Cada página gerencia suas abas via ?tab=, então
// este arquivo só muda se uma rota nova for criada.
import { Navigate, Route, Routes } from 'react-router'
import { RequireRole } from '@/components/layout'
import { GuiaPage } from '@/pages/guia/GuiaPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { LandingPage } from '@/pages/landing/LandingPage'
import { StudentPage } from '@/pages/student/StudentPage'
import { TeacherPage } from '@/pages/teacher/TeacherPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Guia de estilo do modelo: referência interna do time durante o hackathon. */}
      <Route path="/estilo" element={<GuiaPage />} />
      <Route element={<RequireRole allow={['student']} />}>
        <Route path="/aluno" element={<StudentPage />} />
      </Route>
      <Route element={<RequireRole allow={['teacher']} />}>
        <Route path="/professor" element={<TeacherPage />} />
      </Route>
      <Route element={<RequireRole allow={['director']} />}>
        <Route path="/diretor" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
