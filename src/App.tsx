import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CommandCenter from './components/CommandCenter'
import Services from './components/Services'
import Process from './components/Process'
import Work from './components/Work'
import Stack from './components/Stack'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import LeadModal from './lead/LeadModal'
import { LeadModalProvider } from './lead/LeadModalContext'
import { captureAttribution, trackPageView } from './lib/track'
import DiagnosticoPage from './pages/DiagnosticoPage'
import ThankYouPage from './pages/ThankYouPage'

/**
 * HomePage = render IDÊNTICO ao App.tsx anterior. Não mexer.
 */
function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CommandCenter />
        <Services />
        <Process />
        <Work />
        <Stack />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

function RouterEffects() {
  const location = useLocation()

  // First load: capture UTM/click IDs into sessionStorage
  useEffect(() => {
    captureAttribution()
  }, [])

  // SPA-safe pageview + scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    trackPageView(location.pathname + location.search)
  }, [location.pathname, location.search])

  return null
}

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith('pt') ? 'pt-BR' : 'en'
  }, [i18n.language])

  return (
    <BrowserRouter>
      <LeadModalProvider>
        <RouterEffects />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diagnostico" element={<DiagnosticoPage />} />
          <Route path="/diagnostico/obrigado" element={<ThankYouPage />} />
          <Route path="/audit" element={<DiagnosticoPage />} />
          <Route path="/audit/thank-you" element={<ThankYouPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <LeadModal />
        <FloatingWhatsApp />
      </LeadModalProvider>
    </BrowserRouter>
  )
}
