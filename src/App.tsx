import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TwoPaths from './components/TwoPaths'
import CommandCenter from './components/CommandCenter'
import Services from './components/Services'
import Process from './components/Process'
import Work from './components/Work'
import Stack from './components/Stack'
import SixAgents from './components/SixAgents'
import Pricing from './components/Pricing'
import { ArkaiCases, ArkaiFAQ } from './components/ArkaiProofFaq'
import CTA from './components/CTA'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { setSeo } from './lib/seo'

export default function App() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith('pt')
      ? 'pt-BR'
      : i18n.language.startsWith('es')
        ? 'es'
        : 'en'
  }, [i18n.language])

  useEffect(() => {
    setSeo({
      title: t('seo.agenciaTitle'),
      description: t('seo.agenciaDesc'),
      canonicalPath: '/agencia',
    })
  }, [t])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TwoPaths />
        <CommandCenter />
        <Services />
        <Process />
        <Work />
        <Stack />
        <SixAgents />
        <ArkaiCases />
        <Pricing />
        <ArkaiFAQ />
        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
