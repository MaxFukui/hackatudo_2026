import { useEffect, useRef, useState } from 'react'
import { Alert, Badge, Button, Card, ProgressBar, Skeleton } from '@/components/ui'
import { Mascote } from '@/pages/student/components/Mascote'
import type { Subject } from '@/pages/student/data/aluno'
import { stageForXp } from '@/pages/student/lib/mascotes'
import { MASCOTE_CARD, mascoteOfSubject, SUBJECT_EMOJI } from '@/pages/student/lib/materias'
import type { ContextoAluno } from '@/pages/student/prompts/exercicios'
import { gerarLote, lerCache, mensagemDeErro, progressoKey, renovaEm, TOTAL_QUESTOES, type Alvo, type Questao } from '@/pages/student/services/exercicios'
import { IconArrowLeft, IconCheck } from '../icons'

const LETRAS = ['A', 'B', 'C', 'D']
const XP_ACERTO = 2
const XP_ACERTO_COM_DICA = 1

interface Progresso {
  indice: number
  acertos: number
  xp: number
}

function lerProgresso(id: string): Progresso {
  try {
    const raw = localStorage.getItem(progressoKey(id))
    return raw ? (JSON.parse(raw) as Progresso) : { indice: 0, acertos: 0, xp: 0 }
  } catch {
    return { indice: 0, acertos: 0, xp: 0 }
  }
}
function gravarProgresso(id: string, p: Progresso) {
  try {
    localStorage.setItem(progressoKey(id), JSON.stringify(p))
  } catch {
    // segue em memória
  }
}

interface Props {
  alvo: Alvo
  subject: Subject
  ctx: ContextoAluno
  xp: number
  /** Ao sair ou terminar: XP ganho nesta sessão (0 se nada). */
  onExit: (xpGanho: number, resumo: string) => void
}

// Uma questão por vez, em passos: ler → (dica) → escolher → responder → ver explicação → próxima.
// As 15 questões do dia chegam numa chamada; amanhã vêm 15 novas.
export function Exercicio({ alvo, subject, ctx, xp, onExit }: Props) {
  const mascote = mascoteOfSubject(subject.id)
  const [questoes, setQuestoes] = useState<Questao[]>(() => lerCache(alvo.id))
  const [progresso, setProgresso] = useState<Progresso>(() => lerProgresso(alvo.id))
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [escolha, setEscolha] = useState<number | null>(null)
  const [respondida, setRespondida] = useState(false)
  const [dicaAberta, setDicaAberta] = useState(false)
  const [cheer, setCheer] = useState(0)
  const xpSessao = useRef(0)
  const pedindo = useRef(false)

  const atual = questoes[progresso.indice]
  const terminou = progresso.indice >= TOTAL_QUESTOES

  // Busca o conjunto do dia quando não há um válido.
  useEffect(() => {
    const precisa = !terminou && questoes.length < TOTAL_QUESTOES
    if (!precisa || pedindo.current) return
    pedindo.current = true
    setCarregando(questoes.length <= progresso.indice)
    setErro(null)
    gerarLote(alvo, ctx, (parciais) => {
      setQuestoes(parciais)
      setCarregando(false)
    })
      .then((todas) => setQuestoes(todas))
      .catch((e) => setErro(mensagemDeErro(e, mascote.name)))
      .finally(() => {
        pedindo.current = false
        setCarregando(false)
      })
  }, [alvo, ctx, questoes.length, progresso.indice, terminou, mascote.name])

  function responder() {
    if (escolha === null || !atual) return
    const acertou = escolha === atual.correta
    const ganho = acertou ? (dicaAberta ? XP_ACERTO_COM_DICA : XP_ACERTO) : 0
    xpSessao.current += ganho
    setRespondida(true)
    if (acertou) setCheer((c) => c + 1)
    const p = { ...progresso, acertos: progresso.acertos + (acertou ? 1 : 0), xp: progresso.xp + ganho }
    setProgresso(p)
    gravarProgresso(alvo.id, p)
  }

  function proxima() {
    const p = { ...progresso, indice: progresso.indice + 1 }
    setProgresso(p)
    gravarProgresso(alvo.id, p)
    setEscolha(null)
    setRespondida(false)
    setDicaAberta(false)
  }

  function sair() {
    onExit(xpSessao.current, xpSessao.current ? `+${xpSessao.current} XP em "${alvo.titulo}"` : '')
  }

  const horas = Math.ceil(renovaEm(alvo.id) / 3_600_000)

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-body font-medium text-fg-muted">
            {SUBJECT_EMOJI[subject.id]} {subject.name} · com o {mascote.name}
          </p>
          <h1 className="font-display text-h1 font-semibold text-fg md:text-display">{alvo.titulo}</h1>
        </div>
        <Button variant="secondary" icon={<IconArrowLeft />} onClick={sair}>
          Parar por aqui
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar value={Math.min(progresso.indice, TOTAL_QUESTOES)} max={TOTAL_QUESTOES} label="Questões respondidas" tone="accent" />
        </div>
        <span className="shrink-0 text-small font-medium text-fg-muted" data-numeric>
          {Math.min(progresso.indice + 1, TOTAL_QUESTOES)} / {TOTAL_QUESTOES}
        </span>
        <Badge tone="success">✓ {progresso.acertos}</Badge>
      </div>

      {terminou ? (
        <Card tone={MASCOTE_CARD[mascote.id]}>
          <div className="flex flex-col items-center gap-3 text-center">
            <Mascote mascote={mascote} stage={stageForXp(xp).stage} size={160} cheer={1} />
            <h2 className="font-display text-display font-semibold text-fg">Você terminou! 🎉</h2>
            <p className="text-reading text-fg-muted">
              {progresso.acertos} acertos em {TOTAL_QUESTOES} questões · {progresso.xp} XP ganhos neste material.
            </p>
            <Badge tone="info">🔄 Novas questões em {horas > 0 ? `${horas} h` : 'breve'}</Badge>
            <Button variant="accent" size="lg" onClick={sair}>
              Voltar aos materiais
            </Button>
          </div>
        </Card>
      ) : erro ? (
        <Alert tone="warning" title="Ops!" animate>
          {erro}{' '}
          <button type="button" className="font-semibold underline" onClick={() => setQuestoes((q) => [...q])}>
            Tentar de novo
          </button>
        </Alert>
      ) : carregando || !atual ? (
        <Card tone={MASCOTE_CARD[mascote.id]}>
          <div className="flex items-center gap-4">
            <Mascote mascote={mascote} stage={stageForXp(xp).stage} size={96} />
            <div className="flex-1 space-y-2">
              <p className="font-display text-h2 font-semibold text-fg">O {mascote.name} está preparando as {TOTAL_QUESTOES} questões de hoje…</p>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </Card>
      ) : (
        <Card key={atual.id} tone={MASCOTE_CARD[mascote.id]} className="overflow-hidden">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[auto_minmax(0,1fr)] md:gap-6">
            <div className="flex justify-center md:block">
              <Mascote mascote={mascote} stage={stageForXp(xp).stage} size={112} cheer={cheer} still />
            </div>
            <div className="rounded-lg border border-border bg-surface p-4 animate-bubble-in md:p-5">
              <Badge tone="neutral">{atual.topico}</Badge>
              <p className="mt-2 font-display text-h1 font-semibold text-fg">{atual.enunciado}</p>

              <div role="radiogroup" aria-label="Alternativas" className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {atual.alternativas.map((alt, i) => {
                  const selected = escolha === i
                  const certa = respondida && i === atual.correta
                  const errada = respondida && selected && !certa
                  return (
                    <button
                      key={i}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      disabled={respondida}
                      onClick={() => setEscolha(i)}
                      className={`flex min-h-14 items-center gap-3 rounded-md border-2 px-3 py-2 text-left text-reading transition-[border-color,background-color,transform] duration-fast ease-standard active:scale-98 disabled:cursor-default ${
                        certa
                          ? 'border-success bg-success-soft text-success-soft-fg animate-check-in'
                          : errada
                            ? 'border-danger bg-danger-soft text-danger-soft-fg animate-wiggle'
                            : selected
                              ? 'border-primary bg-primary-soft text-fg'
                              : 'border-border-strong bg-surface text-fg hover:border-fg-subtle'
                      }`}
                    >
                      <span className={`flex size-8 shrink-0 items-center justify-center rounded-full font-display text-h3 font-semibold ${certa ? 'bg-success text-branco' : errada ? 'bg-danger text-branco' : selected ? 'bg-primary text-primary-fg' : 'bg-surface-muted text-fg-muted'}`}>
                        {certa ? <IconCheck /> : LETRAS[i]}
                      </span>
                      <span>{alt}</span>
                    </button>
                  )
                })}
              </div>

              {dicaAberta && !respondida && (
                <div className="mt-3">
                  <Alert tone="warning" title={`💡 Dica do ${mascote.name}`} animate>
                    {atual.dica}
                  </Alert>
                </div>
              )}

              {respondida && (
                <div className="mt-3">
                  <Alert tone={escolha === atual.correta ? 'success' : 'danger'} title={escolha === atual.correta ? `Acertou! +${dicaAberta ? XP_ACERTO_COM_DICA : XP_ACERTO} XP` : 'Quase! A certa está em verde.'} animate>
                    {atual.explicacao}
                  </Alert>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {respondida ? (
                  <Button variant="accent" size="lg" onClick={proxima} className="w-full sm:w-auto">
                    {progresso.indice + 1 >= TOTAL_QUESTOES ? 'Ver resultado' : 'Próxima →'}
                  </Button>
                ) : (
                  <>
                    <Button variant="accent" size="lg" disabled={escolha === null} onClick={responder} className="w-full sm:w-auto">
                      Responder
                    </Button>
                    <Button variant="secondary" size="lg" disabled={dicaAberta} onClick={() => setDicaAberta(true)} className="w-full sm:w-auto">
                      💡 Pedir dica
                    </Button>
                  </>
                )}
              </div>
              <p className="mt-2 text-caption text-fg-muted">Acerto vale {XP_ACERTO} XP · com dica, {XP_ACERTO_COM_DICA} XP.</p>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
