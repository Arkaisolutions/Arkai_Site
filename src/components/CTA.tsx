import { useTranslation } from 'react-i18next'
import { config } from '../config'
import { IconArrow } from './icons'
import Reveal from './Reveal'

export default function CTA() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="relative py-24">
      <div className="container-content">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-8 py-16 text-center sm:px-16">
            <div className="glow left-1/4 top-0 h-[300px] w-[300px] bg-accent" />
            <div className="glow right-1/4 bottom-0 h-[300px] w-[300px] bg-accent-2" />
            <div className="relative z-10">
              <h2 className="section-title mx-auto max-w-2xl">{t('cta.title')}</h2>
              <p className="mx-auto mt-5 max-w-xl text-muted">{t('cta.subtitle')}</p>
              <div className="mt-9">
                <a
                  href={config.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-base"
                >
                  {t('cta.button')}
                  <IconArrow width={17} height={17} />
                </a>
              </div>
              <p className="mt-4 text-xs text-muted">{t('cta.note')}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
