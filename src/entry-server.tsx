/* oxlint-disable react/only-export-components */
// Usado só no build (scripts/prerender.mjs) para gerar o HTML estático da landing.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { AuthProvider } from '@/context/AuthProvider'
import { LandingPage } from '@/pages/landing/LandingPage'
import { FAQ } from '@/pages/landing/faq'

export function render(): string {
  return renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </MemoryRouter>
    </StrictMode>,
  )
}

export function structuredData(siteUrl: string): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Educa',
      url: `${siteUrl}/`,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      inLanguage: 'pt-BR',
      description:
        'Plataforma de gamificação para a sala de aula: cada aluno cuida de um monstrinho virtual que evolui com presença, participação e boas notas.',
      audience: { '@type': 'EducationalAudience', educationalRole: ['student', 'teacher', 'administrator'] },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]
}
