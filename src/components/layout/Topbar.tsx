import { useNavigate } from 'react-router'
import { Avatar, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'

export function Topbar({ userName }: { userName: string }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4">
      <span className="font-semibold text-indigo-700">Educa</span>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-600 sm:inline">{userName}</span>
        <Avatar name={userName} size={32} />
        <Button
          variant="ghost"
          onClick={() => {
            logout()
            navigate('/')
          }}
        >
          Sair
        </Button>
      </div>
    </header>
  )
}
