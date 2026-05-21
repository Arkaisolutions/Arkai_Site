import { useTranslation } from 'react-i18next'
import { config } from '../config'
import { IconArrow, IconBolt } from './icons'
import Reveal from './Reveal'

export default function Hero() {
  const { t } = useTranslation()

  const stats = [
    { v: t('hero.stat1Value'), l: t('hero.stat1Label') },
    { v: t('hero.stat2Value'), l: t('hero.stat2Label') },
    { v: t('hero.stat3Value'), l: t('hero.stat3Label') },
  ]

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24">
      <div className="glow left-[-10%] top-[-5%] h-[420px] w-[420px] bg-accent" />
      <div className="glow right-[-8%] top-[20%] h-[380px] w-[380px] bg-accent-2" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--ink)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ink)) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />

      <div className="container-content relative z-10 text-center">
        <Reveal>
          <span className="eyebrow">
            <IconBolt width={13} height={13} className="text-accent" />
            {t('hero.badge')}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t('hero.title1')} <br className="hidden sm:block" />
            <span className="gradient-text">{t('hero.title2')}</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {t('hero.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={config.bookingUrl} target="_blank" rel="noreferrer" className="btn-primary">
              {t('hero.ctaPrimary')}
              <IconArrow width={16} height={16} />
            </a>
            <a href="#services" className="btn-ghost">
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.l} className="rounded-2xl border border-line bg-surface/60 px-6 py-7">
                <div className="gradient-text text-3xl font-black sm:text-4xl">{s.v}</div>
                <div className="mt-1.5 text-sm text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
