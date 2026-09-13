// Exercícios gerados por IA (Claude): 15 por material, em 3 chamadas paralelas de 5
// (aquecimento · no nível · desafio). A API responde em fila, então cada parte é entregue
// assim que chega: a criança começa pelo aquecimento enquanto o resto termina no fundo.
// Ficam no localStorage por 24 h — fechar e voltar continua de onde parou; no dia seguinte
// vêm 15 novas (e o progresso do material recomeça).
import Anthropic from '@anthropic-ai/sdk'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { z } from 'zod'
import { SYSTEM_EXERCICIOS, userPromptLote, type ContextoAluno, type Parte } from '@/pages/student/prompts/exercicios'

export const TOTAL_QUESTOES = 15
const PARTES: Parte[] = ['aquecimento', 'no nível', 'desafio']
const POR_PARTE = TOTAL_QUESTOES / PARTES.length
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

// Chave exposta no browser: aceitável só no protótipo do hackathon. Em produção, um proxy
// (/api/v1/exercicios) guarda a chave e chama a API; este arquivo passa a fazer fetch nele.
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined

const client = apiKey ? new Anthropic({ apiKey, dangerouslyAllowBrowser: true }) : null
// Recado de desenvolvedor vai para o console, nunca para a tela da criança.
if (!client && import.meta.env.DEV) console.warn('[gizzi] VITE_ANTHROPIC_API_KEY não definida: exercícios em modo de demonstração. Veja .env.example.')

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

/**
 * Gera o conjunto do dia. `onParcial` recebe a lista acumulada cada vez que uma parte fica
 * pronta (em ordem: aquecimento → no nível → desafio), para a tela começar antes do fim.
 * Devolve a lista completa.
 */
export async function gerarLote(alvo: Alvo, ctx: ContextoAluno, onParcial?: (questoes: Questao[]) => void): Promise<Questao[]> {
  const atuais = lerCache(alvo.id)
  if (atuais.length >= TOTAL_QUESTOES) return atuais
  const geradoEm = lerConjunto(alvo.id)?.geradoEm ?? Date.now()

  const finalizar = (lista: Questao[]) => {
    const todas = lista.slice(0, TOTAL_QUESTOES).map((q, i) => ({ ...q, id: `${alvo.id}-${i}` }))
    gravarCache(alvo.id, todas, geradoEm)
    return todas
  }

  if (!client) return finalizar([...atuais, ...gerarOffline(alvo, ctx, TOTAL_QUESTOES, 0)])

  // Dispara as 3 partes juntas e entrega cada uma assim que chega, na ordem em que chegam:
  // esperar a "certa" custava 10 s a mais para a criança. Qualquer parte serve para começar.
  const acumulado = [...atuais]
  await Promise.all(
    PARTES.map(async (parte) => {
      const qs = await gerarComClaude(alvo, ctx, parte, POR_PARTE, atuais)
      acumulado.push(...qs)
      onParcial?.(finalizar(acumulado))
    }),
  )
  return finalizar(acumulado)
}

async function gerarComClaude(alvo: Alvo, ctx: ContextoAluno, parte: Parte, quantidade: number, atuais: Questao[]): Promise<Questao[]> {
  const response = await client!.messages.parse({
    // Haiku 4.5: rápido e barato para 10 questões curtas de 4º ano. (Não aceita `effort`; thinking fica desligado.)
    model: 'claude-haiku-4-5',
    max_tokens: 4000,
    // Prompt de sistema estável + cache: as 5 chamadas do material reaproveitam o prefixo.
    system: [{ type: 'text', text: SYSTEM_EXERCICIOS, cache_control: { type: 'ephemeral' } }],
    output_config: { format: zodOutputFormat(LoteSchema) },
    messages: [{ role: 'user', content: userPromptLote(ctx, parte, quantidade, alvo.titulo, alvo.descricao, atuais.map((q) => q.enunciado)) }],
  })
  const parsed = response.parsed_output
  if (!parsed) throw new Error('A IA não devolveu questões válidas. Tente de novo.')
  return parsed.questoes.map((q) => ({ ...q, id: '' }))
}

// Sem chave: banco mínimo para a tela funcionar (demo). A criança não vê diferença além do conteúdo genérico.
function gerarOffline(alvo: Alvo, ctx: ContextoAluno, quantidade: number, offset: number): Questao[] {
  const base: Omit<Questao, 'id'>[] = [
    { topico: 'aquecimento', enunciado: `Sobre ${ctx.materia}: qual destas é uma boa forma de começar a estudar "${alvo.titulo}"?`, alternativas: ['Ler o enunciado com calma', 'Chutar a primeira', 'Pular a questão', 'Perguntar a resposta'], correta: 0, dica: 'Pense no que uma professora pediria primeiro.', explicacao: 'Ler com calma ajuda a entender o que a questão pede — por isso é o melhor começo.' },
    { topico: 'estratégia', enunciado: 'Quando você não entende uma questão, o que ajuda mais?', alternativas: ['Ler de novo e sublinhar', 'Fechar o caderno', 'Copiar do colega', 'Deixar em branco'], correta: 0, dica: 'Ler de novo faz a gente enxergar o que passou batido.', explicacao: 'Reler e sublinhar as partes importantes é o jeito certo de entender melhor.' },
  ]
  return Array.from({ length: quantidade }, (_, i) => ({ ...base[(offset + i) % base.length], id: `${alvo.id}-${offset + i}` }))
}

/** Mensagem para a criança (curta, sem termos técnicos). O erro real vai para o console. */
export function mensagemDeErro(err: unknown, mascote: string): string {
  console.error('[gizzi] exercícios:', err)
  if (err instanceof Anthropic.APIConnectionError) return `O ${mascote} não conseguiu se conectar. Veja se a internet está funcionando e tente de novo.`
  if (err instanceof Anthropic.RateLimitError) return `O ${mascote} está ocupado agora. Espera um pouquinho e tenta de novo.`
  return `O ${mascote} não conseguiu preparar as questões agora. Tenta de novo daqui a pouquinho.`
}
