import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Work from './components/Work'
import Stack from './components/Stack'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import LeadModal from './lead/LeadModal'
import { LeadModalProvider } from './lead/LeadModalContext'

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith('pt') ? 'pt-BR' : 'en'
  }, [i18n.language])

  return (
    <LeadModalProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Work />
        <Stack />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <LeadModal />
    </LeadModalProvider>
  )
}
