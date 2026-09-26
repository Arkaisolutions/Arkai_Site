import { useEffect } from 'react'
import { IconClose } from '../components/icons'
import ContactForm from './ContactForm'
import { useLeadModal } from './LeadModalContext'

export default function LeadModal() {
  const { isOpen, close } = useLeadModal()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={close} aria-hidden="true" />
      <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-line bg-surface p-7 shadow-2xl sm:p-10">
        <button
          type="button"
          onClick={close}
          aria-label="Fechar formulário"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-ink"
        >
          <IconClose width={16} height={16} />
        </button>
        <h2 id="lead-modal-title" className="pr-10 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Vamos ver onde sua empresa está perdendo venda
        </h2>
        <p className="mb-7 mt-3 text-sm leading-relaxed text-muted">
          Preenche que a gente entra em contato para entender sua operação. Sem compromisso de contratação.
        </p>
        <ContactForm />
      </div>
    </div>
  )
}
