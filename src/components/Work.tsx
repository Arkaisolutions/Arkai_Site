import { useTranslation } from 'react-i18next'
import { IconArrow } from './icons'
import Reveal from './Reveal'

interface WorkItem {
  tag: string
  title: string
  desc: string
}

export default function Work() {
  const { t } = useTranslation()
  const items = t('work.items', { returnObjects: true }) as WorkItem[]

  return (
    <section id="work" className="relative py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t('work.eyebrow')}</span>
          <h2 className="section-title mt-5">{t('work.title')}</h2>
          <p className="mt-4 text-muted">{t('work.subtitle')}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article className="card group relative h-full overflow-hidden">
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-2">
                  {item.tag}
                </span>
                <h3 className="relative mt-4 text-xl font-bold leading-snug">{item.title}</h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-muted">{item.desc}</p>
                <div className="relative mt-5 flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors group-hover:text-accent-2">
                  <span className="h-px w-7 bg-current" />
                  <IconArrow width={15} height={15} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
