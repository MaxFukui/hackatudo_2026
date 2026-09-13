// Fundo da área do aluno: manchas pastel grandes e formas pequenas (estrela, anel, rabisco)
// que derivam bem devagar. Só decoração — aria-hidden, sem interação, atrás de tudo.
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-dots">
      {/* manchas grandes */}
      <div className="absolute -top-32 -right-32 size-[28rem] rounded-full bg-azul-claro/50 blur-3xl animate-drift md:size-[36rem]" />
      <div className="absolute top-[38%] -left-40 size-[24rem] rounded-full bg-verde-agua/70 blur-3xl animate-drift-slow md:size-[32rem]" />
      <div className="absolute -bottom-24 right-[15%] size-[20rem] rounded-full bg-rosa-claro/60 blur-3xl animate-drift md:size-[28rem]" />
      <div className="absolute top-[60%] left-[45%] size-[16rem] rounded-full bg-amarelo-claro blur-3xl animate-drift-slow" />

      {/* formas pequenas */}
      <svg className="absolute top-[28%] left-[2%] w-10 text-amarelo animate-twinkle md:w-14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.5 5.8 21l1.6-7L2 9.3l7.1-.7Z" />
      </svg>
      <svg className="absolute top-[30%] right-[6%] w-8 text-laranja/70 animate-twinkle md:w-10" style={{ animationDelay: '1.2s' }} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.5 5.8 21l1.6-7L2 9.3l7.1-.7Z" />
      </svg>
      <svg className="absolute top-[55%] left-[10%] w-10 text-azul-esc/60 animate-twinkle" style={{ animationDelay: '0.6s' }} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" />
      </svg>
      {/* anéis */}
      <div className="absolute top-[18%] right-[22%] size-10 rounded-full border-4 border-rosa-esc/60 animate-drift" />
      <div className="absolute bottom-[22%] left-[30%] size-6 rounded-full border-4 border-verde-esc/70 animate-drift-slow" />
      <div className="absolute top-[72%] right-[8%] size-14 rounded-full border-4 border-amarelo animate-drift" />
      {/* rabiscos */}
      <svg className="absolute top-[42%] right-[3%] w-20 text-azul-esc/50 animate-drift-slow md:w-28" viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <path d="M4 30c14-30 26-30 40 0s26 30 40 0 26-30 32-10" />
      </svg>
      <svg className="absolute bottom-[8%] left-[6%] w-16 text-rosa-esc/60 animate-drift md:w-24" viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <path d="M4 30c14-30 26-30 40 0s26 30 40 0 26-30 32-10" />
      </svg>
      {/* pontos soltos */}
      <div className="absolute top-[12%] left-[38%] size-3 rounded-full bg-laranja/70 animate-twinkle" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[85%] left-[55%] size-2.5 rounded-full bg-azul-esc/70 animate-twinkle" style={{ animationDelay: '0.9s' }} />
      <div className="absolute top-[48%] right-[35%] size-2 rounded-full bg-verde-esc animate-twinkle" style={{ animationDelay: '1.6s' }} />
    </div>
  )
}
