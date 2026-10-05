import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import CookieConsent from './components/CookieConsent.tsx'
import { initMetaPixel } from './lib/metaPixel.ts'
import RouteRoot from './RouteRoot.tsx'

// Em visitas com consentimento já salvo, inicia o Pixel antes da renderização.
// Na primeira visita, CookieConsent o inicia somente após o aceite.
initMetaPixel()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouteRoot />
    <CookieConsent />
  </StrictMode>,
)
