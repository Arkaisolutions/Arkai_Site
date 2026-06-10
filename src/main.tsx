import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App.tsx'
import DiagnosticoPage from './pages/DiagnosticoPage.tsx'
import OfertaPage from './pages/OfertaPage.tsx'
import ThankYouPage from './pages/ThankYouPage.tsx'
import { config } from './config.ts'
import { initMetaPixel } from './lib/metaPixel.ts'

/**
 * Router minimalista, baseado em window.location.pathname.
 * Sem react-router. App.tsx (home) fica 100% intocado.
 *
 * Vercel.json já faz rewrite de qualquer path → /index.html,
 * então /diagnostico e /diagnostico/obrigado servem o mesmo bundle
 * e este switch decide qual componente mostrar.
 */
function pickRoot() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/diagnostico' || path === '/audit') return <DiagnosticoPage />
  if (path === '/diagnostico/obrigado' || path === '/audit/thank-you') return <ThankYouPage />
  // Rotas nomeadas SEMPRE acessíveis (independente do homeMode):
  if (path === '/agencia' || path === '/agency' || path === '/servicos') return <App />
  if (path === '/oferta' || path === '/offer') return <OfertaPage />
  // A HOME ("/") e qualquer rota desconhecida seguem config.homeMode.
  return config.homeMode === 'agencia' ? <App /> : <OfertaPage />
}

// Meta Pixel (no-op se config.metaPixelId estiver vazio)
initMetaPixel()

createRoot(document.getElementById('root')!).render(
  <StrictMode>{pickRoot()}</StrictMode>,
)
