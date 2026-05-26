import { useTranslation } from 'react-i18next'
import { useLeadModal } from '../lead/LeadModalContext'
import { IconArrow, IconCheck, industryIcons } from './icons'
import Reveal from './Reveal'

interface IndustryItem {
  icon: string
  tag: string
  title: string
  desc: string
  bullets: string[]
}

export default function Work() {
  const { t } = useTranslation()
  const { open } = useLeadModal()
  const items = t('work.items', { returnObjects: true }) as IndustryItem[]

  return (
    <section id="work" className="relative py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t('work.eyebrow')}</span>
          <h2 className="section-title mt-5">{t('work.title')}</h2>
          <p className="mt-4 text-muted">{t('work.subtitle')}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = industryIcons[item.icon] ?? industryIcons.solar
            return (
              <Reveal key={item.title} delay={i * 70}>
                <article className="card group relative h-full overflow-hidden">
                  <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface-2 text-accent transition-colors group-hover:border-accent/60">
                      <Icon width={22} height={22} />
                    </div>
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-2">
                      {t('work.moreTag')}
                    </span>
                  </div>

                  <p className="relative mt-5 text-xs font-semibold uppercase tracking-wider text-muted">
                    {item.tag}
                  </p>
                  <h3 className="relative mt-1 text-xl font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>

                  <ul className="relative mt-5 flex flex-col gap-2">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-ink/85">
                        <IconCheck
                          width={15}
                          height={15}
                          className="mt-0.5 shrink-0 text-accent-2"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Closer CTA */}
        <Reveal delay={500}>
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-line bg-surface px-7 py-6 sm:flex-row sm:gap-8 sm:px-9">
            <div>
              <h4 className="text-lg font-bold">{t('work.ctaLabel')}</h4>
              <p className="mt-1 text-sm text-muted">{t('work.ctaSub')}</p>
            </div>
            <button onClick={open} className="btn-primary shrink-0">
              {t('work.ctaButton')}
              <IconArrow width={15} height={15} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
