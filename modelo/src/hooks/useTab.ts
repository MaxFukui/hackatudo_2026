import { useSearchParams } from 'react-router'

// Aba ativa vive na URL (?tab=x): link compartilhável, botão voltar funciona, sem rota aninhada.
export function useTab<T extends string>(tabs: readonly T[], fallback: T): [T, (tab: T) => void] {
  const [params, setParams] = useSearchParams()
  const current = params.get('tab')
  const active = tabs.includes(current as T) ? (current as T) : fallback
  // Mexe só em ?tab=; outros parâmetros (filtro, busca) ficam.
  const setTab = (tab: T) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (tab === fallback) next.delete('tab')
        else next.set('tab', tab)
        return next
      },
      { replace: true },
    )
  return [active, setTab]
}
