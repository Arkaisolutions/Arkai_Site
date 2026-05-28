/**
 * Tracking helpers — captura UTM/click IDs e dispara eventos no dataLayer.
 *
 * Compatível com Google Tag Manager, Meta Pixel (via GTM), GA4 (via GTM ou direto).
 * Como adicionar os pixels: ver docs/tracking.md.
 *
 * Importante: este módulo NÃO altera nenhum componente da home/modal.
 * Só é usado pelas páginas /diagnostico e /diagnostico/obrigado.
 */

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
  if (typeof window === 'undefined') return {}
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
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : {}
  } catch {
    return {}
  }
}

export function trackEvent(event: string, data: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...data })
}

export function trackPageView(path: string, title?: string): void {
  trackEvent('virtualPageview', {
    page_path: path,
    page_title: title ?? (typeof document !== 'undefined' ? document.title : ''),
  })
}

export function trackLeadSubmit(payload: Record<string, unknown>): void {
  trackEvent('lead_submitted', payload)
}
