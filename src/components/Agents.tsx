import { useTranslation } from 'react-i18next'
import { agentIcons, IconArrow } from './icons'
import Reveal from './Reveal'

interface AgentItem {
  n: string
  icon: string
  name: string
  role: string
}

interface AgentBlock {
  label: string
  sub: string
  items: AgentItem[]
}

/**
 * "Your AI Team" section.
 * Two blocks: WhatsApp front-line (6) + Back-office ops (8) = 14 agents real.
 * Closes with CLT/minimum-wage anchor + guarantee badge + CTA.
 */
export default function Agents() {
  const { t } = useTranslation()
  const wa = t('agents.wa', { returnObjects: true }) as AgentBlock
  const ops = t('agents.ops', { returnObjects: true }) as AgentBlock

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

          {/* Guarantee badge */}
          <Reveal delay={120}>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-[12.5px] font-semibold text-green-400">
              {t('agents.guaranteeBadge')}
            </div>
          </Reveal>
        </Reveal>

        {/* Block 1 — WhatsApp front-line */}
        <AgentBlockGrid block={wa} delayBase={200} />

        {/* Block 2 — Back-office ops */}
        <div className="mt-14">
          <AgentBlockGrid block={ops} delayBase={400} columnsClass="md:grid-cols-3 lg:grid-cols-4" />
        </div>

        {/* CLT anchor block */}
        <Reveal delay={500}>
          <div className="relative mt-16 overflow-hidden rounded-2xl border border-line bg-surface px-7 py-8 sm:px-10 sm:py-10">
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

function AgentBlockGrid({
  block,
  delayBase = 0,
  columnsClass = 'md:grid-cols-3 lg:grid-cols-3',
}: {
  block: AgentBlock
  delayBase?: number
  columnsClass?: string
}) {
  return (
    <>
      <Reveal delay={delayBase}>
        <div className="mt-14 mb-6 flex flex-col items-baseline justify-between gap-2 border-b border-line pb-4 sm:flex-row sm:gap-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-ink">{block.label}</h3>
          <p className="text-xs text-muted sm:text-right">{block.sub}</p>
        </div>
      </Reveal>

      <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${columnsClass}`}>
        {block.items.map((item, i) => {
          const Icon = agentIcons[item.icon] ?? agentIcons.agent
          return (
            <Reveal key={item.n} delay={delayBase + 40 + i * 30}>
              <article className="group relative h-full rounded-2xl border border-line bg-surface p-4 transition-all duration-300 hover:border-accent/50 hover:bg-surface-2 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-muted">{item.n}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface-2 text-accent transition-colors group-hover:border-accent/60">
                    <Icon width={18} height={18} />
                  </span>
                </div>
                <h4 className="mt-4 text-sm font-bold leading-tight">{item.name}</h4>
                <p className="mt-1.5 text-[12.5px] leading-snug text-muted">{item.role}</p>
              </article>
            </Reveal>
          )
        })}
      </div>
    </>
  )
}
