import { useTranslation } from 'react-i18next'
import { agentIcons, IconArrow } from './icons'
import Reveal from './Reveal'

interface AgentItem {
  n: string
  icon: string
  name: string
  role: string
}

/**
 * "Your AI Team" section. 10 agent cards + CLT/minimum-wage anchor.
 * Placed right before Pricing so the anchor primes the price reading.
 */
export default function Agents() {
  const { t } = useTranslation()
  const items = t('agents.items', { returnObjects: true }) as AgentItem[]

  return (
    <section id="agents" className="relative py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t('agents.eyebrow')}</span>
          <h2 className="section-title mt-5">
            {t('agents.title1')}{' '}
            <span className="gradient-text">{t('agents.title2')}</span>
          </h2>
          <p className="mt-4 text-muted">{t('agents.subtitle')}</p>
        </Reveal>

        {/* Grid 10 agentes — 2 col mobile, 5 col desktop */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {items.map((item, i) => {
            const Icon = agentIcons[item.icon] ?? agentIcons.agent
            return (
              <Reveal key={item.n} delay={i * 40}>
                <article className="group relative h-full rounded-2xl border border-line bg-surface p-4 transition-all duration-300 hover:border-accent/50 hover:bg-surface-2 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-muted">{item.n}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface-2 text-accent transition-colors group-hover:border-accent/60">
                      <Icon width={18} height={18} />
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold leading-tight">{item.name}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-muted">{item.role}</p>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* CLT anchor block */}
        <Reveal delay={500}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-line bg-surface px-7 py-8 sm:px-10 sm:py-10">
            <div className="glow left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-accent opacity-30" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted">
                  {t('agents.anchorTitle')}
                </p>
                <p className="mt-3 text-base leading-relaxed text-ink/90 sm:text-lg">
                  {t('agents.anchorBody')}
                </p>
                <p className="mt-4 text-sm font-semibold text-accent-2">
                  {t('agents.anchorFooter')}
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <a href="/diagnostico" className="btn-primary text-base">
                  {t('agents.ctaButton')}
                  <IconArrow width={17} height={17} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
