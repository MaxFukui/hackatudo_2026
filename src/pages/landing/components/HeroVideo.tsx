import { VIDEOS } from '../videos'
import { ScrollVideo } from './ScrollVideo'

export function HeroVideo() {
  return (
    <section aria-labelledby="hero-titulo" className="relative isolate flex min-h-dvh items-end overflow-hidden">
      <ScrollVideo video={VIDEOS.monsters} cover className="-z-10" />
      {/* Degradê: texto legível sobre qualquer quadro do vídeo e emenda com a página. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-canvas from-15% via-canvas/75 to-canvas/20 md:from-0% md:via-canvas/55" />

      <div className="mx-auto w-full max-w-content px-4 pt-32 pb-16 md:px-8 md:pb-24">
        <p className="text-body font-medium text-(--color-highlight)">Sala de aula gamificada</p>
        <h1 id="hero-titulo" className="text-hero mt-3 max-w-4xl font-display font-semibold text-fg">
          Cuide do seu monstrinho. Cuide do seu aprendizado.
        </h1>
        <p className="mt-5 max-w-reading text-reading text-fg-muted">
          Presença, participação e lição feita viram pontinhos. Os pontinhos chocam o ovo e fazem o monstrinho crescer — na
          TV da sala, na frente da turma toda.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#entrar"
            className="button inline-flex h-12 items-center rounded-full bg-primary px-6 text-body font-semibold text-primary-fg no-underline hover:bg-primary-hover"
          >
            Entrar
          </a>
          <a
            href="#como-funciona"
            className="button inline-flex h-12 items-center rounded-full border border-fg/40 px-6 text-body font-semibold text-fg no-underline hover:border-fg"
          >
            Como funciona
          </a>
        </div>
      </div>
    </section>
  )
}
