/* oxlint-disable react/only-export-components */
// Usado só no build (scripts/prerender.mjs) para gerar o HTML estático da landing.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { AuthProvider } from '@/context/AuthProvider'
import { LandingPage } from '@/pages/landing/LandingPage'
import { FAQ } from '@/pages/landing/faq'
import { VIDEOS } from '@/pages/landing/videos'

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
      name: 'gizzi',
      url: `${siteUrl}/`,
      image: `${siteUrl}/logo-light.svg`,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      inLanguage: 'pt-BR',
      description:
        'Plataforma de gamificação para a sala de aula: cada aluno cuida de um monstrinho virtual que evolui com presença, participação e boas notas.',
      audience: { '@type': 'EducationalAudience', educationalRole: ['student', 'teacher', 'administrator'] },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    },
    ...Object.values(VIDEOS).map((video) => ({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.name,
      description: video.description,
      thumbnailUrl: `${siteUrl}${video.poster}`,
      contentUrl: `${siteUrl}${video.src}`,
      uploadDate: '2026-09-12',
      duration: video.duration,
      inLanguage: 'pt-BR',
    })),
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
