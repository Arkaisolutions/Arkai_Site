import { useTranslation } from 'react-i18next'
import { config } from '../config'
import { IconArrow, IconCheck } from './icons'
import Reveal from './Reveal'

interface Plan {
  name: string
  price: string
  desc: string
  features: string[]
  cta: string
}

export default function Pricing() {
  const { t } = useTranslation()
  const plans = t('pricing.plans', { returnObjects: true }) as Plan[]

  return (
    <section id="pricing" className="relative py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t('pricing.eyebrow')}</span>
          <h2 className="section-title mt-5">{t('pricing.title')}</h2>
          <p className="mt-4 text-muted">{t('pricing.subtitle')}</p>
        </Reveal>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const featured = i === 1
            const isQuote = !plan.price.startsWith('$')
            return (
              <Reveal key={plan.name} delay={i * 90}>
                <article
                  className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 ${
                    featured
                      ? 'border-accent/60 bg-surface-2 shadow-[0_24px_60px_-30px_var(--accent)] lg:-mt-4 lg:pb-11'
                      : 'border-line bg-surface hover:border-accent/40'
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {t('pricing.popular')}
                    </span>
                  )}
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-end gap-1.5">
                    {!isQuote && (
                      <span className="mb-1.5 text-xs font-medium text-muted">
                        {t('pricing.from')}
                      </span>
                    )}
                    <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                    {!isQuote && (
                      <span className="mb-1.5 text-sm text-muted">{t('pricing.perMonth')}</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted">{plan.desc}</p>

                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <IconCheck width={17} height={17} className="mt-0.5 shrink-0 text-accent-2" />
                        <span className="text-ink/90">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={config.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-7 ${featured ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    {plan.cta}
                    <IconArrow width={15} height={15} />
                  </a>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
