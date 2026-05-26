import { useTranslation } from 'react-i18next'
import { useLeadModal } from '../lead/LeadModalContext'
import AgentTerminal from './AgentTerminal'
import AuroraBg from './AuroraBg'
import { IconArrow, IconBolt } from './icons'
import LogosMarquee from './LogosMarquee'
import Reveal from './Reveal'

export default function Hero() {
  const { t } = useTranslation()
  const { open } = useLeadModal()

  const stats = [
    { v: t('hero.stat1Value'), l: t('hero.stat1Label') },
    { v: t('hero.stat2Value'), l: t('hero.stat2Label') },
    { v: t('hero.stat3Value'), l: t('hero.stat3Label') },
  ]

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-36">
      <AuroraBg />

      <div className="container-content relative z-10">
        {/* Top: split text + terminal */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="eyebrow">
                <IconBolt width={13} height={13} className="text-accent" />
                {t('hero.badge')}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[40px] font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-[64px]">
                {t('hero.title1')}
                <br />
                <span className="gradient-text">{t('hero.title2')}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
                {t('hero.subtitle')}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <button onClick={open} className="btn-primary">
                  {t('hero.ctaPrimary')}
                  <IconArrow width={16} height={16} />
                </button>
                <a href="#work" className="btn-ghost">
                  {t('hero.ctaSecondary')}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: live agent terminal */}
          <Reveal delay={320}>
            <AgentTerminal />
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal delay={360}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-line bg-surface/60 px-6 py-5 text-center backdrop-blur"
              >
                <div className="gradient-text text-3xl font-black sm:text-4xl">{s.v}</div>
                <div className="mt-1.5 text-sm text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Client logos marquee */}
        <Reveal delay={440}>
          <div className="mt-20">
            <LogosMarquee />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
