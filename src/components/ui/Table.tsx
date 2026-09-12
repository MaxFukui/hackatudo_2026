import type { ReactNode } from 'react'
import { usePressable } from '@/hooks/usePressable'

export interface Column<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  /** Números e valores à direita. */
  align?: 'left' | 'right'
  width?: string
  /** No celular, esta coluna vira o título do item (a primeira coluna é o padrão). */
  primary?: boolean
  /** Esconde no celular: coluna de apoio que não cabe. */
  hideOnMobile?: boolean
}

interface TableProps<T> {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  onRowClick?: (row: T) => void
  empty?: string
}

// Desktop: tabela. Celular: cada linha vira um bloco com os pares rótulo/valor —
// nada de arrastar para o lado para ler a terceira coluna.
export function Table<T>({ columns, rows, rowKey, onRowClick, empty = 'Nada por aqui.' }: TableProps<T>) {
  const primary = columns.find((c) => c.primary) ?? columns[0]
  const rest = columns.filter((c) => c !== primary && !c.hideOnMobile)

  if (rows.length === 0) {
    return <p className="px-4 py-8 text-center text-small text-fg-muted md:px-5">{empty}</p>
  }

  return (
    <>
      {/* Celular */}
      <ul className="divide-y divide-border md:hidden">
        {rows.map((row) => (
          <MobileRow key={rowKey(row)} row={row} primary={primary} rest={rest} onClick={onRowClick ? () => onRowClick(row) : undefined} />
        ))}
      </ul>

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-small">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  style={{ width: col.width }}
                  className={`px-5 py-2.5 text-left text-caption font-medium text-fg-muted ${col.align === 'right' ? 'text-right' : ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <DesktopRow key={rowKey(row)} row={row} columns={columns} onClick={onRowClick ? () => onRowClick(row) : undefined} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

interface RowProps<T> {
  row: T
  onClick?: () => void
}

function MobileRow<T>({ row, primary, rest, onClick }: RowProps<T> & { primary: Column<T>; rest: Column<T>[] }) {
  const pressable = usePressable(onClick)
  return (
    <li>
      <div
        {...pressable}
        className={`relative block w-full px-4 py-3 text-left transition-colors duration-fast ${onClick ? 'cursor-pointer pr-10 active:bg-surface-muted' : ''}`}
      >
        <div className="text-body font-medium text-fg">{primary.render(row)}</div>
        {onClick && (
          <svg
            className="absolute top-1/2 right-4 -translate-y-1/2 text-fg-subtle"
            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        )}
        {rest.length > 0 && (
          <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-small">
            {rest.map((col) => (
              <div key={col.key} className="contents">
                <dt className="text-fg-muted">{col.header}</dt>
                <dd className={`min-w-0 ${col.align === 'right' ? 'text-right' : ''}`} data-numeric>
                  {col.render(row)}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </li>
  )
}

// Linha clicável no desktop: foco por teclado e Enter, como no celular.
function DesktopRow<T>({ row, columns, onClick }: RowProps<T> & { columns: Column<T>[] }) {
  const pressable = usePressable(onClick)
  return (
    <tr
      {...pressable}
      className={`border-b border-border transition-colors duration-fast last:border-b-0 ${onClick ? 'cursor-pointer hover:bg-surface-muted active:bg-border focus-visible:bg-surface-muted' : ''}`}
    >
      {columns.map((col) => (
        <td key={col.key} className={`px-5 py-3 ${col.align === 'right' ? 'text-right' : ''}`}>
          {col.render(row)}
        </td>
      ))}
    </tr>
  )
}
