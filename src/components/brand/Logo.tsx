interface LogoProps {
  /** full = mascote + nome · mark = só o mascote (quadrado). */
  variant?: 'full' | 'mark'
  /** Altura em px. A largura acompanha a proporção do arquivo. */
  height?: number
  className?: string
}

// Arquivos em public/. O "full" usa a versão para fundo claro, que é o fundo do app;
// public/logo.svg (pastel) fica para fundo escuro ou colorido.
export function Logo({ variant = 'full', height = 32, className = '' }: LogoProps) {
  const isMark = variant === 'mark'
  return (
    <img
      src={isMark ? '/logo-mark.svg' : '/logo-light.svg'}
      alt="gizzi"
      height={height}
      width={Math.round(height * (isMark ? 1 : 1370 / 370))}
      className={`block ${className}`}
    />
  )
}
