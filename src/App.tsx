import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import LeadModal from './lead/LeadModal'
import { LeadModalProvider } from './lead/LeadModalContext'
import { captureAttribution, trackPageView } from './lib/track'
import DiagnosticoPage from './pages/DiagnosticoPage'
import LandingPage from './pages/LandingPage'
import ThankYouPage from './pages/ThankYouPage'

export default function App() {
  return (
    <BrowserRouter>
      <LeadModalProvider>
        <AppShell />
      </LeadModalProvider>
    </BrowserRouter>
  )
}

function AppShell() {
  const { i18n } = useTranslation()
  const location = useLocation()

  // Set html lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith('pt') ? 'pt-BR' : 'en'
  }, [i18n.language])

  // Capture attribution on first load + on every route change
  useEffect(() => {
    captureAttribution()
  }, [])

  // Scroll to top + virtual pageview on route change (SPA-safe)
  useEffect(() => {
    window.scrollTo(0, 0)
    trackPageView(location.pathname + location.search)
  }, [location.pathname, location.search])

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/diagnostico" element={<DiagnosticoPage />} />
        <Route path="/diagnostico/obrigado" element={<ThankYouPage />} />
        {/* English aliases — same components, easier for /audit campaigns */}
        <Route path="/audit" element={<DiagnosticoPage />} />
        <Route path="/audit/thank-you" element={<ThankYouPage />} />
        {/* Catch-all → landing */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <LeadModal />
      <FloatingWhatsApp />
    </>
  )
}
