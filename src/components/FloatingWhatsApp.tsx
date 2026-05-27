import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { config, whatsappLink } from '../config'
import { IconClose, IconWhatsApp } from './icons'

/**
 * Floating WhatsApp button — bottom right, fixed.
 * Opens WhatsApp with a prefilled message that signals the lead came from the site.
 * The conversation is then handled by the existing AI agent on the WhatsApp number
 * (n8n + Evolution API), so it works as a "site chat" without building a custom widget.
 */
export default function FloatingWhatsApp() {
  const { t } = useTranslation()
  const [showBubble, setShowBubble] = useState(false)
  const [bubbleAutoShown, setBubbleAutoShown] = useState(false)

  // Auto-open the bubble once, after a few seconds, to grab attention.
  useEffect(() => {
    if (bubbleAutoShown) return
    const timer = window.setTimeout(() => {
      setShowBubble(true)
      setBubbleAutoShown(true)
      // auto-hide after 7s so it doesn't block the page
      window.setTimeout(() => setShowBubble(false), 7000)
    }, 5000)
    return () => clearTimeout(timer)
  }, [bubbleAutoShown])

  const href = whatsappLink(t('wa.prefill'))

  // Don't render if WhatsApp number not configured (avoids broken link in dev).
  const isConfigured = config.whatsapp && !config.whatsapp.startsWith('5500000')

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {/* Speech bubble */}
      {showBubble && (
        <div className="animate-fade-up relative w-[260px] rounded-2xl border border-line bg-surface px-4 py-3 shadow-2xl">
          <button
            onClick={() => setShowBubble(false)}
            className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-muted hover:text-ink"
            aria-label="Close"
          >
            <IconClose width={12} height={12} />
          </button>
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
              <IconWhatsApp width={14} height={14} />
            </span>
            <div>
              <p className="pr-4 text-sm font-semibold leading-tight text-ink">
                {t('wa.tooltipTitle')}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                </span>
                {t('wa.tooltipSub')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <a
        href={isConfigured ? href : undefined}
        target="_blank"
        rel="noreferrer"
        aria-label={t('wa.ariaLabel')}
        onMouseEnter={() => setShowBubble(true)}
        onMouseLeave={() => setShowBubble(false)}
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-8px_rgba(37,211,102,0.55)] transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16"
      >
        {/* Pulse ring */}
        <span className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
        <IconWhatsApp className="relative h-7 w-7 sm:h-8 sm:w-8" />
      </a>
    </div>
  )
}
