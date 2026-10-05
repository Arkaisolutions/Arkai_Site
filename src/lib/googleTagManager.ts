import { config } from '../config'
import { readAnalyticsConsent } from './consent'
import { trackEvent } from './track'

let initialized = false
let listening = false

export function initGoogleTagManager(): void {
  if (typeof window === 'undefined' || initialized || readAnalyticsConsent() !== 'accepted') return
  const id = config.googleTagManagerId.trim()
  if (!/^GTM-[A-Z0-9]+$/.test(id)) return
  initialized = true
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`
  document.head.appendChild(script)
}

// Observa os links existentes, inclusive os da página de agradecimento.
// Não envia número, mensagem pré-preenchida ou conteúdo do formulário.
export function initWhatsAppTracking(): void {
  if (typeof document === 'undefined' || listening) return
  listening = true
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return
    const link = event.target.closest('a[href]')
    if (!(link instanceof HTMLAnchorElement)) return
    const url = new URL(link.href, window.location.href)
    if (!['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)) return
    const path = window.location.pathname
    trackEvent('whatsapp_click', {
      page_path: path,
      contact_channel: 'whatsapp',
      after_form: ['/diagnostico/obrigado', '/audit/thank-you'].includes(path),
    })
  })
}
