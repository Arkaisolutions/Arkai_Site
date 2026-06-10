import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AuroraBg from '../components/AuroraBg'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Reveal from '../components/Reveal'
import { IconArrow, IconBolt, IconCheck } from '../components/icons'
import { config } from '../config'
import { captureAttribution, trackEvent, trackPageView } from '../lib/track'
import { setSeo } from '../lib/seo'

interface Stat      { v: string; l: string }
interface QA        { q: string; a: string }
interface BreakItem { v: string; l: string }

/**
 * /oferta — Long-form sales landing for paid traffic.
 * Hormozi-style: scarcity → pain → solution → proof → offer →
 * implementation timeline → FAQ → final CTA.
 * All CTAs route to /diagnostico (UTM attribution preserved via sessionStorage).
 */
export default function OfertaPage() {
  const { t } = useTranslation()

  useEffect(() => {
    // Home (/) e alias /oferta compartilham conteúdo → canonical sempre "/"
    setSeo({
      title: t('oferta.metaTitle'),
      description: t('oferta.metaDesc'),
      canonicalPath: '/',
    })
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

            {/* Social proof — clients in production */}
            <Reveal delay={220}>
              <div className="mt-10 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">
                  {t('oferta.proof.socialLabel')}
                </p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-ink/85 sm:text-base">
                  {t('oferta.proof.socialClients')}
                </p>
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

            {/* Price breakdown — makes R$ 2.500 feel small */}
            <Reveal delay={120}>
              <div className="mt-8">
                <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-muted">
                  {t('oferta.offer.priceBreakLabel')}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {(t('oferta.offer.priceBreakItems', { returnObjects: true }) as BreakItem[]).map((b) => (
                    <div
                      key={b.l}
                      className="rounded-xl border border-line bg-surface px-3 py-4 text-center"
                    >
                      <div className="text-xl font-black tracking-tight text-ink sm:text-2xl">{b.v}</div>
                      <div className="mt-1 text-[11px] leading-tight text-muted">{b.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Comparison TABLE — 1 CLT vs 14 Arkai agents */}
            <Reveal delay={200}>
              <div className="mt-10 overflow-hidden rounded-2xl border border-line">
                <div className="border-b border-line bg-surface-2 px-5 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    {t('oferta.offer.compareLabel')}
                  </p>
                </div>
                <ComparisonTable
                  headers={t('oferta.offer.compareHeaders', { returnObjects: true }) as string[]}
                  rows={t('oferta.offer.compareRows', { returnObjects: true }) as string[][]}
                />
              </div>
            </Reveal>

            {/* Anti-features — "You DON'T need to..." */}
            <Reveal delay={300}>
              <div className="mt-10 rounded-2xl border border-line bg-surface p-7 sm:p-9">
                <h3 className="text-base font-bold sm:text-lg">{t('oferta.offer.notNeededLabel')}</h3>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {(t('oferta.offer.notNeededItems', { returnObjects: true }) as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-red-400/15 text-[10px] font-bold text-red-300">
                        ✗
                      </span>
                      <span className="text-ink/85 line-through decoration-line/60">{item}</span>
                    </li>
                  ))}
                </ul>
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

/* ---------------- Comparison table ---------------- */

function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  // Last row = "Total cost" → highlight as the punchline
  return (
    <>
      {/* Desktop / tablet — true table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface-2/60">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`px-5 py-3 text-left text-xs font-bold uppercase tracking-wider ${
                    i === 0
                      ? 'w-1/3 text-muted'
                      : i === 1
                        ? 'text-muted'
                        : 'text-accent-2'
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              const isLast = ri === rows.length - 1
              return (
                <tr
                  key={ri}
                  className={`border-t border-line ${isLast ? 'bg-accent/5' : ''}`}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-5 py-3.5 text-sm ${
                        ci === 0
                          ? 'font-semibold text-muted'
                          : ci === 1
                            ? 'text-ink/80'
                            : 'font-semibold text-ink'
                      } ${isLast && ci === 2 ? 'gradient-text font-black' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile — stacked cards (each row becomes a 2-col mini grid) */}
      <div className="flex flex-col divide-y divide-line md:hidden">
        {rows.map((row, ri) => {
          const isLast = ri === rows.length - 1
          return (
            <div key={ri} className={`p-4 ${isLast ? 'bg-accent/5' : ''}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                {row[0]}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted">{headers[1]}</p>
                  <p className="mt-0.5 text-sm text-ink/80">{row[1]}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-accent-2">{headers[2]}</p>
                  <p className={`mt-0.5 text-sm font-semibold ${isLast ? 'gradient-text font-black' : 'text-ink'}`}>
                    {row[2]}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
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
