// Fonte única dos vídeos da landing: usada pelas seções e pelo JSON-LD (VideoObject).
// Arquivos em public/videos/: MP4 H.264 sem áudio + capa WebP.
export interface LandingVideo {
  id: string
  src: string
  poster: string
  width: number
  height: number
  /** ISO 8601, para o JSON-LD. */
  duration: string
  name: string
  description: string
}

export const VIDEOS = {
  intro: {
    id: 'gizzi-intro',
    src: '/videos/gizzi-intro.mp4',
    poster: '/videos/gizzi-intro-poster.webp',
    width: 1280,
    height: 444,
    duration: 'PT15S',
    name: 'Conheça o gizzi',
    description: 'O giz do gizzi chega à escola e encontra os monstrinhos que vão aprender junto com a turma.',
  },
  monsters: {
    id: 'monstrinhos-turma',
    src: '/videos/monstrinhos-turma.mp4',
    poster: '/videos/monstrinhos-turma-poster.webp',
    width: 960,
    height: 540,
    duration: 'PT15S',
    name: 'Cada criança, um monstrinho',
    description: 'Dragões, magos, fantasmas e cavaleiros: a turma de monstrinhos que as crianças cuidam no gizzi.',
  },
  school: {
    id: 'escola-monstros',
    src: '/videos/escola-monstros.mp4',
    poster: '/videos/escola-monstros-poster.webp',
    width: 960,
    height: 540,
    duration: 'PT12S',
    name: 'A escola dos monstrinhos',
    description: 'Os monstrinhos na sala de aula, lendo e escrevendo junto com as crianças.',
  },
} satisfies Record<string, LandingVideo>
