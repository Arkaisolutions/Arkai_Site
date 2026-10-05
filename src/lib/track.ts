/**
 * Tracking helpers — captura UTM/click IDs somente após aceite de medição
 * e registra eventos locais no dataLayer. O Pixel é instalado separadamente.
 */

import { readAnalyticsConsent } from './consent'

const STORAGE_KEY = 'arkai_attribution'

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'msclkid',
  'ttclid',
] as const

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  firstLandingPage?: string
  firstReferrer?: string
  firstSeenAt?: string
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function captureAttribution(): Attribution {
  if (typeof window === 'undefined' || readAnalyticsConsent() !== 'accepted') return {}
  const stored = readAttribution()
  const url = new URL(window.location.href)
  const fromUrl: Attribution = {}
  UTM_KEYS.forEach((k) => {
    const v = url.searchParams.get(k)
    if (v) fromUrl[k] = v
  })
  const merged: Attribution = {
    ...stored,
    ...fromUrl,
    firstLandingPage: stored.firstLandingPage ?? window.location.href,
    firstReferrer: stored.firstReferrer ?? document.referrer ?? '',
    firstSeenAt: stored.firstSeenAt ?? new Date().toISOString(),
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch {
    /* noop */
  }
  return merged
}

export function readAttribution(): Attribution {
  if (typeof window === 'undefined' || readAnalyticsConsent() !== 'accepted') return {}
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : {}
  } catch {
    return {}
  }
}

export function trackEvent(event: string, data: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || readAnalyticsConsent() !== 'accepted') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...data })
}

export function trackPageView(path: string, title?: string): void {
  trackEvent('virtualPageview', {
    page_path: path,
    page_title: title ?? (typeof document !== 'undefined' ? document.title : ''),
  })
}

export function trackLeadSubmit(payload: Record<string, unknown>): Promise<void> {
  if (typeof window === 'undefined' || readAnalyticsConsent() !== 'accepted') return Promise.resolve()
  return new Promise((resolve) => {
    // GTM chama o callback ao terminar as tags. O limite também funciona
    // com bloqueadores ou contêiner sem tags e nunca impede o fluxo do lead.
    const timer = window.setTimeout(resolve, 2000)
    trackEvent('lead_submitted', {
      ...payload,
      eventCallback: () => { window.clearTimeout(timer); resolve() },
      eventTimeout: 2000,
    })
  })
}
