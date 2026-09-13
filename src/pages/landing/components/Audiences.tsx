import { Card, Grid } from '@/components/ui'

const AUDIENCES = [
  { who: 'Alunos', text: 'Chocam ovinhos, cuidam do monstrinho e têm um tutor de IA que ajuda sem dar cola.' },
  {
    who: 'Professores',
    text: 'Registram participação em segundos e recebem avaliações por IA com pontos fortes e de atenção de cada aluno.',
  },
  { who: 'Direção', text: 'Acompanha frequência, desempenho e alertas da escola inteira em um só painel.' },
]

export function Audiences() {
  return (
    <section aria-labelledby="publico-titulo" className="bg-verde-agua py-16">
      <div className="mx-auto max-w-content px-4 md:px-8">
        <h2 id="publico-titulo" className="font-display text-h1 font-semibold">
          Feito para a escola inteira
        </h2>
        <Grid layout="three" className="mt-8">
          {AUDIENCES.map((a) => (
            <Card key={a.who}>
              <h3 className="font-display text-h2 font-semibold">{a.who}</h3>
              <p className="mt-1 text-body text-fg-muted">{a.text}</p>
            </Card>
          ))}
        </Grid>
      </div>
    </section>
  )
}
