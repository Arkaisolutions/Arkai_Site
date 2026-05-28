import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { config } from '../config'
import { IconArrow, IconCheck } from '../components/icons'
import { readAttribution, trackLeadSubmit } from '../lib/track'

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

export interface LeadFormProps {
  /** Called on a successful submission. Use to close modal or redirect to thank-you page. */
  onSuccess?: (payload: LeadPayload) => void
  /** Variant changes outer styling (modal is more compact, page is roomier). */
  variant?: 'modal' | 'page'
  /** Extra event metadata sent on tracking events. */
  context?: Record<string, unknown>
}

type Step = 0 | 1 | 2 | 3

export default function LeadForm({ onSuccess, variant = 'modal', context }: LeadFormProps) {
  const { t, i18n } = useTranslation()

  const [step, setStep] = useState<Step>(0)
  const [sector, setSector] = useState('')
  const [bottleneck, setBottleneck] = useState('')
  const [revenue, setRevenue] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [company, setCompany] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
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
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      timestamp: new Date().toISOString(),
      attribution: readAttribution(),
    }

    try {
      if (!config.leadWebhookUrl) {
        // Dev / not configured — log so demos still work.
        console.info('[Arkai] LeadForm payload (no webhook configured):', payload)
        await new Promise((r) => setTimeout(r, 700))
      } else {
        const res = await fetch(config.leadWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
      }

      // Tracking — for Meta/Google/GA conversion event.
      trackLeadSubmit({
        sector,
        bottleneck,
        revenue,
        language: payload.language,
        variant,
        ...context,
      })

      setSuccess(true)
      onSuccess?.(payload)
    } catch (err) {
      console.error('[Arkai] Lead submit failed:', err)
      setErrored(true)
    } finally {
      setSubmitting(false)
    }
  }

  /* ---------------- UI ---------------- */

  if (success && variant === 'modal') return <SuccessView />
  if (errored) return <ErrorView onRetry={() => setErrored(false)} />

  const paddingCls = variant === 'page' ? 'p-7 sm:p-10' : ''

  return (
    <div className={paddingCls}>
      {/* Progress */}
      <div className="mb-6 h-1 w-full rounded-full bg-line">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-500"
          style={{ width: `${((step + 1) / 4) * 100}%` }}
        />
      </div>

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
    </div>
  )
}

/* ---------------- internal pieces ---------------- */

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

function SuccessView() {
  const { t } = useTranslation()
  return (
    <div className="py-4 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-white">
        <IconCheck width={28} height={28} />
      </div>
      <h3 className="mt-6 text-2xl font-extrabold tracking-tight">{t('modal.successTitle')}</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">{t('modal.successBody')}</p>
      <a href={config.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary mt-7">
        {t('modal.successBookCta')}
      </a>
    </div>
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
