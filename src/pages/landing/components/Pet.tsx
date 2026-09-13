import './pet.css'
import type { PetStage } from './pet-stages'
import { PET_STAGES } from './pet-stages'

interface PetProps {
  stage: PetStage
  size?: number
  /** Muda a cada ganho de pontinhos: o monstrinho balança uma vez. */
  wiggleKey?: number
  className?: string
}

// Monstrinho de giz — o mascote do logo (public/logo-mark.svg) — em SVG puro.
// Cores só da paleta do modelo (tokens.css).
export function Pet({ stage, size = 200, wiggleKey, className = '' }: PetProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={`Monstrinho: ${PET_STAGES[stage].name}`}
      className={`overflow-visible ${className}`}
    >
      <ellipse cx="100" cy="190" rx="54" ry="7" className="fill-escuro/15" />
      <g key={wiggleKey} className={wiggleKey ? 'pet-wiggle' : undefined}>
        {stage === 0 && <EggShape />}
        {stage === 1 && <CrackingEgg />}
        {stage === 2 && <BabyChalk />}
        {stage === 3 && <Chalk />}
      </g>
    </svg>
  )
}

const LINE = 'stroke-escuro'

function EggShape() {
  return (
    <>
      <ellipse cx="100" cy="112" rx="58" ry="74" className={`fill-branco ${LINE}`} strokeWidth="5" />
      <circle cx="76" cy="92" r="9" className="fill-azul-claro" />
      <circle cx="122" cy="76" r="6" className="fill-rosa-esc" />
      <circle cx="118" cy="138" r="11" className="fill-azul-claro" />
      <circle cx="80" cy="150" r="6" className="fill-laranja" />
    </>
  )
}

function CrackingEgg() {
  return (
    <>
      <EggShape />
      <polyline
        points="44,108 60,96 74,112 90,94 106,112 122,94 138,110 156,100"
        fill="none"
        className={LINE}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </>
  )
}

// Gizinho recém-nascido: toquinho curto saindo da casca, os dois olhos abertos.
function BabyChalk() {
  return (
    <>
      <g transform="rotate(14 100 100)">
        <rect x="64" y="42" width="72" height="116" rx="36" className="fill-laranja" />
        <ellipse cx="100" cy="64" rx="26" ry="17" className="fill-branco" />
      </g>
      <g className="stroke-branco" fill="none" strokeLinecap="round" strokeWidth="6">
        <ellipse cx="86" cy="104" rx="4" ry="6" className="fill-branco" strokeWidth="3" />
        <ellipse cx="112" cy="110" rx="4" ry="6" className="fill-branco" strokeWidth="3" />
        <path d="M88 124 Q98 134 110 128" />
      </g>
      {/* casca por cima */}
      <path
        d="M42 130 L58 118 L74 132 L90 118 L106 132 L122 118 L138 132 L158 122 Q162 188 100 188 Q38 188 42 130 Z"
        className={`fill-branco ${LINE}`}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="118" cy="160" r="9" className="fill-azul-claro" />
      <circle cx="78" cy="168" r="5" className="fill-rosa-esc" />
    </>
  )
}

// Giz brilhante: o mascote do logo, piscando, com as faíscas.
function Chalk() {
  return (
    <g transform="translate(100 107) scale(0.44) translate(-333 -275)">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M242 116 L264 170" className="stroke-rosa-esc" strokeWidth="42" />
        <path d="M164 182 L220 212" className="stroke-azul-esc" strokeWidth="44" />
        <path d="M168 279 L204 267" className="stroke-azul-claro" strokeWidth="40" />
      </g>
      <g transform="rotate(32 362 275)">
        <rect x="277" y="105" width="170" height="340" rx="78" className="fill-laranja" />
        <ellipse cx="362" cy="165" rx="62" ry="40" className="fill-branco" />
      </g>
      <g fill="none" className="stroke-branco" strokeLinecap="round" strokeWidth="13">
        <ellipse cx="318" cy="263" rx="9" ry="13" className="fill-branco" strokeWidth="8" />
        <path d="M370 287 Q390 262 410 287" />
        <path d="M314 307 Q326 336 366 320" />
      </g>
    </g>
  )
}
