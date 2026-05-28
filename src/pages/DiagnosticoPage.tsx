import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AuroraBg from '../components/AuroraBg'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Reveal from '../components/Reveal'
import { IconArrow, IconBolt, IconCheck } from '../components/icons'
import { config } from '../config'
import { LeadModalProvider } from '../lead/LeadModalContext'
import { captureAttribution, readAttribution, trackLeadSubmit, trackPageView } from '../lib/track'

type Step = 0 | 1 | 2 | 3

interface LeadPayload {
  name: string
  email: string
  whatsapp: string
  company: string
  sector: string
  bottleneck: string
  revenue: string
  language: string
  source: string
  pageUrl: string
  referrer: string
  timestamp: string
  attribution: ReturnType<typeof readAttribution>
}

/**
 * Standalone landing pra anúncios. Sem react-router.
 * Navega usando window.location.href quando submit.
 *
 * Navbar e Footer dependem de useLeadModal(), então embrulhamos a página
 * num LeadModalProvider próprio (modal nunca abre aqui, mas evita o throw do hook).
 */
export default function DiagnosticoPage() {
  return (
    <LeadModalProvider>
      <DiagnosticoInner />
    </LeadModalProvider>
  )
}

function DiagnosticoInner() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('diagPage.metaTitle')
    captureAttribution()
    trackPageView(window.location.pathname, t('diagPage.metaTitle'))
  }, [t])

  const [step, setStep] = useState<Step>(0)
  const [sector, setSector] = useState('')
  const [bottleneck, setBottleneck] = useState('')
  const [revenue, setRevenue] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [company, setCompany] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errored, setErrored] = useState(false)

  const sectorOptions = t('modal.q1Options', { returnObjects: true }) as string[]
  const bottleneckOptions = t('modal.q2Options', { returnObjects: true }) as string[]
  const revenueOptions = t('modal.q3Options', { returnObjects: true }) as string[]

  const canNext = useMemo(() => {
    if (step === 0) return !!sector
    if (step === 1) return !!bottleneck
    if (step === 2) return !!revenue
    if (step === 3)
      return (
        name.trim().length > 1 &&
        /\S+@\S+\.\S+/.test(email) &&
        whatsapp.replace(/\D/g, '').length >= 8
      )
    return false
  }, [step, sector, bottleneck, revenue, name, email, whatsapp])

  const submit = async () => {
    setSubmitting(true)
    setErrored(false)

    const payload: LeadPayload = {
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      company: company.trim(),
      sector,
      bottleneck,
      revenue,
      language: i18n.language.startsWith('pt') ? 'pt' : 'en',
      source: 'arkaisolutions.com.br',
      pageUrl: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      attribution: readAttribution(),
    }

    try {
      if (!config.leadWebhookUrl) {
        console.info('[Arkai] DiagnosticoPage payload (no webhook configured):', payload)
        await new Promise((r) => setTimeout(r, 700))
      } else {
        const res = await fetch(config.leadWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
      }
      trackLeadSubmit({
        sector,
        bottleneck,
        revenue,
        language: payload.language,
        origin: 'page',
      })
      // Navegação simples: full reload pra /diagnostico/obrigado
      window.location.href = '/diagnostico/obrigado'
    } catch (err) {
      console.error('[Arkai] Lead submit failed:', err)
      setErrored(true)
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden pt-32 pb-20 sm:pt-36">
        <AuroraBg />

        <div className="container-content relative z-10">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div className="text-center lg:sticky lg:top-28 lg:text-left">
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

            <Reveal delay={320}>
              <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-30px_rgb(var(--accent))]">
                <div className="h-1 w-full bg-line">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-500"
                    style={{ width: `${((step + 1) / 4) * 100}%` }}
                  />
                </div>

                <div className="p-7 sm:p-10">
                  {errored ? (
                    <ErrorView onRetry={() => setErrored(false)} />
                  ) : (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                        {t('modal.step', { n: step + 1, total: 4 })}
                      </p>

                      {step === 0 && (
                        <QuestionStep
                          title={t('modal.q1Title')}
                          subtitle={t('modal.q1Subtitle')}
                          options={sectorOptions}
                          value={sector}
                          onChange={setSector}
                        />
                      )}
                      {step === 1 && (
                        <QuestionStep
                          title={t('modal.q2Title')}
                          subtitle={t('modal.q2Subtitle')}
                          options={bottleneckOptions}
                          value={bottleneck}
                          onChange={setBottleneck}
                        />
                      )}
                      {step === 2 && (
                        <QuestionStep
                          title={t('modal.q3Title')}
                          subtitle={t('modal.q3Subtitle')}
                          options={revenueOptions}
                          value={revenue}
                          onChange={setRevenue}
                        />
                      )}
                      {step === 3 && (
                        <ContactStep
                          name={name} setName={setName}
                          email={email} setEmail={setEmail}
                          whatsapp={whatsapp} setWhatsapp={setWhatsapp}
                          company={company} setCompany={setCompany}
                        />
                      )}

                      <div className="mt-8 flex items-center justify-between gap-3">
                        <button
                          onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
                          disabled={step === 0}
                          className="text-sm font-medium text-muted transition-colors hover:text-ink disabled:opacity-30"
                        >
                          ← {t('modal.back')}
                        </button>

                        {step < 3 ? (
                          <button
                            onClick={() => setStep((s) => (s + 1) as Step)}
                            disabled={!canNext}
                            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {t('modal.next')}
                            <IconArrow width={15} height={15} />
                          </button>
                        ) : (
                          <button
                            onClick={submit}
                            disabled={!canNext || submitting}
                            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {submitting ? t('modal.sending') : t('modal.submit')}
                            {!submitting && <IconArrow width={15} height={15} />}
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

/* ---------------- helpers locais ---------------- */

function TrustItem({ text }: { text: string }) {
  return (
    <li className="inline-flex items-center justify-center gap-2 text-ink/85">
      <IconCheck width={15} height={15} className="text-accent-2" />
      {text}
    </li>
  )
}

function QuestionStep({
  title, subtitle, options, value, onChange,
}: {
  title: string
  subtitle: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <h3 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h3>
      <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
      <div className="mt-6 grid gap-2.5">
        {options.map((opt) => {
          const selected = value === opt
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`flex items-center justify-between rounded-xl border px-5 py-3.5 text-left text-sm font-medium transition-all ${
                selected
                  ? 'border-accent bg-accent/10 text-ink'
                  : 'border-line bg-surface-2 text-ink/80 hover:border-accent/40 hover:text-ink'
              }`}
            >
              <span>{opt}</span>
              {selected && <IconCheck width={16} height={16} className="text-accent-2" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ContactStep({
  name, setName, email, setEmail, whatsapp, setWhatsapp, company, setCompany,
}: {
  name: string; setName: (v: string) => void
  email: string; setEmail: (v: string) => void
  whatsapp: string; setWhatsapp: (v: string) => void
  company: string; setCompany: (v: string) => void
}) {
  const { t } = useTranslation()
  return (
    <div>
      <h3 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">{t('modal.q4Title')}</h3>
      <p className="mt-1.5 text-sm text-muted">{t('modal.q4Subtitle')}</p>

      <div className="mt-6 grid gap-4">
        <Field label={t('modal.nameLabel')} value={name} onChange={setName} placeholder={t('modal.namePh')} />
        <Field label={t('modal.emailLabel')} type="email" value={email} onChange={setEmail} placeholder={t('modal.emailPh')} />
        <Field label={t('modal.whatsappLabel')} type="tel" value={whatsapp} onChange={setWhatsapp} placeholder={t('modal.whatsappPh')} />
        <Field label={t('modal.companyLabel')} value={company} onChange={setCompany} placeholder={t('modal.companyPh')} />
      </div>
    </div>
  )
}

function Field({
  label, value, onChange, placeholder, type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
      />
    </label>
  )
}

function ErrorView({ onRetry }: { onRetry: () => void }) {
  const { t } = useTranslation()
  return (
    <div className="py-6 text-center">
      <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-red-300">{t('modal.errorTitle')}</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">{t('modal.errorBody')}</p>
      <button onClick={onRetry} className="btn-primary mt-6">
        {t('modal.next')}
      </button>
    </div>
  )
}
