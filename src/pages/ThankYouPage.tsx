import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import AuroraBg from '../components/AuroraBg'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Reveal from '../components/Reveal'
import { IconArrow, IconCheck, IconWhatsApp } from '../components/icons'
import { config, whatsappLink } from '../config'
import { trackEvent, trackPageView } from '../lib/track'

export default function ThankYouPage() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('thanksPage.metaTitle')
    trackPageView('/diagnostico/obrigado', t('thanksPage.metaTitle'))
    // Explicit conversion event in case the ad pixel listens to a named event
    trackEvent('lead_thankyou', { path: '/diagnostico/obrigado' })
  }, [t])

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden pt-32 pb-24 sm:pt-36">
        <AuroraBg />

        <div className="container-content relative z-10 mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-white shadow-[0_18px_60px_-12px_rgb(var(--accent))]">
              <IconCheck width={36} height={36} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl">
              <span className="gradient-text">{t('thanksPage.title')}</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t('thanksPage.subtitle')}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 text-left">
              <h2 className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-muted">
                {t('thanksPage.stepsTitle')}
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <StepCard
                  title={t('thanksPage.step1Title')}
                  desc={t('thanksPage.step1Desc')}
                />
                <StepCard
                  title={t('thanksPage.step2Title')}
                  desc={t('thanksPage.step2Desc')}
                />
                <StepCard
                  title={t('thanksPage.step3Title')}
                  desc={t('thanksPage.step3Desc')}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(t('wa.prefill'))}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <IconWhatsApp width={16} height={16} />
                {t('thanksPage.wa')}
              </a>
              <Link to="/" className="btn-ghost">
                {t('thanksPage.backHome')}
                <IconArrow width={15} height={15} />
              </Link>
            </div>
          </Reveal>

          {/* Hidden config note used by Calendly etc.  */}
          <a href={config.bookingUrl} className="sr-only">
            booking
          </a>
        </div>
      </main>

      <Footer />
    </>
  )
}

function StepCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5 text-left">
      <h3 className="text-sm font-bold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted">{desc}</p>
    </div>
  )
}
