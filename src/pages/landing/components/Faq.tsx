import { FAQ } from '../faq'

export function Faq() {
  return (
    <section id="perguntas" aria-labelledby="perguntas-titulo" className="mx-auto max-w-3xl scroll-mt-8 px-4 py-20">
      <h2 id="perguntas-titulo" className="font-display text-3xl font-bold sm:text-4xl">
        Perguntas frequentes
      </h2>
      <div className="mt-8 divide-y-2 divide-ink/10 border-y-2 border-ink/10">
        {FAQ.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
              {item.question}
              <span aria-hidden="true" className="text-2xl text-primary transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 text-ink/80">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
