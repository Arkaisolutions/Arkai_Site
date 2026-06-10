/**
 * Meta Pixel (Facebook/Instagram Ads) — inicialização condicional.
 *
 * Só carrega se config.metaPixelId estiver preenchido (vazio = no-op).
 * Mapeia os eventos que já empurramos pro window.dataLayer para os
 * eventos padrão do Meta, sem precisar instrumentar cada página de novo:
 *
 *   virtualPageview → PageView
 *   offer_view      → ViewContent
 *   lead_submitted  → Lead          (configure como conversão no Ads)
 *   lead_thankyou   → CompleteRegistration
 *
 * Como ativar: cole o ID do Pixel em config.metaPixelId, commit + push.
 */
import { config } from '../config'

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...a: unknown[]) => void }

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

const EVENT_MAP: Record<string, string> = {
  virtualPageview: 'PageView',
  offer_view: 'ViewContent',
  lead_submitted: 'Lead',
  lead_thankyou: 'CompleteRegistration',
}

export function initMetaPixel(): void {
  const id = config.metaPixelId?.trim()
  if (!id || typeof window === 'undefined') return

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
  const originalPush = dl.push.bind(dl)
  dl.push = function (...entries: Array<Record<string, unknown>>) {
    entries.forEach((entry) => {
      const evt = entry?.event as string | undefined
      if (!evt) return
      const mapped = EVENT_MAP[evt]
      // PageView inicial já foi disparado acima; evita duplicar no 1º load.
      if (mapped && !(evt === 'virtualPageview' && window.location.pathname === '/')) {
        window.fbq?.('track', mapped)
      }
    })
    return originalPush(...entries)
  }
}
