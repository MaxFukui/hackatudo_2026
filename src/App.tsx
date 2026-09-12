import { BrowserRouter } from 'react-router'
import { AuthProvider } from '@/context/AuthProvider'
import { AppRoutes } from '@/routes'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
