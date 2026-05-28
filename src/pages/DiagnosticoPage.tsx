import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AuroraBg from '../components/AuroraBg'
import { IconBolt, IconCheck } from '../components/icons'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import LeadForm from '../lead/LeadForm'
import { captureAttribution, trackPageView } from '../lib/track'

export default function DiagnosticoPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = t('diagPage.metaTitle')
    captureAttribution()
    trackPageView('/diagnostico', t('diagPage.metaTitle'))
  }, [t])

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden pt-32 pb-20 sm:pt-36">
        <AuroraBg />

        <div className="container-content relative z-10">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            {/* Left: copy + trust elements */}
            <div className="text-center lg:text-left lg:sticky lg:top-28">
              <Reveal>
                <span className="eyebrow">
                  <IconBolt width={13} height={13} className="text-accent" />
                  {t('diagPage.badge')}
                </span>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]">
                  {t('diagPage.title1')}
                  <br />
                  <span className="gradient-text">{t('diagPage.title2')}</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted lg:mx-0">
                  {t('diagPage.subtitle')}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <ul className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 text-sm sm:flex-row sm:items-center sm:justify-center sm:gap-5 lg:mx-0 lg:justify-start">
                  <TrustItem text={t('diagPage.trust1')} />
                  <TrustItem text={t('diagPage.trust2')} />
                  <TrustItem text={t('diagPage.trust3')} />
                </ul>
              </Reveal>
            </div>

            {/* Right: form card */}
            <Reveal delay={320}>
              <div className="rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-30px_rgb(var(--accent))]">
                <LeadForm
                  variant="page"
                  context={{ origin: 'page', path: '/diagnostico' }}
                  onSuccess={() => navigate('/diagnostico/obrigado')}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

function TrustItem({ text }: { text: string }) {
  return (
    <li className="inline-flex items-center justify-center gap-2 text-ink/85">
      <IconCheck width={15} height={15} className="text-accent-2" />
      {text}
    </li>
  )
}
