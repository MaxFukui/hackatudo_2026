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

// Monstrinho coruja em SVG puro: leve, nítido em qualquer tela e sem imagem externa.
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
        {stage === 2 && <Owlet />}
        {stage === 3 && <Owl />}
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
      <circle cx="80" cy="150" r="6" className="fill-rosa-esc" />
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

function Eyes({ cy, r, dx }: { cy: number; r: number; dx: number }) {
  return (
    <>
      {[100 - dx, 100 + dx].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={cy} r={r} className={`fill-branco ${LINE}`} strokeWidth="4" />
          <circle cx={cx + 2} cy={cy + 2} r={r * 0.45} className="fill-escuro" />
          <circle cx={cx + 5} cy={cy - 3} r={r * 0.15} className="fill-branco" />
        </g>
      ))}
    </>
  )
}

function Beak({ cy }: { cy: number }) {
  return (
    <polygon points={`92,${cy} 108,${cy} 100,${cy + 13}`} className={`fill-amarelo ${LINE}`} strokeWidth="3" strokeLinejoin="round" />
  )
}

function Owlet() {
  return (
    <>
      <circle cx="100" cy="98" r="50" className={`fill-laranja ${LINE}`} strokeWidth="5" />
      <path d="M68 60 L72 40 L88 52 Z" className={`fill-laranja ${LINE}`} strokeWidth="4" strokeLinejoin="round" />
      <path d="M132 60 L128 40 L112 52 Z" className={`fill-laranja ${LINE}`} strokeWidth="4" strokeLinejoin="round" />
      <Eyes cy={90} r={16} dx={20} />
      <Beak cy={104} />
      {/* casca por cima do corpo */}
      <path
        d="M42 124 L58 112 L74 126 L90 112 L106 126 L122 112 L138 126 L158 116 Q162 186 100 186 Q38 186 42 124 Z"
        className={`fill-branco ${LINE}`}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="118" cy="156" r="9" className="fill-azul-claro" />
      <circle cx="78" cy="166" r="5" className="fill-rosa-esc" />
    </>
  )
}

function Owl() {
  return (
    <>
      <ellipse cx="46" cy="124" rx="16" ry="38" transform="rotate(-14 46 124)" className={`fill-accent-hover ${LINE}`} strokeWidth="5" />
      <ellipse cx="154" cy="124" rx="16" ry="38" transform="rotate(14 154 124)" className={`fill-accent-hover ${LINE}`} strokeWidth="5" />
      <path d="M56 70 L58 26 L90 52 Z" className={`fill-laranja ${LINE}`} strokeWidth="5" strokeLinejoin="round" />
      <path d="M144 70 L142 26 L110 52 Z" className={`fill-laranja ${LINE}`} strokeWidth="5" strokeLinejoin="round" />
      <ellipse cx="100" cy="112" rx="58" ry="70" className={`fill-laranja ${LINE}`} strokeWidth="5" />
      <ellipse cx="100" cy="138" rx="34" ry="36" className="fill-amarelo-claro" />
      <path d="M84 128 q6 6 12 0 M104 128 q6 6 12 0 M94 146 q6 6 12 0" fill="none" className="stroke-escuro/40" strokeWidth="3" strokeLinecap="round" />
      <Eyes cy={90} r={21} dx={25} />
      <Beak cy={104} />
      <path d="M80 180 l-6 8 M86 181 l0 9 M92 180 l6 8" className="stroke-accent-hover" strokeWidth="4" strokeLinecap="round" />
      <path d="M108 180 l-6 8 M114 181 l0 9 M120 180 l6 8" className="stroke-accent-hover" strokeWidth="4" strokeLinecap="round" />
    </>
  )
}
