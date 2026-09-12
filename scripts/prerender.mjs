// Pós-build: injeta o HTML da landing em dist/index.html e gera robots.txt e sitemap.xml.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const siteUrl = (process.env.VITE_SITE_URL ?? 'https://gizzi.app').replace(/\/$/, '')

const { render, structuredData } = await import(`${root}dist-ssr/entry-server.js`)

const indexPath = `${root}dist/index.html`
let html = await readFile(indexPath, 'utf8')

const jsonLd = structuredData(siteUrl)
  .map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
  .join('\n    ')

html = html
  .replaceAll('__SITE_URL__', siteUrl)
  .replace('<!--structured-data-->', jsonLd)
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)

await writeFile(indexPath, html)

await writeFile(
  `${root}dist/robots.txt`,
  `User-agent: *
Allow: /
Disallow: /aluno
Disallow: /professor
Disallow: /diretor
Disallow: /estilo

Sitemap: ${siteUrl}/sitemap.xml
`,
)

await writeFile(
  `${root}dist/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>
</urlset>
`,
)

await rm(`${root}dist-ssr`, { recursive: true, force: true })
console.log(`prerender: / renderizada · site ${siteUrl}`)
