import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CommandCenter from './components/CommandCenter'
import Services from './components/Services'
import Process from './components/Process'
import Work from './components/Work'
import Stack from './components/Stack'
import Agents from './components/Agents'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith('pt')
      ? 'pt-BR'
      : i18n.language.startsWith('es')
        ? 'es'
        : 'en'
  }, [i18n.language])

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
        <Agents />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
