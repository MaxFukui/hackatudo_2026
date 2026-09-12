import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// Ponto na frente libera o domínio e todos os subdomínios (*.predikta.dev).
const allowedHosts = ['.predikta.dev']

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: { allowedHosts },
  preview: { allowedHosts },
})
