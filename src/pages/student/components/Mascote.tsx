import { useEffect, useState } from 'react'
import type { Mascote as MascoteData, MascoteTone, StageIndex } from '@/pages/student/lib/mascotes'

interface MascoteProps {
  mascote: MascoteData
  /** 0 ovinho · 1 rachando · 2 gizinho · 3 giz brilhante */
  stage: StageIndex
  /** Largura em px. */
  size?: number
  /** Sem flutuar nem piscar: lista, thumbnail, chat. */
  still?: boolean
  /** Muda o valor → o mascote pula, balança e abre a boca (recompensa). */
  cheer?: number
  className?: string
}

// Os mascotes são o ovinho da landing (pages/landing/components/Pet.tsx) em três cores:
// cada matéria tem um gizinho que nasce de um ovo com pintinhas na sua cor e ganha um acessório.
// Só classes de token (fill-laranja, stroke-escuro…): mascote e interface saem da mesma paleta.
const COLORS: Record<MascoteTone, { body: string; spot1: string; spot2: string; spot3: string }> = {
  laranja: { body: 'fill-laranja', spot1: 'fill-laranja', spot2: 'fill-amarelo', spot3: 'fill-rosa-esc' },
  azul: { body: 'fill-azul-esc', spot1: 'fill-azul-claro', spot2: 'fill-azul-esc', spot3: 'fill-amarelo' },
  verde: { body: 'fill-verde-esc', spot1: 'fill-verde-agua', spot2: 'fill-verde-esc', spot3: 'fill-laranja' },
}

const LINE = 'stroke-escuro'

export function Mascote({ mascote, stage, size = 160, still = false, cheer = 0, className = '' }: MascoteProps) {
  // Comemoração dura 0,9 s (pulo no wrapper + boca aberta); depois volta a flutuar.
  const [cheering, setCheering] = useState(false)
  useEffect(() => {
    if (!cheer) return
    const on = setTimeout(() => setCheering(true), 0)
    const off = setTimeout(() => setCheering(false), 950)
    return () => {
      clearTimeout(on)
      clearTimeout(off)
    }
  }, [cheer])

  const c = COLORS[mascote.tone]
  const label = `${mascote.name}: ${['ovinho', 'ovinho rachando', 'gizinho', 'giz brilhante'][stage]}`

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center ${cheering ? 'animate-mascote-cheer' : still ? '' : 'animate-mascote-float'} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label={label} className="overflow-visible">
        <ellipse cx="100" cy="190" rx="54" ry="7" className="fill-escuro/15" />
        {stage === 0 && <Egg c={c} />}
        {stage === 1 && (
          <>
            <Egg c={c} />
            <Crack />
          </>
        )}
        {stage === 2 && <Baby c={c} tone={mascote.tone} still={still} talking={cheering} />}
        {stage === 3 && <Chalk c={c} tone={mascote.tone} still={still} talking={cheering} />}
      </svg>
    </div>
  )
}

type Colors = (typeof COLORS)[MascoteTone]

function Egg({ c }: { c: Colors }) {
  return (
    <>
      <ellipse cx="100" cy="112" rx="58" ry="74" className={`fill-branco ${LINE}`} strokeWidth="5" />
      <circle cx="76" cy="92" r="9" className={c.spot1} />
      <circle cx="122" cy="76" r="6" className={c.spot3} />
      <circle cx="118" cy="138" r="11" className={c.spot1} />
      <circle cx="80" cy="150" r="6" className={c.spot2} />
    </>
  )
}

function Crack() {
  return (
    <polyline
      points="44,108 60,96 74,112 90,94 106,112 122,94 138,110 156,100"
      fill="none"
      className={LINE}
      strokeWidth="5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  )
}

/** Olhos e boca, brancos como no giz do logo. Piscam de vez em quando; boca abre ao comemorar. */
function Face({ x, y, still, talking, scale = 1 }: { x: number; y: number; still: boolean; talking: boolean; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="stroke-branco" fill="none" strokeLinecap="round" strokeWidth="6">
      <g className={still ? '' : 'animate-mascote-blink'}>
        <ellipse cx="-13" cy="0" rx="4" ry="6" className="fill-branco" strokeWidth="3" />
        <ellipse cx="13" cy="6" rx="4" ry="6" className="fill-branco" strokeWidth="3" />
        {/* pupilas: o giz do logo não tem, mas para a criança o olhar fica mais vivo */}
        <circle cx="-12" cy="1" r="2" className="fill-escuro" stroke="none" />
        <circle cx="14" cy="7" r="2" className="fill-escuro" stroke="none" />
      </g>
      {talking ? <ellipse cx="2" cy="24" rx="7" ry="6" className="fill-branco" strokeWidth="3" /> : <path d="M-11 20 Q-1 30 11 24" />}
    </g>
  )
}

/** Acessório que diferencia cada gizinho: chifres (Xis), óculos (Zeta), brotinho (Kiko). */
function Accessory({ tone, x, y, scale = 1 }: { tone: MascoteTone; x: number; y: number; scale?: number }) {
  if (tone === 'laranja')
    return (
      <g transform={`translate(${x} ${y}) scale(${scale})`} className={`fill-amarelo ${LINE}`} strokeWidth="3" strokeLinejoin="round">
        <path d="M-22 -2 L-30 -30 L-8 -12 Z" />
        <path d="M22 -2 L30 -30 L8 -12 Z" />
      </g>
    )
  if (tone === 'azul')
    return (
      <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" className={LINE} strokeWidth="4">
        <circle cx="-13" cy="0" r="11" />
        <circle cx="13" cy="6" r="11" />
        <path d="M-2 2 L2 4" />
      </g>
    )
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="fill-success" stroke="none">
      <path d="M0 0 Q-4 -18 -18 -22 Q-8 -6 0 0 Z" />
      <path d="M0 0 Q6 -18 20 -20 Q10 -4 0 0 Z" />
      <rect x="-2" y="-10" width="4" height="12" rx="2" />
    </g>
  )
}

/** Gizinho recém-nascido: toquinho curto saindo da casca. */
function Baby({ c, tone, still, talking }: { c: Colors; tone: MascoteTone; still: boolean; talking: boolean }) {
  return (
    <>
      <g transform="rotate(14 100 100)">
        <rect x="64" y="42" width="72" height="116" rx="36" className={c.body} />
        <ellipse cx="100" cy="64" rx="26" ry="17" className="fill-branco" />
      </g>
      <Accessory tone={tone} x={99} y={tone === 'azul' ? 106 : 52} scale={0.8} />
      <Face x={99} y={106} still={still} talking={talking} />
      {/* casca por cima */}
      <path
        d="M42 130 L58 118 L74 132 L90 118 L106 132 L122 118 L138 132 L158 122 Q162 188 100 188 Q38 188 42 130 Z"
        className={`fill-branco ${LINE}`}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="118" cy="160" r="9" className={c.spot1} />
      <circle cx="78" cy="168" r="5" className={c.spot3} />
    </>
  )
}

/** Giz brilhante: o mascote do logo, na cor da matéria, com as faíscas e o acessório. */
function Chalk({ c, tone, still, talking }: { c: Colors; tone: MascoteTone; still: boolean; talking: boolean }) {
  return (
    <>
      <g fill="none" strokeLinecap="round" className={still ? '' : 'animate-twinkle'}>
        <path d="M62 48 L70 70" className="stroke-rosa-esc" strokeWidth="16" />
        <path d="M30 78 L52 90" className="stroke-azul-esc" strokeWidth="17" />
        <path d="M32 120 L46 116" className="stroke-azul-claro" strokeWidth="16" />
      </g>
      <g transform="rotate(32 110 108)">
        <rect x="76" y="34" width="68" height="150" rx="34" className={c.body} />
        <ellipse cx="110" cy="58" rx="26" ry="17" className="fill-branco" />
      </g>
      <Accessory tone={tone} x={tone === 'laranja' ? 112 : 104} y={tone === 'azul' ? 104 : 62} scale={0.9} />
      <Face x={104} y={104} still={still} talking={talking} />
    </>
  )
}
