export function Spinner({ label = 'Carregando…' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center gap-2 p-4 text-sm text-slate-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
      {label}
    </div>
  )
}
