import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { config } from '../config'
import { readAnalyticsConsent } from '../lib/consent'
import { readAttribution, trackLeadSubmit } from '../lib/track'

type DeliveryState = 'idle' | 'sending' | 'sent' | 'preview' | 'error'
type Locale = 'pt' | 'en' | 'es'

interface ContactFormProps {
  onDelivered?: () => void
}

const fieldClass =
  'w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent'

const copy: Record<Locale, {
  labels: { name: string; whatsapp: string; company: string; sector: string; bottleneck: string }
  consentBefore: string
  privacyLink: string
  consentAfter: string
  sentTitle: string
  sentMessage: string
  previewTitle: string
  previewMessage: string
  error: string
  sending: string
  submit: string
}> = {
  pt: {
    labels: { name: 'Nome', whatsapp: 'WhatsApp', company: 'Empresa', sector: 'Segmento', bottleneck: 'O que mais trava hoje?' },
    consentBefore: 'Autorizo a Arkai a entrar em contato sobre esta solicitação e concordo com a',
    privacyLink: 'Política de Privacidade',
    consentAfter: '.',
    sentTitle: 'Recebido.',
    sentMessage: 'Sua solicitação foi enviada à Arkai. Podemos entrar em contato pelo WhatsApp informado.',
    previewTitle: 'Prévia local.',
    previewMessage: 'Este formulário está em modo de demonstração. Nenhum dado foi enviado.',
    error: 'Não foi possível enviar agora. Confira sua conexão e tente novamente.',
    sending: 'Enviando...',
    submit: 'Quero a análise da minha operação',
  },
  en: {
    labels: { name: 'Name', whatsapp: 'WhatsApp', company: 'Company', sector: 'Industry', bottleneck: 'What is your biggest bottleneck today?' },
    consentBefore: 'I authorize Arkai to contact me about this request and agree to the',
    privacyLink: 'Privacy Policy (in Portuguese)',
    consentAfter: '.',
    sentTitle: 'Received.',
    sentMessage: 'Your request was sent to Arkai. We may contact you on the WhatsApp number provided.',
    previewTitle: 'Local preview.',
    previewMessage: 'This form is in demonstration mode. No data was sent.',
    error: 'We could not send your request right now. Check your connection and try again.',
    sending: 'Sending...',
    submit: 'Request a review of my operations',
  },
  es: {
    labels: { name: 'Nombre', whatsapp: 'WhatsApp', company: 'Empresa', sector: 'Sector', bottleneck: '¿Cuál es tu mayor obstáculo hoy?' },
    consentBefore: 'Autorizo a Arkai a contactarme sobre esta solicitud y acepto la',
    privacyLink: 'Política de Privacidad (en portugués)',
    consentAfter: '.',
    sentTitle: 'Recibido.',
    sentMessage: 'Tu solicitud fue enviada a Arkai. Podemos contactarte por el WhatsApp indicado.',
    previewTitle: 'Vista previa local.',
    previewMessage: 'Este formulario está en modo de demostración. No se enviaron datos.',
    error: 'No pudimos enviar tu solicitud ahora. Revisa tu conexión e inténtalo de nuevo.',
    sending: 'Enviando...',
    submit: 'Quiero un análisis de mi operación',
  },
}

function isLocalPreview() {
  return ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)
}

export default function ContactForm({ onDelivered }: ContactFormProps) {
  const { i18n } = useTranslation()
  const locale: Locale = i18n.language.startsWith('en') ? 'en' : i18n.language.startsWith('es') ? 'es' : 'pt'
  const content = copy[locale]
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [company, setCompany] = useState('')
  const [sector, setSector] = useState('')
  const [bottleneck, setBottleneck] = useState('')
  const [consent, setConsent] = useState(false)
  const [delivery, setDelivery] = useState<DeliveryState>('idle')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (delivery === 'sending' || !consent) return

    const fields = { name: name.trim(), whatsapp: whatsapp.trim(), company: company.trim(), sector: sector.trim(), bottleneck: bottleneck.trim() }
    if (!fields.name || !fields.company || !fields.sector || !fields.bottleneck || fields.whatsapp.replace(/\D/g, '').length < 8) return

    setDelivery('sending')

    // As chaves antigas vazias mantêm o formato do payload até o fluxo receptor
    // ser revisado. Não representam dados solicitados ao visitante.
    const analyticsAllowed = readAnalyticsConsent() === 'accepted'
    const payload = {
      ...fields,
      email: '',
      revenue: '',
      language: locale,
      source: config.domain,
      pageUrl: analyticsAllowed ? window.location.href : `${window.location.origin}${window.location.pathname}`,
      referrer: analyticsAllowed ? document.referrer : '',
      timestamp: new Date().toISOString(),
      consentGivenAt: new Date().toISOString(),
      privacyPolicyUrl: `${window.location.origin}/privacidade`,
      attribution: readAttribution(),
    }

    // Uma prévia local nunca envia dados para o webhook de produção.
    if (isLocalPreview()) {
      setDelivery('preview')
      return
    }

    if (!config.leadWebhookUrl) {
      setDelivery('error')
      return
    }

    try {
      const response = await fetch(config.leadWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(`Lead webhook: ${response.status}`)
      trackLeadSubmit({ origin: window.location.pathname, sector: fields.sector })
      setDelivery('sent')
      onDelivered?.()
    } catch (error) {
      console.error('[Arkai] Não foi possível enviar a solicitação.', error)
      setDelivery('error')
    }
  }

  if (delivery === 'sent' || delivery === 'preview') {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-7 text-center" role="status">
        <h2 className="text-2xl font-bold text-ink">
          {delivery === 'sent' ? content.sentTitle : content.previewTitle}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {delivery === 'sent' ? content.sentMessage : content.previewMessage}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <Field label={content.labels.name} name="name" value={name} onChange={setName} autoComplete="name" />
      <Field label={content.labels.whatsapp} name="whatsapp" type="tel" value={whatsapp} onChange={setWhatsapp} autoComplete="tel" />
      <Field label={content.labels.company} name="company" value={company} onChange={setCompany} autoComplete="organization" />
      <Field label={content.labels.sector} name="sector" value={sector} onChange={setSector} />
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">{content.labels.bottleneck}</span>
        <textarea
          name="bottleneck"
          value={bottleneck}
          onChange={(event) => setBottleneck(event.target.value)}
          rows={4}
          required
          className={fieldClass}
        />
      </label>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[rgb(var(--accent))]"
        />
        <span>
          {content.consentBefore}{' '}
          <a href="/privacidade" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-ink">
            {content.privacyLink}
          </a>{content.consentAfter}
        </span>
      </label>

      {delivery === 'error' && (
        <p role="alert" className="text-sm text-red-300">
          {content.error}
        </p>
      )}

      <button type="submit" disabled={delivery === 'sending'} className="btn-primary w-full justify-center disabled:cursor-wait disabled:opacity-60">
        {delivery === 'sending' ? content.sending : content.submit}
      </button>
    </form>
  )
}

function Field({ label, name, value, onChange, type = 'text', autoComplete }: {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  type?: string
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required
        className={fieldClass}
      />
    </label>
  )
}
