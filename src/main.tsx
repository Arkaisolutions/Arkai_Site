import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import InstitucionalPage from './pages/InstitucionalPage.tsx'
import VagasPage from './pages/VagasPage.tsx'
import LegalPage from './pages/LegalPage.tsx'
import { getCookieConsent } from './components/CookieBanner.tsx'
import { initMetaPixel } from './lib/metaPixel.ts'

/**
 * Router minimalista, baseado em window.location.pathname.
 * Arquitetura do briefing: institucional em "/" e campanha em "/vagas".
 *
 * Vercel.json faz rewrite de qualquer path → /index.html, então todas
 * as rotas servem o mesmo bundle e este switch decide o componente.
 */

// URLs antigas nunca quebram: redirecionam preservando a query (UTMs).
const REDIRECTS: Record<string, string> = {
  '/oferta': '/vagas',
  '/offer': '/vagas',
  '/diagnostico': '/vagas',
  '/audit': '/vagas',
  '/diagnostico/obrigado': '/',
  '/audit/thank-you': '/',
  '/agencia': '/',
  '/agency': '/',
  '/servicos': '/',
}

function pickRoot() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (REDIRECTS[path]) {
    window.location.replace(REDIRECTS[path] + window.location.search)
    return null
  }

  if (path === '/vagas') return <VagasPage />
  if (path === '/privacidade') return <LegalPage tipo="privacidade" />
  if (path === '/termos') return <LegalPage tipo="termos" />
  return <InstitucionalPage />
}

// Medição (Meta Pixel) só depois do aceite no banner de cookies.
// Sem ID configurado, initMetaPixel é no-op e o banner nem aparece.
if (getCookieConsent() === 'accepted') initMetaPixel()

const root = pickRoot()
if (root) {
  createRoot(document.getElementById('root')!).render(<StrictMode>{root}</StrictMode>)
}
