const POINTS = [
  {
    title: 'Tela coletiva, não celular individual',
    text: 'A tecnologia fica na parede da sala, a serviço da turma. Nada de mais uma notificação disputando atenção.',
  },
  {
    title: 'IA que ensina, não entrega a resposta',
    text: 'O tutor dá dicas, explica de outro jeito e revisa os erros. A resposta final continua sendo da criança.',
  },
  {
    title: 'Recompensa pelo que importa',
    text: 'Pontinhos vêm de presença, participação e esforço — não de tempo de tela.',
  },
]

export function ConsciousTech() {
  return (
    <section aria-labelledby="consciente-titulo" className="mx-auto max-w-6xl px-4 py-20">
      <h2 id="consciente-titulo" className="max-w-3xl font-display text-3xl font-bold text-balance sm:text-4xl">
        A mesma dopamina das redes sociais, agora a favor da escola
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {POINTS.map((point) => (
          <article key={point.title} className="space-y-2 border-t-4 border-primary pt-4">
            <h3 className="font-display text-xl font-bold">{point.title}</h3>
            <p className="text-ink/80">{point.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
