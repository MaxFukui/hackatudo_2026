const AUDIENCES = [
  {
    who: 'Alunos',
    text: 'Chocam ovinhos, cuidam do monstrinho e têm um tutor de IA que ajuda sem dar cola.',
  },
  {
    who: 'Professores',
    text: 'Registram participação em segundos e recebem avaliações por IA com pontos fortes e de atenção de cada aluno.',
  },
  {
    who: 'Direção',
    text: 'Acompanha frequência, desempenho e alertas da escola inteira em um só painel.',
  },
]

export function Audiences() {
  return (
    <section aria-labelledby="publico-titulo" className="bg-accent/25 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="publico-titulo" className="font-display text-3xl font-bold sm:text-4xl">
          Feito para a escola inteira
        </h2>
        <dl className="mt-10 grid gap-8 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <div key={a.who} className="space-y-2">
              <dt className="font-display text-2xl font-bold text-primary-strong">{a.who}</dt>
              <dd className="text-ink/80">{a.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
