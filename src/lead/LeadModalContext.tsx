import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface LeadModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

const Ctx = createContext<LeadModalState | null>(null)

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }, [])

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLeadModal(): LeadModalState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLeadModal must be used inside <LeadModalProvider>')
  return ctx
}
