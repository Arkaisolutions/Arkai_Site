import { useTranslation } from 'react-i18next'
import { config } from '../config'

const navLinks = [
  { id: 'services', key: 'nav.services' },
  { id: 'process', key: 'nav.process' },
  { id: 'work', key: 'nav.work' },
  { id: 'pricing', key: 'nav.pricing' },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="container-content py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5 font-extrabold tracking-tight">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-base font-black text-white">
                A
              </span>
              <span className="text-lg">Arkai Solutions</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted">
              {t('footer.navTitle')}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {t(l.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted">
              {t('footer.contactTitle')}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {config.email}
                </a>
              </li>
              <li>
                <a
                  href={config.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={config.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-7 text-xs text-muted sm:flex-row">
          <span>
            © {year} Arkai Solutions. {t('footer.rights')}
          </span>
          <span>{t('footer.built')}</span>
        </div>
      </div>
    </footer>
  )
}
