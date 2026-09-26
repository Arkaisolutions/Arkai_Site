import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import CookieConsent from './components/CookieConsent.tsx'
import RouteRoot from './RouteRoot.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouteRoot />
    <CookieConsent />
  </StrictMode>,
)
