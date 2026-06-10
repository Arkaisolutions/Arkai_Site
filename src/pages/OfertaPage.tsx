import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AuroraBg from '../components/AuroraBg'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Reveal from '../components/Reveal'
import { IconArrow, IconBolt, IconCheck } from '../components/icons'
import { config } from '../config'
import { captureAttribution, trackEvent, trackPageView } from '../lib/track'

interface Stat { v: string; l: string }
interface QA   { q: string; a: string }

/**
 * /oferta — Long-form sales landing for paid traffic.
 * Hormozi-style: scarcity → pain → solution → proof → offer →
 * implementation timeline → FAQ → final CTA.
 * All CTAs route to /diagnostico (UTM attribution preserved via sessionStorage).
 */
export default function OfertaPage() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('oferta.metaTitle')
    captureAttribution()
    trackPageView(window.location.pathname, t('oferta.metaTitle'))
    trackEvent('offer_view', {
      path: window.location.pathname,
      slots_remaining: config.earlyAccess.remaining,
    })
  }, [t])

  const { remaining, total } = config.earlyAccess
  const taken = Math.max(0, total - remaining)

  const stats    = t('oferta.proof.stats',    { returnObjects: true }) as Stat[]
  const includes = t('oferta.offer.includes', { returnObjects: true }) as string[]
  const faqs     = t('oferta.faq.items',      { returnObjects: true }) as QA[]

  return (
    <>
      {/* Scarcity bar — sticky top, dynamic counter */}
      <div className="fixed inset-x-0 top-0 z-[60] bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-center text-[12.5px] font-bold tracking-wide text-white shadow-md">
        {t('oferta.scarcity', { remaining, total })}
      </div>

      <div className="h-8" />

      <Navbar />

      <main className="relative">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36">
          <AuroraBg />
          <div className="container-content relative z-10 text-center">
            <Reveal>
              <span className="eyebrow">
                <IconBolt width={13} height={13} className="text-accent" />
                {t('oferta.hero.badge')}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {t('oferta.hero.title1')}{' '}
                <span className="gradient-text">{t('oferta.hero.title2')}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {t('oferta.hero.subtitle')}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="/diagnostico" className="btn-primary text-base">
                  {t('oferta.hero.ctaPrimary')}
                  <IconArrow width={16} height={16} />
                </a>
                <a href="#offer" className="btn-ghost">
                  {t('oferta.hero.ctaSecondary')}
                </a>
              </div>
            </Reveal>

            {/* Spots remaining visual — dots + counter */}
            <Reveal delay={320}>
              <SpotsRemaining
                remaining={remaining}
                total={total}
                taken={taken}
                spotsTitle={t('oferta.spotsTitle')}
                takenLabel={t('oferta.spotsTaken')}
                leftLabel={t('oferta.spotsLeft')}
              />
            </Reveal>
          </div>
        </section>

        {/* ============ PROBLEM ============ */}
        <section className="relative py-20">
          <div className="container-content max-w-3xl text-center">
            <Reveal>
              <span className="eyebrow">{t('oferta.problem.eyebrow')}</span>
              <h2 className="section-title mt-5">{t('oferta.problem.title')}</h2>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                {t('oferta.problem.body')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ SOLUTION ============ */}
        <section className="relative py-20">
          <div className="container-content max-w-3xl text-center">
            <Reveal>
              <span className="eyebrow">{t('oferta.solution.eyebrow')}</span>
              <h2 className="section-title mt-5">
                {t('oferta.solution.title1')}{' '}
                <span className="gradient-text">{t('oferta.solution.title2')}</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                {t('oferta.solution.subtitle')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ PROOF STRIP ============ */}
        <section className="relative border-y border-line bg-surface/40 py-16">
          <div className="container-content">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">{t('oferta.proof.eyebrow')}</span>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">
                {t('oferta.proof.title')}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-line bg-surface px-4 py-6 text-center"
                  >
                    <div className="gradient-text text-3xl font-black sm:text-4xl">{s.v}</div>
                    <div className="mt-1.5 text-xs text-muted sm:text-sm">{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ THE OFFER ============ */}
        <section id="offer" className="relative py-24">
          <div className="container-content max-w-3xl">
            <Reveal className="text-center">
              <span className="eyebrow">{t('oferta.offer.eyebrow')}</span>
              <h2 className="section-title mt-5 gradient-text">{t('oferta.offer.title')}</h2>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                {t('oferta.offer.subtitle')}
              </p>
            </Reveal>

            {/* Side-by-side comparison */}
            <Reveal delay={150}>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Sem Arkai</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/85">
                    {t('oferta.offer.compare')}
                  </p>
                </div>
                <div className="rounded-2xl border border-accent/60 bg-surface-2 p-6 shadow-[0_24px_60px_-30px_rgb(var(--accent))]">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent-2">Com Arkai</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink">
                    {t('oferta.offer.you')}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* What's included */}
            <Reveal delay={250}>
              <div className="mt-10 rounded-2xl border border-line bg-surface p-7 sm:p-9">
                <h3 className="text-base font-bold sm:text-lg">{t('oferta.offer.includesTitle')}</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <IconCheck width={17} height={17} className="mt-0.5 shrink-0 text-accent-2" />
                      <span className="text-ink/90">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Setup line */}
                <div className="mt-7 flex flex-col items-start justify-between gap-3 rounded-xl border border-accent/40 bg-accent/10 px-5 py-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted line-through">
                      {t('oferta.offer.setupOriginal')}
                    </p>
                    <p className="mt-1 text-base font-bold text-accent-2">
                      ✓ {t('oferta.offer.setupNow')}
                    </p>
                  </div>
                  <a href="/diagnostico" className="btn-primary shrink-0">
                    {t('oferta.offer.cta')}
                    <IconArrow width={15} height={15} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ IMPLEMENTATION TIMELINE (replaces guarantee) ============ */}
        <section className="relative py-20">
          <div className="container-content max-w-4xl">
            <Reveal className="text-center">
              <span className="eyebrow">{t('oferta.timeline.eyebrow')}</span>
              <h2 className="section-title mt-5">{t('oferta.timeline.title')}</h2>
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((n, i) => (
                <Reveal key={n} delay={i * 90}>
                  <div className="h-full rounded-2xl border border-line bg-surface p-6">
                    <span className="text-3xl font-black text-line">0{n}</span>
                    <h3 className="mt-3 text-base font-bold leading-snug">
                      {t(`oferta.timeline.step${n}Title`)}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {t(`oferta.timeline.step${n}Body`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="relative py-16">
          <div className="container-content max-w-3xl">
            <Reveal>
              <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
                {t('oferta.faq.title')}
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-col gap-3">
              {faqs.map((item, i) => (
                <Reveal key={item.q} delay={i * 60}>
                  <div className="rounded-xl border border-line bg-surface p-6">
                    <h3 className="text-sm font-bold sm:text-base">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="relative py-24">
          <div className="container-content">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-7 py-16 text-center sm:px-16">
                <div className="glow left-1/4 top-0 h-[300px] w-[300px] bg-accent" />
                <div className="glow right-1/4 bottom-0 h-[300px] w-[300px] bg-accent-2" />
                <div className="relative z-10">
                  <h2 className="section-title mx-auto max-w-3xl">
                    {t('oferta.finalCta.title1')}{' '}
                    <span className="gradient-text">{t('oferta.finalCta.title2')}</span>
                  </h2>
                  <p className="mx-auto mt-5 max-w-xl text-muted">
                    {t('oferta.finalCta.subtitle')}
                  </p>
                  <div className="mt-9">
                    <a href="/diagnostico" className="btn-primary text-base">
                      {t('oferta.finalCta.button')}
                      <IconArrow width={17} height={17} />
                    </a>
                  </div>
                  <p className="mt-4 text-xs text-muted">{t('oferta.finalCta.note')}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

/* ---------------- Spots remaining (dots indicator) ---------------- */

function SpotsRemaining({
  remaining, total, taken,
  spotsTitle, takenLabel, leftLabel,
}: {
  remaining: number; total: number; taken: number
  spotsTitle: string; takenLabel: string; leftLabel: string
}) {
  return (
    <div className="mx-auto mt-12 max-w-md">
      <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-muted">
        {spotsTitle}
      </p>
      <div className="mt-3 flex items-center justify-center gap-1.5 sm:gap-2">
        {Array.from({ length: total }).map((_, i) => {
          const isTaken = i < taken
          return (
            <span
              key={i}
              className={
                isTaken
                  ? 'h-3 w-3 rounded-full border border-line bg-line sm:h-4 sm:w-4'
                  : 'h-3 w-3 rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_12px_-2px_rgb(var(--accent))] sm:h-4 sm:w-4'
              }
            />
          )
        })}
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        <span className="text-line">{taken} {takenLabel}</span>
        <span className="mx-2">·</span>
        <span className="font-semibold text-accent-2">{remaining} {leftLabel}</span>
      </p>
    </div>
  )
}
