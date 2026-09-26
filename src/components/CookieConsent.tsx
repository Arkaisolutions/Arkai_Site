import { useEffect, useState } from 'react'
import { initMetaPixel } from '../lib/metaPixel'
import { readAnalyticsConsent, saveAnalyticsConsent, type AnalyticsConsent } from '../lib/consent'
import { captureAttribution } from '../lib/track'

export default function CookieConsent() {
  const [choice, setChoice] = useState<AnalyticsConsent>(readAnalyticsConsent)

  useEffect(() => {
    if (choice !== 'accepted') return
    initMetaPixel()
    captureAttribution()
  }, [choice])

  const choose = (value: Exclude<AnalyticsConsent, null>) => {
    saveAnalyticsConsent(value)
    setChoice(value)
  }

  if (choice !== null) return null

  return (
    <aside className="fixed inset-x-3 bottom-3 z-[110] mx-auto max-w-3xl rounded-2xl border border-line bg-surface p-5 shadow-2xl sm:bottom-6 sm:p-6" aria-labelledby="cookie-consent-title">
      <h2 id="cookie-consent-title" className="text-base font-bold text-ink">Sua privacidade</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Usamos medição opcional para entender o desempenho do site e dos anúncios. Ela só é ativada com sua autorização. Você pode continuar sem aceitar. Consulte a{' '}
        <a href="/privacidade" className="text-accent underline underline-offset-2 hover:text-ink">Política de Privacidade</a>.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={() => choose('accepted')}>Aceitar medição</button>
        <button type="button" className="btn-ghost" onClick={() => choose('rejected')}>Recusar</button>
      </div>
    </aside>
  )
}
