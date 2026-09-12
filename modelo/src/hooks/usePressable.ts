import type { KeyboardEvent } from 'react'

// Torna um bloco de conteúdo (card, linha de lista) acionável sem virar <button>:
// <button> só aceita conteúdo de frase — h2, div e dl dentro dele são HTML inválido.
// Aqui: role, foco por teclado e Enter/Espaço, como um botão de verdade.
export function usePressable(onPress?: () => void) {
  if (!onPress) return {}
  return {
    role: 'button' as const,
    tabIndex: 0,
    onClick: onPress,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.target !== e.currentTarget) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onPress()
      }
    },
  }
}
