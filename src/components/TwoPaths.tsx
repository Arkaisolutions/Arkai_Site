import { useTranslation } from 'react-i18next'
import { IconArrow } from './icons'
import Reveal from './Reveal'
import './TwoPaths.css'

export default function TwoPaths() {
  const { t } = useTranslation()

  return (
    <section className="two-paths relative border-y border-line bg-surface/30 py-16 sm:py-20" aria-labelledby="two-paths-title">
      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{t('audiences.eyebrow')}</span>
          <h2 id="two-paths-title" className="section-title mt-5">{t('audiences.title')}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {t('audiences.subtitle')}
          </p>
        </Reveal>

        <div className="two-paths__grid mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
          <Reveal>
            <div className="two-paths__card h-full rounded-2xl border border-line bg-surface p-7 sm:p-8">
              <span className="two-paths__number" aria-hidden="true">01</span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-2">{t('audiences.existing.label')}</span>
              <h3 className="mt-3 text-xl font-bold">{t('audiences.existing.title')}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{t('audiences.existing.body')}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="two-paths__card two-paths__card--starting h-full rounded-2xl border border-line bg-surface p-7 sm:p-8">
              <span className="two-paths__number" aria-hidden="true">02</span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-2">{t('audiences.starting.label')}</span>
              <h3 className="mt-3 text-xl font-bold">{t('audiences.starting.title')}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{t('audiences.starting.body')}</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <div className="mt-8 flex flex-col items-center gap-5 text-center">
            <p className="max-w-3xl text-sm leading-relaxed text-muted">{t('audiences.closing')}</p>
            <a href="/diagnostico" className="btn-primary">
              {t('audiences.cta')}
              <IconArrow width={16} height={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
