import { useTranslation } from 'react-i18next'
import { serviceIcons } from './icons'
import Reveal from './Reveal'

interface ServiceItem {
  icon: string
  title: string
  desc: string
}

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true }) as ServiceItem[]

  return (
    <section id="services" className="relative py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t('services.eyebrow')}</span>
          <h2 className="section-title mt-5">{t('services.title')}</h2>
          <p className="mt-4 text-muted">{t('services.subtitle')}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = serviceIcons[item.icon] ?? serviceIcons.agent
            return (
              <Reveal key={item.title} delay={i * 70}>
                <article className="card group h-full">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface-2 text-accent transition-colors group-hover:border-accent/60">
                    <Icon width={22} height={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.desc}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
