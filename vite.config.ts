import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type ProxyOptions } from 'vite'

// Ponto na frente libera o domínio e todos os subdomínios (*.predikta.dev).
const allowedHosts = ['.predikta.dev']

// host: true escuta em todas as interfaces (IPv4 e IPv6). Sem isso o Vite fica só em
// [::1] e o túnel/proxy que aponta para 127.0.0.1 ou vem de um container não alcança.
// allowedHosts continua barrando qualquer Host que não seja localhost ou *.predikta.dev.
const host = true

/** Caminho que o browser chama; o Vite repassa para a API da Anthropic. */
const ANTHROPIC_PROXY_PATH = '/api/anthropic'

// A chave fica só no servidor: ANTHROPIC_API_KEY (sem VITE_) nunca vai para o bundle.
// O browser chama /api/anthropic/v1/messages e o proxy troca o x-api-key de mentira pelo real.
function anthropicProxy(apiKey: string): Record<string, ProxyOptions> {
  return {
    [ANTHROPIC_PROXY_PATH]: {
      target: 'https://api.anthropic.com',
      changeOrigin: true,
      rewrite: (path) => path.slice(ANTHROPIC_PROXY_PATH.length),
      configure: (proxy) => {
        proxy.on('proxyReq', (req) => {
          req.setHeader('x-api-key', apiKey)
          // A chamada agora é servidor→API: sem cabeçalhos de browser, a API não trata como CORS.
          req.removeHeader('anthropic-dangerous-direct-browser-access')
          req.removeHeader('origin')
          req.removeHeader('referer')
          req.removeHeader('cookie')
        })
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Prefixo '' lê todas as variáveis do .env, mas só no Node; nada disso chega ao browser.
  const apiKey = loadEnv(mode, process.cwd(), '').ANTHROPIC_API_KEY ?? ''
  const proxy = apiKey ? anthropicProxy(apiKey) : undefined

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // O browser só sabe SE a IA está disponível, nunca a chave.
    define: {
      'import.meta.env.VITE_IA_DISPONIVEL': JSON.stringify(Boolean(apiKey)),
    },
    server: { host, allowedHosts, proxy },
    preview: { host, allowedHosts, proxy },
  }
})
