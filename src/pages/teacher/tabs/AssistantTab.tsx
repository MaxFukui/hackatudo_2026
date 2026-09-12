import { PageHeader } from '@/components/layout'
import { AiAssistantPanel } from '../components/AiAssistantPanel'

export function AssistantTab() {
  return (
    <>
      <PageHeader title="Assistente IA" description="Planos de aula, exercícios e análise da turma." />
      <AiAssistantPanel />
    </>
  )
}
