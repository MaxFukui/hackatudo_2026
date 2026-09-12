import { PageHeader } from '@/components/layout/PageHeader'
import { AiAssistantPanel } from '../components/AiAssistantPanel'

export function AssistantTab() {
  return (
    <>
      <PageHeader title="Assistente IA" subtitle="Planos de aula, exercícios e análise da turma." />
      <AiAssistantPanel />
    </>
  )
}
