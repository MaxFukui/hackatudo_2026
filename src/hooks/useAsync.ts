import { useEffect, useState, type DependencyList } from 'react'

export interface AsyncState<T> {
  data: T | null
  error: Error | null
  loading: boolean
}

// Carrega dados de services/. Refaz a chamada quando `deps` muda.
export function useAsync<T>(load: () => Promise<T>, deps: DependencyList = []): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, error: null, loading: true })

  // oxlint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let cancelled = false
    load().then(
      (data) => !cancelled && setState({ data, error: null, loading: false }),
      (error: Error) => !cancelled && setState({ data: null, error, loading: false }),
    )
    return () => {
      cancelled = true
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
