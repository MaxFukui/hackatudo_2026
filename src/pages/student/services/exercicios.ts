// Exercícios gerados por IA (Claude): 15 por material, numa chamada só.
// Ficam no localStorage por 24 h — fechar e voltar continua de onde parou; no dia seguinte
// vêm 15 novas (e o progresso do material recomeça).
import Anthropic from '@anthropic-ai/sdk'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { z } from 'zod'
import { SYSTEM_EXERCICIOS, userPromptLote, type ContextoAluno } from '@/pages/student/prompts/exercicios'

export const TOTAL_QUESTOES = 15
export const TAMANHO_LOTE = 15
/** Validade do conjunto: depois disso, gera de novo. */
export const VALIDADE_MS = 24 * 60 * 60 * 1000

const QuestaoSchema = z.object({
  topico: z.string(),
  enunciado: z.string(),
  alternativas: z.array(z.string()).length(4),
  /** Índice (0–3) da alternativa correta. */
  correta: z.number().int().min(0).max(3),
  dica: z.string(),
  explicacao: z.string(),
})
const LoteSchema = z.object({ questoes: z.array(QuestaoSchema) })

export type Questao = z.infer<typeof QuestaoSchema> & { id: string }

export interface Alvo {
  /** Chave do cache: id do material ou da atividade. */
  id: string
  titulo: string
  descricao: string
}

// A chave não está no browser: o servidor do Vite (vite.config.ts) recebe /api/anthropic,
// coloca o ANTHROPIC_API_KEY do .env e repassa para a API. Aqui vai só um valor de mentira,
// que o proxy substitui.
export const iaDisponivel = import.meta.env.VITE_IA_DISPONIVEL === true

const client = iaDisponivel
  ? new Anthropic({
      apiKey: 'via-proxy',
      baseURL: `${typeof window === 'undefined' ? 'http://localhost' : window.location.origin}/api/anthropic`,
      dangerouslyAllowBrowser: true,
    })
  : null

function cacheKey(alvoId: string) {
  return `gizzi.exercicios.${alvoId}`
}
export function progressoKey(alvoId: string) {
  return `gizzi.exercicios.progresso.${alvoId}`
}

interface Conjunto {
  geradoEm: number
  questoes: Questao[]
}

function lerConjunto(alvoId: string): Conjunto | null {
  try {
    const raw = localStorage.getItem(cacheKey(alvoId))
    return raw ? (JSON.parse(raw) as Conjunto) : null
  } catch {
    return null
  }
}

/** Questões válidas do material. Conjunto vencido (24 h) é apagado junto com o progresso. */
export function lerCache(alvoId: string): Questao[] {
  const c = lerConjunto(alvoId)
  if (!c) return []
  if (Date.now() - c.geradoEm > VALIDADE_MS) {
    try {
      localStorage.removeItem(cacheKey(alvoId))
      localStorage.removeItem(progressoKey(alvoId))
    } catch {
      // ignora
    }
    return []
  }
  return c.questoes
}

/** Quando este conjunto se renova (ms restantes), ou 0 se não há conjunto. */
export function renovaEm(alvoId: string): number {
  const c = lerConjunto(alvoId)
  return c ? Math.max(0, c.geradoEm + VALIDADE_MS - Date.now()) : 0
}

function gravarCache(alvoId: string, questoes: Questao[], geradoEm: number) {
  try {
    localStorage.setItem(cacheKey(alvoId), JSON.stringify({ geradoEm, questoes } satisfies Conjunto))
  } catch {
    // sem espaço ou modo privado: segue só em memória
  }
}

/** Gera o próximo lote e devolve a lista completa (cache + novo). */
export async function gerarLote(alvo: Alvo, ctx: ContextoAluno): Promise<Questao[]> {
  const atuais = lerCache(alvo.id)
  if (atuais.length >= TOTAL_QUESTOES) return atuais
  const lote = Math.floor(atuais.length / TAMANHO_LOTE) + 1
  const quantidade = Math.min(TAMANHO_LOTE, TOTAL_QUESTOES - atuais.length)

  const novas = client ? await gerarComClaude(alvo, ctx, lote, quantidade, atuais) : gerarOffline(alvo, ctx, quantidade, atuais.length)
  const todas = [...atuais, ...novas]
  gravarCache(alvo.id, todas, lerConjunto(alvo.id)?.geradoEm ?? Date.now())
  return todas
}

async function gerarComClaude(alvo: Alvo, ctx: ContextoAluno, lote: number, quantidade: number, atuais: Questao[]): Promise<Questao[]> {
  const response = await client!.messages.parse({
    // Haiku 4.5: rápido e barato para 10 questões curtas de 4º ano. (Não aceita `effort`; thinking fica desligado.)
    model: 'claude-haiku-4-5',
    max_tokens: 8000,
    // Prompt de sistema estável + cache: as 5 chamadas do material reaproveitam o prefixo.
    system: [{ type: 'text', text: SYSTEM_EXERCICIOS, cache_control: { type: 'ephemeral' } }],
    output_config: { format: zodOutputFormat(LoteSchema) },
    messages: [{ role: 'user', content: userPromptLote(ctx, lote, quantidade, alvo.titulo, alvo.descricao, atuais.map((q) => q.enunciado)) }],
  })
  const parsed = response.parsed_output
  if (!parsed) throw new Error('A IA não devolveu questões válidas. Tente de novo.')
  return parsed.questoes.map((q, i) => ({ ...q, id: `${alvo.id}-${atuais.length + i}` }))
}

// Sem chave: banco mínimo para a tela funcionar (demo offline). Marca no título para ninguém confundir.
function gerarOffline(alvo: Alvo, ctx: ContextoAluno, quantidade: number, offset: number): Questao[] {
  const base: Omit<Questao, 'id'>[] = [
    { topico: 'aquecimento', enunciado: `Sobre ${ctx.materia}: qual destas é uma boa forma de começar a estudar "${alvo.titulo}"?`, alternativas: ['Ler o enunciado com calma', 'Chutar a primeira', 'Pular a questão', 'Perguntar a resposta'], correta: 0, dica: 'Pense no que uma professora pediria primeiro.', explicacao: 'Ler com calma ajuda a entender o que a questão pede — por isso é o melhor começo.' },
    { topico: 'estratégia', enunciado: 'Quando você não entende uma questão, o que ajuda mais?', alternativas: ['Ler de novo e sublinhar', 'Fechar o caderno', 'Copiar do colega', 'Deixar em branco'], correta: 0, dica: 'Ler de novo faz a gente enxergar o que passou batido.', explicacao: 'Reler e sublinhar as partes importantes é o jeito certo de entender melhor.' },
  ]
  return Array.from({ length: quantidade }, (_, i) => ({ ...base[(offset + i) % base.length], id: `${alvo.id}-${offset + i}`, enunciado: `[offline] ${base[(offset + i) % base.length].enunciado}` }))
}

/** Erro amigável para a tela. */
export function mensagemDeErro(err: unknown): string {
  if (err instanceof Anthropic.AuthenticationError) return 'A chave da IA não foi aceita. Avise um adulto para conferir a configuração.'
  if (err instanceof Anthropic.RateLimitError) return 'A IA está ocupada agora. Espere um pouquinho e tente de novo.'
  if (err instanceof Anthropic.APIConnectionError) return 'Sem conexão com a IA. Veja se a internet está funcionando.'
  if (err instanceof Anthropic.APIError) return `A IA respondeu com erro (${err.status}). Tente de novo.`
  return err instanceof Error ? err.message : 'Algo deu errado. Tente de novo.'
}
