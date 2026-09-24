import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrow, IconCheck } from './icons'
import { config } from '../config'
import { readAttribution, trackLeadSubmit } from '../lib/track'

/**
 * Formulário único do briefing, usado na institucional e na /vagas.
 * Campos: Nome, WhatsApp, Empresa, Segmento, "O que mais trava hoje?".
 * Consentimento obrigatório (LGPD). POST no webhook de leads (n8n).
 */
export default function LeadForm({ origem }: { origem: string }) {
  const { t, i18n } = useTranslation()
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [segmento, setSegmento] = useState('')
  const [trava, setTrava] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error' | 'invalid'>('idle')

  const selos = t('leadForm.selos', { returnObjects: true }) as string[]

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !whatsapp.trim() || !consent) {
      setStatus('invalid')
      return
    }
    setStatus('sending')
    const payload = {
      type: 'analise-operacao',
      origem,
      nome: nome.trim(),
      whatsapp: whatsapp.trim(),
      empresa: empresa.trim(),
      segmento: segmento.trim(),
      trava: trava.trim(),
      consentimento: true,
      idioma: i18n.language,
      page: window.location.pathname,
      pageUrl: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      attribution: readAttribution(),
    }
    try {
      if (!config.leadWebhookUrl) {
        console.info('[Arkai] LeadForm payload (sem webhook configurado):', payload)
        await new Promise((r) => setTimeout(r, 600))
      } else {
        const res = await fetch(config.leadWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`Webhook respondeu ${res.status}`)
      }
      trackLeadSubmit({ origem, segmento: payload.segmento })
      setStatus('ok')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-2xl border border-accent/40 bg-accent/10 p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-2/15 text-accent-2">
          <IconCheck width={24} height={24} />
        </span>
        <p className="mt-4 text-base font-semibold text-ink">{t('leadForm.sucesso')}</p>
      </div>
    )
  }

  const inputCls =
    'w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none'

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-9">
      <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
        {t('leadForm.title')}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted sm:text-base">
        {t('leadForm.subtitle')}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {selos.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs font-semibold text-ink/85"
          >
            <IconCheck width={13} height={13} className="text-accent-2" />
            {s}
          </span>
        ))}
      </div>

      <form onSubmit={enviar} className="mx-auto mt-8 flex max-w-xl flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input className={inputCls} placeholder={t('leadForm.nome')} value={nome} onChange={(e) => setNome(e.target.value)} name="nome" autoComplete="name" />
          <input className={inputCls} placeholder={t('leadForm.whatsapp')} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} name="whatsapp" inputMode="tel" autoComplete="tel" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className={inputCls} placeholder={t('leadForm.empresa')} value={empresa} onChange={(e) => setEmpresa(e.target.value)} name="empresa" autoComplete="organization" />
          <input className={inputCls} placeholder={t('leadForm.segmento')} value={segmento} onChange={(e) => setSegmento(e.target.value)} name="segmento" />
        </div>
        <textarea
          className={`${inputCls} min-h-[96px] resize-y`}
          placeholder={t('leadForm.trava')}
          value={trava}
          onChange={(e) => setTrava(e.target.value)}
          name="trava"
        />

        <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-relaxed text-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--accent))]"
          />
          <span>
            {t('leadForm.consent')}{' '}
            <a href="/privacidade" className="font-semibold text-accent-2 underline underline-offset-2">
              {t('leadForm.consentLink')}
            </a>
            .
          </span>
        </label>

        {status === 'invalid' && (
          <p className="text-sm font-semibold text-red-300">{t('leadForm.obrigatorio')}</p>
        )}
        {status === 'error' && (
          <p className="text-sm font-semibold text-red-300">{t('leadForm.erro')}</p>
        )}

        <button type="submit" disabled={status === 'sending'} className="btn-primary mt-2 justify-center text-base disabled:opacity-60">
          {status === 'sending' ? t('leadForm.enviando') : t('leadForm.botao')}
          <IconArrow width={16} height={16} />
        </button>
      </form>
    </div>
  )
}
