import { Grid } from '@/components/ui'
import { LoginCard } from './LoginCard'
import { Reveal } from './Reveal'

export function LoginSection() {
  return (
    <section id="entrar" aria-labelledby="entrar-titulo" className="mx-auto max-w-content scroll-mt-20 px-4 py-20 md:px-8 md:py-28">
      <Grid layout="main-aside" stretch={false} className="items-center gap-10">
        <Reveal>
          <h2 id="entrar-titulo" className="text-statement font-display font-semibold">
            Já faz parte da turma?
          </h2>
          <p className="mt-4 max-w-reading text-reading text-fg-muted">
            Entre como aluno para cuidar do seu monstrinho, como professor para acompanhar a turma ou como direção para ver a
            escola inteira.
          </p>
        </Reveal>
        <LoginCard />
      </Grid>
    </section>
  )
}
