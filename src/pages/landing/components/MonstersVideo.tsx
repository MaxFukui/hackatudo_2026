import { Grid } from '@/components/ui'
import { VIDEOS } from '../videos'
import { ScrollVideo } from './ScrollVideo'

export function MonstersVideo() {
  return (
    <section aria-labelledby="monstrinhos-titulo" className="mx-auto max-w-content px-4 pb-16 md:px-8">
      <Grid layout="aside-main" stretch={false} className="items-center">
        <div className="space-y-3">
          <h2 id="monstrinhos-titulo" className="font-display text-h1 font-semibold">
            Cada criança, um monstrinho
          </h2>
          <p className="max-w-reading text-reading text-fg-muted">
            Dragões, magos, fantasmas, cavaleiros. Cada aluno tem o seu, e ele só cresce com presença, participação e esforço
            de verdade.
          </p>
        </div>
        <ScrollVideo video={VIDEOS.monsters} />
      </Grid>
    </section>
  )
}
