import { FAQ } from '../faq'

export function Faq() {
  return (
    <section id="perguntas" aria-labelledby="perguntas-titulo" className="mx-auto max-w-reading scroll-mt-20 px-4 py-20 md:py-28">
      <h2 id="perguntas-titulo" className="text-statement font-display font-semibold">
        Perguntas frequentes
      </h2>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {FAQ.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3 text-h2 font-semibold [&::-webkit-details-marker]:hidden">
              {item.question}
              <span aria-hidden="true" className="text-h1 text-fg-muted transition-transform duration-base ease-standard group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-4 text-reading text-fg-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
