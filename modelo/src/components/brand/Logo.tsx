// Logo do Gizzi em SVG, reconstruída a partir da arte oficial com as cores da paleta.
// Mascote: um giz laranja piscando. Palavra: GIZZI em Fredoka, uma cor da paleta por letra.
// Quando o vetor oficial existir, ele substitui só este arquivo — a API fica.

interface LogoProps {
  /** full: mascote + palavra · mark: só o giz (favicon, avatar, ícone) · wordmark: só a palavra */
  variant?: 'full' | 'mark' | 'wordmark'
  /** Altura em px. A largura acompanha. */
  height?: number
  /** Só o nome, para leitores de tela. */
  title?: string
}

const LETTERS: { char: string; fill: string }[] = [
  { char: 'G', fill: 'var(--color-azul-esc)' },
  { char: 'I', fill: 'var(--color-verde-esc)' },
  { char: 'Z', fill: 'var(--color-rosa-esc)' },
  { char: 'Z', fill: 'var(--color-azul-claro)' },
  { char: 'I', fill: 'var(--color-rosa-claro)' },
]

function Mark() {
  return (
    <g>
      {/* faíscas */}
      <rect x="26" y="2" width="12" height="28" rx="6" fill="var(--color-rosa-esc)" transform="rotate(26 32 16)" />
      <rect x="6" y="20" width="12" height="30" rx="6" fill="var(--color-amarelo)" transform="rotate(-60 12 35)" />
      <rect x="4" y="48" width="12" height="22" rx="6" fill="var(--color-azul-claro)" transform="rotate(-86 10 59)" />
      {/* giz: cilindro grosso, inclinado, ponta clara em cima */}
      <g transform="rotate(35 64 66)">
        <rect x="42" y="16" width="44" height="100" rx="22" fill="var(--color-laranja)" />
        <ellipse cx="64" cy="23" rx="17" ry="8" fill="#FFF6EF" />
        {/* olho piscando, olho aberto, sorriso — branco, traço redondo */}
        <path d="M50 58c3 -4 7 -4 10 0" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="75" cy="57" r="3.2" fill="#FFFFFF" />
        <path d="M55 70c4 6 14 6 18 0" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
    </g>
  )
}

function Word({ x = 0 }: { x?: number }) {
  return (
    <text
      x={x}
      y="86"
      fontFamily="var(--font-display)"
      fontWeight="700"
      fontSize="92"
      letterSpacing="0"
      dominantBaseline="auto"
    >
      {LETTERS.map((l, i) => (
        <tspan key={i} fill={l.fill}>
          {l.char}
        </tspan>
      ))}
    </text>
  )
}

export function Logo({ variant = 'full', height = 40, title = 'Gizzi' }: LogoProps) {
  const box = { full: '0 0 380 116', mark: '0 0 116 116', wordmark: '0 0 270 116' }[variant]
  const ratio = { full: 380 / 116, mark: 1, wordmark: 270 / 116 }[variant]
  return (
    <svg viewBox={box} height={height} width={height * ratio} role="img" aria-label={title} style={{ display: 'block' }}>
      {variant !== 'wordmark' && <Mark />}
      {variant === 'full' && <Word x={128} />}
      {variant === 'wordmark' && <Word x={4} />}
    </svg>
  )
}
