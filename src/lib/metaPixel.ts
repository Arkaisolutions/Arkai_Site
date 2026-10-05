/**
 * Meta Pixel (Facebook/Instagram Ads) — inicialização condicional.
 *
 * Só carrega após consentimento explícito e com metaPixelId preenchido.
 * Mapeia os eventos que já empurramos pro window.dataLayer para os
 * eventos padrão do Meta, sem precisar instrumentar cada página de novo:
 *
 *   offer_view      → ViewContent
 *   lead_submitted  → Lead          (configure como conversão no Ads)
 *
 * Como ativar: cole o ID do Pixel em config.metaPixelId, commit + push.
 */
import { config } from '../config'
import { readAnalyticsConsent } from './consent'

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...a: unknown[]) => void }

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

const EVENT_MAP: Record<string, string> = {
  offer_view: 'ViewContent',
  lead_submitted: 'Lead',
}

let initialized = false

export function initMetaPixel(): void {
  const id = config.metaPixelId?.trim()
  if (!id || typeof window === 'undefined' || initialized || readAnalyticsConsent() !== 'accepted') return
  initialized = true

  // --- Base code oficial do Meta ---
  /* eslint-disable */
  ;(function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return
    const n: any = (f.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args)
    })
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    const t = b.createElement(e) as HTMLScriptElement
    t.async = true
    t.src = v
    const s = b.getElementsByTagName(e)[0]
    s.parentNode?.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  /* eslint-enable */

  window.fbq?.('init', id)
  window.fbq?.('track', 'PageView')

  // --- Espelha eventos do dataLayer para o Pixel ---
  window.dataLayer = window.dataLayer ?? []
  const dl = window.dataLayer
  let viewContentSent = false
  const sendMappedEvent = (event: string) => {
    if (readAnalyticsConsent() !== 'accepted') return
    const mapped = EVENT_MAP[event]
    if (!mapped || (mapped === 'ViewContent' && viewContentSent)) return
    if (mapped === 'ViewContent') viewContentSent = true
    window.fbq?.('track', mapped)
  }
  // O aceite tardio registra a visualização atual da oferta, sem reenviar
  // leads ou outros eventos anteriores ao consentimento.
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const offerPaths = ['/', '/vagas', '/oferta', '/offer']
  if (offerPaths.includes(path) && dl.some((entry) => entry.event === 'offer_view')) {
    sendMappedEvent('offer_view')
  }
  const originalPush = dl.push.bind(dl)
  dl.push = function (...entries: Array<Record<string, unknown>>) {
    entries.forEach((entry) => {
      const evt = entry?.event as string | undefined
      if (!evt) return
      sendMappedEvent(evt)
    })
    return originalPush(...entries)
  }
}

