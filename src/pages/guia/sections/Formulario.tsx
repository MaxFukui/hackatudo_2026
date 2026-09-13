import { useState, type FormEvent } from 'react'
import {
  Button,
  Card,
  Checkbox,
  ChoiceGroup,
  Form,
  FormActions,
  FormErrorSummary,
  FormRow,
  FormSection,
  Input,
  Select,
  Stepper,
  Switch,
  Textarea,
  Toast,
} from '@/components/ui'
import { Rule, Section, Spec } from './shared'

type Values = { nome: string; email: string; turma: string; nota: number; obs: string }
type Errors = Partial<Record<keyof Values, string>>
const LABELS: Record<keyof Values, string> = { nome: 'Nome', email: 'E-mail', turma: 'Turma', nota: 'Nota', obs: 'Observação' }

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.nome.trim().length < 3) e.nome = 'Escreva nome e sobrenome.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Falta o @ ou o domínio (ex.: nome@escola.edu.br).'
  if (!v.turma) e.turma = 'Escolha a turma.'
  return e
}

// Formulário completo: valida no blur (campo a campo) e no submit (todos). Erro fica embaixo
// do campo E num resumo no topo com link. Botão trava enquanto salva. Sucesso é um toast.
function ExemploCompleto() {
  const [values, setValues] = useState<Values>({ nome: '', email: '', turma: '', nota: 7, obs: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = <K extends keyof Values>(k: K, v: Values[K]) => {
    const next = { ...values, [k]: v }
    setValues(next)
    // Depois que o campo já foi tocado, o erro some assim que a pessoa corrige — sem esperar o blur.
    if (touched[k] || submitted) setErrors(validate(next))
  }
  const blur = (k: keyof Values) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(values))
  }
  const show = (k: keyof Values) => (touched[k] || submitted ? errors[k] : undefined)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const errs = validate(values)
    setErrors(errs)
    const first = (Object.keys(errs) as (keyof Values)[])[0]
    if (first) {
      document.getElementById(first)?.focus()
      return
    }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 900))
    setSaving(false)
    setSaved(true)
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        {submitted && <FormErrorSummary errors={errors} labels={LABELS} />}
        <FormSection title="Aluno" description="Como aparece na chamada.">
          <FormRow>
            <Input id="nome" label="Nome" value={values.nome} onChange={(e) => set('nome', e.target.value)} onBlur={() => blur('nome')} error={show('nome')} hint="Nome e sobrenome." autoComplete="name" enterKeyHint="next" />
            <Input id="email" label="E-mail" type="email" value={values.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')} error={show('email')} enterKeyHint="next" />
          </FormRow>
          <FormRow>
            <Select id="turma" label="Turma" value={values.turma} onChange={(e) => set('turma', e.target.value)} onBlur={() => blur('turma')} error={show('turma')}>
              <option value="" disabled>
                Selecione
              </option>
              <option>4º Ano A</option>
              <option>4º Ano B</option>
            </Select>
            <Stepper id="nota" label="Nota" value={values.nota} onChange={(v) => set('nota', v)} min={0} max={10} step={0.5} format={(v) => (v >= 7 ? 'acima da média' : 'abaixo da média')} />
          </FormRow>
        </FormSection>
        <FormSection title="Observação">
          <Textarea id="obs" label="Para a família" optional maxLength={200} value={values.obs} onChange={(e) => set('obs', e.target.value)} hint="Aparece no boletim." />
          <Checkbox id="avisar" label="Avisar responsáveis" description="Envia por e-mail quando a nota for publicada." />
        </FormSection>
        <FormActions>
          <Button variant="ghost">Cancelar</Button>
          <Button type="submit" loading={saving}>
            {saving ? 'Salvando' : 'Salvar'}
          </Button>
        </FormActions>
      </Form>
      <Toast open={saved} onClose={() => setSaved(false)}>
        Salvo. A família recebe um aviso.
      </Toast>
    </>
  )
}

// Rostos em SVG, no mesmo traço dos ícones — emoji muda de aparência a cada sistema.
function Face({ mouth }: { mouth: 'smile' | 'flat' | 'frown' }) {
  const d = { smile: 'M8.5 14.5c1 1.3 2.2 2 3.5 2s2.5-.7 3.5-2', flat: 'M9 15h6', frown: 'M8.5 16.5c1-1.3 2.2-2 3.5-2s2.5.7 3.5 2' }[mouth]
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9.5h.01M15 9.5h.01" strokeWidth="2.5" />
      <path d={d} />
    </svg>
  )
}

const MOOD = [
  { value: 'easy', label: 'Fácil', icon: <Face mouth="smile" /> },
  { value: 'ok', label: 'Ok', icon: <Face mouth="flat" /> },
  { value: 'hard', label: 'Difícil', icon: <Face mouth="frown" /> },
]
const PERIODO = [
  { value: 'manha', label: 'Manhã', description: '7h às 11h30' },
  { value: 'tarde', label: 'Tarde', description: '13h às 17h30' },
  { value: 'integral', label: 'Integral', description: 'os dois turnos' },
]

export function Formulario() {
  const [mood, setMood] = useState<string | null>(null)
  const [periodo, setPeriodo] = useState<string | null>('manha')
  const [notif, setNotif] = useState(true)
  const [minutos, setMinutos] = useState(10)

  return (
    <Section
      id="field"
      title="Formulário"
      lead="Preencher é a parte mais chata de qualquer app e a mais fácil de errar no celular. Aqui cada campo já abre o teclado certo, diz o que espera antes do erro e explica o erro quando acontece."
    >
      <Spec label="exemplo completo" note="tente enviar vazio: resumo no topo com links, erro embaixo de cada campo, foco no primeiro. Corrija: o erro some enquanto digita. Envie: botão trava, toast confirma.">
        <ExemploCompleto />
      </Spec>

      <Spec label="anatomia" note="label em cima (nunca placeholder como label) · controle 44px · dica OU erro embaixo, no mesmo lugar · (opcional) no rótulo, sem asterisco.">
        <div className="grid max-w-2xl gap-4 md:grid-cols-2">
          <Input id="a-1" label="Com dica" hint="Formato: 11 dígitos, só números." type="tel" placeholder="00000000000" />
          <Input id="a-2" label="Com erro" defaultValue="alguem@escola" type="email" error="Falta o domínio (ex.: nome@escola.edu.br)." />
          <Input id="a-3" label="Opcional" optional placeholder="Pode deixar em branco" />
          <Input id="a-4" label="Desabilitado" disabled defaultValue="Definido pela escola" />
        </div>
      </Spec>

      <Spec label="type=email · tel · number · password · search" note="abrem o teclado certo no celular sozinhos (inputMode, autoCapitalize, autoComplete). Senha tem mostrar/ocultar — ninguém acerta senha às cegas no celular.">
        <div className="grid max-w-2xl gap-4 md:grid-cols-2">
          <Input id="k-email" label="E-mail" type="email" placeholder="teclado com @ e .com" />
          <Input id="k-tel" label="Telefone" type="tel" placeholder="teclado numérico" />
          <Input id="k-pass" label="Senha" type="password" defaultValue="hacktudo2026" />
          <Input id="k-search" label="Buscar aluno" type="search" placeholder="Enter vira Buscar" />
        </div>
      </Spec>

      <Spec label="<ChoiceGroup>" note="2 a 5 opções: blocos grandes de tocar, não radio de 16px. É assim que se pergunta qualquer coisa para a criança. columns=3 com ícone para respostas curtas; 1 coluna com descrição para as longas.">
        <div className="grid max-w-2xl gap-6">
          <ChoiceGroup name="mood" label="Como foi a atividade?" options={MOOD} value={mood} onChange={setMood} columns={3} />
          <ChoiceGroup name="periodo" label="Turno" options={PERIODO} value={periodo} onChange={setPeriodo} hint="Dá para mudar depois." />
        </div>
      </Spec>

      <Spec label="<Stepper> · <Switch> · <Checkbox> · <Textarea maxLength>" note="stepper para número num intervalo (nota, minutos): dois botões batem digitar. Switch vale na hora; checkbox espera o Salvar. Contador fica vermelho a 90%.">
        <div className="grid max-w-2xl gap-6 md:grid-cols-2">
          <Stepper id="min" label="Tempo de foco" value={minutos} onChange={setMinutos} min={5} max={30} step={5} format={(v) => `${v} min`} />
          <div>
            <Switch id="sw-1" label="Avisos por e-mail" description="Vale na hora, sem Salvar." checked={notif} onChange={setNotif} />
            <Switch id="sw-2" label="Portal da família" description="Fora do escopo do protótipo." checked={false} onChange={() => undefined} disabled />
          </div>
          <div className="md:col-span-2">
            <Textarea id="tx" label="Recado" maxLength={120} defaultValue="Revisar simplificação de frações antes da próxima prova." hint="A família lê no celular: uma ou duas frases." />
          </div>
        </div>
      </Spec>

      <Spec label="<Form> <FormSection> <FormRow> <FormActions>" note="estrutura: seções com título a partir de 5 campos; FormRow põe dois campos curtos lado a lado no desktop; ações depois do último campo, nunca fixas no rodapé (o teclado cobre).">
        <Card>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormSection title="Seção" description="Descrição curta.">
              <FormRow>
                <Input id="s-1" label="Campo curto" />
                <Input id="s-2" label="Outro curto" />
              </FormRow>
              <Input id="s-3" label="Campo largo" />
            </FormSection>
            <FormActions>
              <Button variant="ghost">Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </FormActions>
          </Form>
        </Card>
      </Spec>

      <div className="grid gap-6 md:grid-cols-2">
        <ul className="space-y-2">
          <Rule><span><strong>Valide no blur, não a cada tecla.</strong> Ninguém quer "e-mail inválido" antes de terminar de digitar. Depois de corrigido, o erro some na hora.</span></Rule>
          <Rule><span><strong>Erro diz o que fazer.</strong> "Falta o @" e não "inválido". "Escreva nome e sobrenome" e não "campo obrigatório".</span></Rule>
          <Rule><span><strong>No submit, resumo no topo + foco no primeiro erro.</strong> No celular o erro pode estar duas telas acima do botão.</span></Rule>
          <Rule><span><strong>Dica antes, erro depois.</strong> Se o formato é específico (CPF, data), a dica já mostra o formato — o erro vira raro.</span></Rule>
        </ul>
        <ul className="space-y-2">
          <Rule><span><strong>Um campo por linha no celular.</strong> Dois só no desktop, e só se forem curtos (FormRow).</span></Rule>
          <Rule><span><strong>Placeholder não é label.</strong> Some quando a pessoa digita; aí ela esquece o que era o campo.</span></Rule>
          <Rule><span><strong>O padrão é obrigatório.</strong> Marque o opcional, não o obrigatório — menos asterisco, menos ruído.</span></Rule>
          <Rule><span><strong>Botão trava enquanto salva</strong> (<code className="font-mono text-small">loading</code>). Duplo toque no celular é comum; dois envios, não.</span></Rule>
        </ul>
      </div>
    </Section>
  )
}
