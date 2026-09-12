import { useSearchParams } from 'react-router'

// Aba ativa vive na URL (?tab=streak) — link compartilhável e sem rotas aninhadas.
export function useTab<T extends string>(tabs: readonly T[], fallback: T): [T, (tab: T) => void] {
  const [params, setParams] = useSearchParams()
  const current = params.get('tab')
  const active = tabs.includes(current as T) ? (current as T) : fallback

  const setTab = (tab: T) => {
    setParams(tab === fallback ? {} : { tab }, { replace: true })
  }

  return [active, setTab]
}
