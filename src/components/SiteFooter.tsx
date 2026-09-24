import { useTranslation } from 'react-i18next'
import { config, whatsappLink } from '../config'

/**
 * Rodapé institucional do briefing, igual nas duas páginas.
 * Razão social e endereço ficam com campo visível até serem preenchidos.
 */
export default function SiteFooter() {
  const { t } = useTranslation()

  const links = [
    { href: '/#fazemos', label: t('siteFooter.links.fazemos') },
    { href: '/#clientes', label: t('siteFooter.links.clientes') },
    { href: '/#perguntas', label: t('siteFooter.links.perguntas') },
    { href: '/#contato', label: t('siteFooter.links.contato') },
  ]

  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="container-content py-12">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div>
            <a href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-base font-black text-white">
                A
              </span>
              <span className="text-lg">
                Arkai<span className="text-muted"> Solutions</span>
              </span>
            </a>
            <div className="mt-4 flex flex-col gap-1 text-xs text-muted">
              <span>{t('siteFooter.razao')}</span>
              <span>{t('siteFooter.cnpj')}</span>
              <span>{t('siteFooter.endereco')}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <a href={`mailto:${config.email}`} className="text-muted transition-colors hover:text-ink">
              {config.email}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-ink">
              WhatsApp
            </a>
            <a href="/privacidade" className="text-muted transition-colors hover:text-ink">
              {t('siteFooter.privacidade')}
            </a>
            <a href="/termos" className="text-muted transition-colors hover:text-ink">
              {t('siteFooter.termos')}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center text-xs text-muted sm:text-left">
          {t('siteFooter.copy')}
        </div>
      </div>
    </footer>
  )
}
