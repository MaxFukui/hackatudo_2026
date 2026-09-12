const FEATURES = [
  { title: 'Sistema de Streak', text: 'Presença, participação e provas acima da média viram pontos e XP.' },
  { title: 'Tutor de IA', text: 'Explica, dá dicas e revisa erros — sem entregar resposta de prova.' },
  { title: 'Avaliação por IA', text: 'Pontos fortes, pontos de atenção e recomendações para cada aluno.' },
  { title: 'Dashboard', text: 'Frequência, desempenho e alertas da escola em uma tela.' },
]

export function Features() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <article key={f.title} className="space-y-2">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-slate-600">{f.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
