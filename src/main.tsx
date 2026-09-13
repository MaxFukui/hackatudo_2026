import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// A landing chega pré-renderizada (SEO). Nas outras rotas o HTML estático é da
// landing, então descarta e renderiza do zero para evitar erro de hidratação.
if (container.hasChildNodes() && window.location.pathname === '/') {
  hydrateRoot(container, app)
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}
