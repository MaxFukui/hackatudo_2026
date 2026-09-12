import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// Ponto na frente libera o domínio e todos os subdomínios (*.predikta.dev).
const allowedHosts = ['.predikta.dev']

// host: true escuta em todas as interfaces (IPv4 e IPv6). Sem isso o Vite fica só em
// [::1] e o túnel/proxy que aponta para 127.0.0.1 ou vem de um container não alcança.
// allowedHosts continua barrando qualquer Host que não seja localhost ou *.predikta.dev.
const host = true

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: { host, allowedHosts },
  preview: { host, allowedHosts },
})
