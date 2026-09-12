# Educa — HACKTUDO 2026

Plataforma educacional que usa gamificação e IA para transformar a tecnologia de fonte de distração em aliada do aprendizado.

> **Tema do Hackathon HACKTUDO 2026:** "Como construir uma relação mais consciente entre tecnologia e educação em um mundo cada vez mais conectado e cheio de distrações?"

---

## O problema

A tecnologia já está dentro da sala de aula, mas quase sempre competindo com ela. Alunos disputam atenção com feeds infinitos, enquanto professores seguem sem visibilidade real sobre quem está engajado, quem está ficando para trás e por quê.

Nossa aposta: usar os mesmos mecanismos que prendem atenção nas redes (streaks, progressão, recompensa imediata) a favor do aprendizado — e devolver ao professor dados acionáveis em vez de mais uma tela para gerenciar.

## A solução

Um sistema único com três visões (aluno, professor, diretor) sobre a mesma base de dados, conectado a três camadas de IA.

```
                                    ┌──────────────────────────┐
                                    │  IA: Avaliação do Aluno  │
                                    └────────────▲─────────────┘
                                                 │
                  ┌──────────────────────────────┴──┐
                  │      Sistema do Professor       │
                  └──────────────────▲──────────────┘
                                     │
   ┌────────────┐            ┌───────┴────────┐
   │ Dashboard  │◄───────────│  DB / Backend  │
   └────────────┘            └───────┬────────┘
          ▲                          │
          │                  ┌───────▼────────┐
          │                  │ Sistema do Aluno│
          │                  └───────┬────────┘
          │                          │
   ┌──────┴───────────┐      ┌───────▼──────────────────┐
   │  Sistema Streak  │─────►│  IA: Tutor do Aluno      │
   │  • Presença      │      │  • Ajuda no ensino       │
   │  • Participação  │      │  • Avaliação do aluno    │
   │  • Provas acima  │      └──────────────────────────┘
   │    da média      │
   └──────┬───────────┘
          │
          ▼
   ┌──────────────────┐
   │ Bichinho evolui  │
   └──────────────────┘
```

### 1. Sistema de Streak (gamificação)

O aluno acumula pontos e XP por comportamentos que realmente importam:

| Evento | Pontos |
|---|---|
| Presença | 10 |
| Participação em aula | 15 |
| Exercício concluído | 10 |
| Prova acima da média da turma | 30 |

Pontos alimentam níveis (`Explorador` → `Aprendiz` → `Dedicado` → `Mestre`) e evoluem o **bichinho** do aluno — um mascote que fica mais forte conforme a constância. A recompensa é visível, diária e pertence ao aluno.

### 2. IA para o aluno (tutor)

Assistente com contexto de série, matéria e histórico do próprio aluno:

- explica conteúdo no nível da turma;
- gera exercícios e dicas progressivas;
- revisa erros em vez de entregar respostas;
- monta plano de estudo personalizado.

**Restrições embutidas:** não entrega respostas diretas de prova, não sai do escopo da série.

### 3. IA para o professor (análise e avaliação)

- analisa desempenho da turma e identifica lacunas de aprendizagem;
- sugere atividades e gera planos de aula;
- produz avaliação por aluno com **pontos fortes**, **pontos de atenção** e **recomendações**, cruzando notas, frequência, participação e histórico de atividades.

### 4. Dashboard

Visão agregada para professor e diretor: média da turma, taxa de frequência, participação, distribuição de desempenho (`crítico` → `excelente`) e alertas automáticos (ex.: *"queda de 18% nas últimas três atividades"*).

---

## Personas

| Persona | Perfil | Uso |
|---|---|---|
| **Aluno** | 4º ano, Matemática | Streak, bichinho, tutor de IA, atividades |
| **Professor** | 4º ano, Matemática | Dashboard da turma, avaliações por IA, criação de atividades |
| **Diretor** | Escola inteira | Dados consolidados, turmas, professores, relatórios |

## Telas

- Landing page e login
- Sistema do Aluno — `home`, `subjects`, `activities`, `performance`, `streak`, `aiTutor`
- Sistema do Professor — `dashboard`, `classes`, `students`, `activities`, `evaluations`, `aiAssistant`
- Sistema do Diretor — `dashboard`, `classes`, `teachers`, `students`, `performance`, `reports`

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # checagem de tipos + build de produção
npm run lint
```

Stack: Vite · React 19 · TypeScript · React Router · Tailwind CSS v4.

Na landing, escolha o perfil (Aluno, Professor ou Diretor) e clique em **Entrar**. O login é simulado.

## Estrutura do frontend

Cada página tem um dono. Quem é dono mexe à vontade na sua pasta. Os arquivos marcados com ⚠️ são usados por todos: antes de alterar, avise o time.

```
src/
├── types/          ⚠️ contrato de dados (espelha db.json)
├── services/       ⚠️ mock da API — trocar por fetch sem mexer em componentes
├── components/ui/  ⚠️ Button, Card, Badge, Table, Tabs, Modal…
├── components/layout/  AppShell, Sidebar, Topbar, PageHeader, RequireRole
├── components/charts/  DistributionBar, ScoreDonut, Sparkline
├── hooks/          useAuth, useAsync, useTab
├── lib/            format, roles
├── routes.tsx      ⚠️
└── pages/
    ├── landing/    /           Landpage + Login
    ├── student/    /aluno      Sistema do Aluno
    ├── teacher/    /professor  Sistema do Professor
    └── dashboard/  /diretor    Dashboard do Diretor
```

As abas internas ficam na URL (`/aluno?tab=streak`), então nenhuma página precisa alterar `routes.tsx`.

## Modelo de dados

O arquivo [`src/data/db.json`](./src/data/db.json) é a fonte de verdade do protótipo — contrato de dados e mock do backend ao mesmo tempo. Estrutura principal:

| Chave | Conteúdo |
|---|---|
| `enums` | Papéis, status de presença, níveis de desempenho, tipos de atividade |
| `academicContext` | Ano letivo, séries, turmas, matérias |
| `users` | Professores e alunos (com `performance` e `streak`) |
| `dashboard` | Resumo, distribuição de desempenho, alertas |
| `streakSystem` | Regras de pontuação e níveis |
| `activities` / `studentResults` | Atividades e resultados por aluno |
| `ai` | Configuração dos três assistentes de IA |
| `teacherApp` / `studentApp` / `directorApp` | Navegação e permissões por perfil |
| `api` | Rotas planejadas sob `/api/v1` |
| `featureFlags` | Liga/desliga de funcionalidades |

### Feature flags

```jsonc
{
  "studentAiTutor":      true,
  "teacherAiAssistant":  true,
  "aiStudentEvaluation": true,
  "gamification":        true,
  "directorDashboard":   true,
  "notifications":       false,  // fora do escopo do hackathon
  "parentPortal":        false   // fora do escopo do hackathon
}
```

## Escopo do protótipo

Recorte proposital para o hackathon: **1 escola, 1 turma (4º Ano A), 1 matéria (Matemática)**. Profundidade sobre amplitude — o modelo de dados já é genérico o bastante para escalar para outras séries e disciplinas sem mudança estrutural.

## Status

Em desenvolvimento durante o Hackathon HACKTUDO 2026 (11–19 de setembro de 2026).

- [x] Modelo de dados (`db.json`)
- [ ] Landing page e login
- [ ] Sistema do Aluno
- [ ] Sistema do Professor
- [ ] Sistema do Diretor
- [ ] Integração com IA
- [ ] Pitch deck e vídeo de demonstração

## Critérios de avaliação (referência)

Adequação ao tema · Originalidade/Inovação · Solução tecnológica · Utilidade e aplicabilidade — pesos equivalentes.
