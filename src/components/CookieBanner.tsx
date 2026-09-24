import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { config } from '../config'
import { initMetaPixel } from '../lib/metaPixel'

const KEY = 'arkai_cookie_consent'

export type CookieConsent = 'accepted' | 'rejected' | null

export function getCookieConsent(): CookieConsent {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'accepted' || v === 'rejected' ? v : null
  } catch {
    return null
  }
}

function storeConsent(v: 'accepted' | 'rejected') {
  try {
    localStorage.setItem(KEY, v)
  } catch {
    /* noop */
  }
}

/**
 * Banner de cookies do briefing: a medição (Meta Pixel) só dispara
 * depois do aceite. Sem pixel configurado não há medição, então o
 * banner nem aparece.
 */
export default function CookieBanner() {
  const { t } = useTranslation()
  const [choice, setChoice] = useState<CookieConsent>(getCookieConsent())

  if (!config.metaPixelId || choice !== null) return null

  const decide = (v: 'accepted' | 'rejected') => {
    storeConsent(v)
    setChoice(v)
    if (v === 'accepted') initMetaPixel()
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-surface/95 backdrop-blur-xl">
      <div className="container-content flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink/85">{t('cookies.texto')}</p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide('rejected')}
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
          >
            {t('cookies.recusar')}
          </button>
          <button onClick={() => decide('accepted')} className="btn-primary px-5 py-2 text-sm">
            {t('cookies.aceitar')}
          </button>
        </div>
      </div>
    </div>
  )
}
