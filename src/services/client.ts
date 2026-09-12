// Mock do backend. Toda chamada devolve Promise para que a troca por
// fetch('/api/v1/...') aconteça só dentro de services/, sem tocar em componentes.
import raw from '@/data/db.json'
import type { Database } from '@/types'

export const db = raw as Database

const LATENCY_MS = 150

export function respond<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), LATENCY_MS)
  })
}

export function notFound(resource: string, id: string): Promise<never> {
  return Promise.reject(new Error(`${resource} "${id}" não encontrado`))
}
