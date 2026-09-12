import { useNavigate } from 'react-router'
import { Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'

// Sair da área logada. Vai em <AppShell topbarActions>.
export function LogoutButton() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        logout()
        navigate('/')
      }}
    >
      Sair
    </Button>
  )
}
