import { Grid } from '@/components/ui'
import { VIDEOS } from '../videos'
import { ScrollVideo } from './ScrollVideo'

export function SchoolVideo() {
  return (
    <section aria-labelledby="escola-titulo" className="mx-auto max-w-content px-4 pt-16 md:px-8">
      <Grid layout="main-aside" stretch={false} className="items-center">
        <ScrollVideo video={VIDEOS.school} />
        <div className="space-y-3">
          <h2 id="escola-titulo" className="font-display text-h1 font-semibold">
            A escola dos monstrinhos
          </h2>
          <p className="max-w-reading text-reading text-fg-muted">
            Os monstrinhos também vão para a aula. Leitura, escrita e contas viram aventura, e o que a criança aprende aparece
            no monstrinho dela.
          </p>
        </div>
      </Grid>
    </section>
  )
}
