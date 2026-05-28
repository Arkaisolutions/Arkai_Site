/**
 * Tracking helpers — captura UTM/click IDs e dispara eventos no dataLayer.
 *
 * Compatível com Google Tag Manager, Meta Pixel (via GTM), GA4 (via GTM ou direto).
 * Como adicionar os pixels: ver docs/tracking.md.
 */

const STORAGE_KEY = 'arkai_attribution'

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',   // Google Ads click id
  'fbclid',  // Meta Ads click id
  'msclkid', // Microsoft Ads click id
  'ttclid',  // TikTok Ads click id
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

/** Reads attribution params from URL and persists to sessionStorage (sticky for the session). */
export function captureAttribution(): Attribution {
  if (typeof window === 'undefined') return {}

  const stored = readAttribution()
  const url = new URL(window.location.href)
  const fromUrl: Attribution = {}

  UTM_KEYS.forEach((k) => {
    const v = url.searchParams.get(k)
    if (v) fromUrl[k] = v
  })

  // Merge: keep earliest landing page / referrer; new UTM params overwrite if present.
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
    /* sessionStorage blocked — silently ignore */
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

/** Push a generic event to the dataLayer (GTM / GA4 listen here). */
export function trackEvent(event: string, data: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...data })
}

/** Fire a virtual pageview on client-side navigation (router doesn't trigger native pageview). */
export function trackPageView(path: string, title?: string): void {
  trackEvent('virtualPageview', {
    page_path: path,
    page_title: title ?? (typeof document !== 'undefined' ? document.title : ''),
  })
}

/** Fired when the lead form is submitted successfully. Configure as conversion in your ads manager. */
export function trackLeadSubmit(payload: Record<string, unknown>): void {
  trackEvent('lead_submitted', payload)
}
