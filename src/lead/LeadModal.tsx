import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IconClose } from '../components/icons'
import LeadForm from './LeadForm'
import { useLeadModal } from './LeadModalContext'

export default function LeadModal() {
  const { t } = useTranslation()
  const { isOpen, close } = useLeadModal()

  // ESC closes
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={close} />

      {/* Card */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl animate-fade-up">
        <button
          onClick={close}
          aria-label={t('modal.close')}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-ink"
        >
          <IconClose width={16} height={16} />
        </button>

        <div className="p-7 sm:p-10">
          <LeadForm variant="modal" context={{ origin: 'modal' }} />
        </div>
      </div>
    </div>
  )
}
