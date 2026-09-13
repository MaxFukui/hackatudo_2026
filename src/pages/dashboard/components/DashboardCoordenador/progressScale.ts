export const PROGRESS_SCALE = [
  '#91131E',
  '#9D2723',
  '#A83A27',
  '#B24D2C',
  '#BA6133',
  '#BD7840',
  '#A98542',
  '#898044',
  '#657443',
  '#41693D',
] as const

export function progressColorFor(value: number) {
  const index = Math.min(9, Math.max(0, Math.floor(value / 10)))
  return PROGRESS_SCALE[index]
}
