import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLeadModal } from '../lead/LeadModalContext'
import { IconClose, IconGlobe, IconMenu } from './icons'

const links = [
  { id: 'services', key: 'nav.services' },
  { id: 'process', key: 'nav.process' },
  { id: 'work', key: 'nav.work' },
  { id: 'pricing', key: 'nav.pricing' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { open: openLead } = useLeadModal()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith('pt') ? 'en' : 'pt')
  const lang = i18n.language.startsWith('pt') ? 'PT' : 'EN'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-content flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-extrabold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-base font-black text-white">
            A
          </span>
          <span className="text-lg">
            Arkai<span className="text-muted"> Solutions</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {t(l.key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-ink"
            aria-label="Toggle language"
          >
            <IconGlobe width={15} height={15} />
            {lang}
          </button>
          <button onClick={openLead} className="btn-primary hidden sm:inline-flex">
            {t('nav.contact')}
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <IconClose width={18} height={18} /> : <IconMenu width={18} height={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <div className="container-content flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted hover:bg-surface hover:text-ink"
              >
                {t(l.key)}
              </a>
            ))}
            <button
              className="btn-primary mt-2"
              onClick={() => {
                setOpen(false)
                openLead()
              }}
            >
              {t('nav.contact')}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
