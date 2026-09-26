import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CircularGallery from './reactbits/CircularGallery'
import { IconArrow, IconCheck, industryIcons } from './icons'
import Reveal from './Reveal'

interface IndustryItem {
  icon: string
  tag: string
  title: string
  desc: string
  bullets: string[]
}

const industryImages = [
  'imoveis', 'clinicas', 'energia-solar', 'carros-motos', 'reparos', 'seguros',
  'advocacia', 'financas', 'varejo', 'saas', 'hotelaria', 'academias',
].map((slug) => `/assets/setores/${slug}.jpg`)

export default function Work() {
  const { t, i18n } = useTranslation()
  const items = useMemo(() => t('work.items', { returnObjects: true }) as IndustryItem[], [t])
  const [active, setActive] = useState(0)
  const [reduceMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const galleryItems = useMemo(
    () => items.map((item, index) => ({ image: industryImages[index], text: item.title })),
    [items],
  )
  const onActiveChange = useCallback((index: number) => setActive(index), [])
  const changeActive = (direction: number) => setActive((index) => (index + direction + items.length) % items.length)
  const item = items[active] ?? items[0]
  const Icon = industryIcons[item.icon] ?? industryIcons.solar
  const isPt = i18n.language.startsWith('pt')

  return (
    <section id="work" className="relative py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t('work.eyebrow')}</span>
          <h2 className="section-title mt-5">{t('work.title')}</h2>
          <p className="mt-4 text-muted">{t('work.subtitle')}</p>
        </Reveal>

        <div className="relative mt-10">
          {reduceMotion ? (
            <div className="mx-auto max-w-xl px-5 pt-8">
              <img src={industryImages[active]} alt={item.title} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            </div>
          ) : (
            <div className="relative h-[310px] sm:h-[420px] lg:h-[500px]">
              <CircularGallery
                items={galleryItems}
                activeIndex={active}
                onActiveChange={onActiveChange}
                bend={2.2}
                borderRadius={0.055}
                textColor="#f3f4fb"
                font="bold 18px Inter"
                scrollSpeed={1.6}
                ariaLabel={isPt ? 'Galeria de setores. Arraste ou use as setas esquerda e direita.' : 'Industry gallery. Drag or use the left and right arrow keys.'}
              />
            </div>
          )}

          <div className="relative flex items-center justify-center gap-4 px-5 py-4">
            <button type="button" onClick={() => changeActive(-1)} aria-label={isPt ? 'Setor anterior' : 'Previous industry'} className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface-2 text-ink transition hover:border-accent hover:text-accent-2">←</button>
            <span className="min-w-16 text-center text-xs font-bold tracking-[0.2em] text-accent-2">{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => changeActive(1)} aria-label={isPt ? 'Próximo setor' : 'Next industry'} className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface-2 text-ink transition hover:border-accent hover:text-accent-2">→</button>
          </div>
        </div>

        <article className="mx-auto mt-5 grid max-w-5xl gap-8 rounded-3xl border border-line bg-surface p-6 sm:p-9 lg:grid-cols-[1fr_1fr]" aria-live="polite">
          <div>
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent-2"><Icon width={22} height={22} /></div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-2">{item.tag}</p>
            <h3 className="mt-2 text-2xl font-bold leading-snug sm:text-3xl">{item.title}</h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">{item.desc}</p>
          </div>
          <ul className="flex flex-col justify-center gap-4 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-ink/85">
                <IconCheck width={16} height={16} className="mt-0.5 shrink-0 text-accent-2" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </article>

        <Reveal delay={100}>
          <p className="mt-10 text-center text-sm text-muted">
            <span className="font-semibold text-ink/80">{t('work.alsoLabel')}:</span>{' '}
            {t('work.alsoList')}
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-2xl border border-line bg-surface px-7 py-6 sm:flex-row sm:gap-8 sm:px-9">
            <div>
              <h4 className="text-lg font-bold">{t('work.ctaLabel')}</h4>
              <p className="mt-1 text-sm text-muted">{t('work.ctaSub')}</p>
            </div>
            <a href="/diagnostico" className="btn-primary shrink-0">
              {t('work.ctaButton')}
              <IconArrow width={15} height={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
