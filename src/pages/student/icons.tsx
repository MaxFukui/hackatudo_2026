// Ícones da navegação: 20px, stroke 1.75, como o modelo pede. Inline até haver um set compartilhado.
import type { SVGProps } from 'react'

function Svg(props: SVGProps<SVGSVGElement>) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} />
}

export const IconHome = () => (
  <Svg>
    <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
  </Svg>
)
export const IconPet = () => (
  <Svg>
    <path d="M12 3c-4 0-7 4-7 9 0 4.5 3 8 7 8s7-3.5 7-8c0-5-3-9-7-9Z" />
    <circle cx="9.5" cy="11" r="0.8" fill="currentColor" />
    <circle cx="14.5" cy="11" r="0.8" fill="currentColor" />
    <path d="M10 14.5c1 1 3 1 4 0" />
  </Svg>
)
export const IconBook = () => (
  <Svg>
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
    <path d="M4 19a2 2 0 0 1 2-2h13" />
  </Svg>
)
export const IconChat = () => (
  <Svg>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12Z" />
    <path d="M9 12h.01M12 12h.01M15 12h.01" />
  </Svg>
)
export const IconChart = () => (
  <Svg>
    <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
  </Svg>
)
export const IconCalendar = () => (
  <Svg>
    <path d="M7 3v4M17 3v4M4 9h16" />
    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
  </Svg>
)
export const IconFlame = () => (
  <Svg>
    <path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3 0-6 1-9Z" />
  </Svg>
)
export const IconCheck = () => (
  <Svg>
    <path d="m5 12 5 5 9-10" />
  </Svg>
)
export const IconArrowLeft = () => (
  <Svg>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Svg>
)
export const IconSend = () => (
  <Svg>
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
  </Svg>
)
export const IconPlay = () => (
  <Svg>
    <path d="M6 4l14 8-14 8z" />
  </Svg>
)
export const IconStar = () => (
  <Svg fill="currentColor" stroke="none">
    <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.5 5.8 21l1.6-7L2 9.3l7.1-.7Z" />
  </Svg>
)
export const IconTrend = () => (
  <Svg>
    <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
  </Svg>
)
