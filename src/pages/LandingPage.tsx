import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CommandCenter from '../components/CommandCenter'
import Services from '../components/Services'
import Process from '../components/Process'
import Work from '../components/Work'
import Stack from '../components/Stack'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import { trackPageView } from '../lib/track'

export default function LandingPage() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = 'Arkai Solutions — AI Agents That Run Your Business'
    trackPageView('/', document.title)
  }, [t])

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
