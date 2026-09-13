interface LogoProps {
  /** full = mascote + nome · mark = só o mascote (quadrado). */
  variant?: 'full' | 'mark'
  /** Fundo escuro: usa as cores pastel originais (public/logo.svg). */
  onDark?: boolean
  /** Altura em px. A largura acompanha a proporção do arquivo. */
  height?: number
  className?: string
}

// Arquivos em public/. Fundo claro usa logo-light.svg (tons mais fechados para o nome não sumir);
// fundo escuro usa logo.svg (pastel).
export function Logo({ variant = 'full', onDark = false, height = 32, className = '' }: LogoProps) {
  const isMark = variant === 'mark'
  const src = isMark ? '/logo-mark.svg' : onDark ? '/logo.svg' : '/logo-light.svg'
  return (
    <img
      src={src}
      alt="gizzi"
      height={height}
      width={Math.round(height * (isMark ? 1 : 1370 / 370))}
      className={`block ${className}`}
    />
  )
}
