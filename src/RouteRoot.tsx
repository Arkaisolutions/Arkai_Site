import { lazy, Suspense } from 'react'

const App = lazy(() => import('./App.tsx'))
const DiagnosticoPage = lazy(() => import('./pages/DiagnosticoPage.tsx'))
const OfertaPage = lazy(() => import('./pages/OfertaPage.tsx'))
const ThankYouPage = lazy(() => import('./pages/ThankYouPage.tsx'))
const LegalPage = lazy(() => import('./pages/LegalPage.tsx'))

/**
 * Router minimalista, baseado em window.location.pathname.
 * O rewrite da Vercel serve index.html nas rotas; cada página carrega sob demanda.
 */
function pickRoot() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/diagnostico' || path === '/audit') return <DiagnosticoPage />
  if (path === '/diagnostico/obrigado' || path === '/audit/thank-you') return <ThankYouPage />
  if (path === '/privacidade') return <LegalPage kind="privacy" />
  if (path === '/termos') return <LegalPage kind="terms" />
  if (path === '/') return <OfertaPage />
  if (path === '/agencia' || path === '/agency' || path === '/servicos') return <App />
  if (path === '/vagas' || path === '/oferta' || path === '/offer') return <OfertaPage />
  return <OfertaPage />
}

export default function RouteRoot() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-bg text-sm text-muted" role="status">Carregando…</div>}>
      {pickRoot()}
    </Suspense>
  )
}
