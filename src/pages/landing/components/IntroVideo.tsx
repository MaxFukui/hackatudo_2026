import { VIDEOS } from '../videos'
import { ScrollVideo } from './ScrollVideo'

export function IntroVideo() {
  return (
    <section aria-labelledby="conheca-titulo" className="mx-auto max-w-content px-4 pb-4 md:px-8">
      <h2 id="conheca-titulo" className="font-display text-h1 font-semibold">
        Conheça o gizzi
      </h2>
      <p className="mt-2 max-w-reading text-reading text-fg-muted">{VIDEOS.intro.description}</p>
      <ScrollVideo video={VIDEOS.intro} className="mt-6" />
    </section>
  )
}
