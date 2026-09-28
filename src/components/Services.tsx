import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { serviceIcons } from './icons'
import Reveal from './Reveal'
import './Services.css'

interface ServiceItem { icon: string; title: string; desc: string; flow: string[] }
const SWAP_DURATION = 820
const AUTO_INTERVAL = 6500

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true }) as ServiceItem[]
  const [active, setActive] = useState(0)
  const [exiting, setExiting] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [visible, setVisible] = useState(!document.hidden)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const sectionRef = useRef<HTMLElement>(null)
  const lockRef = useRef(false)
  const swapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null)
  const suppressClickRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = () => setReduceMotion(media.matches)
    onMotionChange()
    media.addEventListener('change', onMotionChange)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      media.removeEventListener('change', onMotionChange)
    }
  }, [])

  useEffect(() => () => {
    if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current)
  }, [])

  const select = useCallback((next: number, manual = false) => {
    if (lockRef.current || items.length < 2) return
    const normalized = (next + items.length) % items.length
    if (normalized === active) return
    lockRef.current = true
    setExiting(normalized === (active + 1) % items.length ? active : null)
    setActive(normalized)
    if (manual) setAnnouncement(`${normalized + 1} / ${items.length}: ${items[normalized].title}`)
    if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current)
    swapTimeoutRef.current = setTimeout(() => {
      setExiting(null)
      lockRef.current = false
    }, reduceMotion ? 0 : SWAP_DURATION)
  }, [active, items, reduceMotion])

  useEffect(() => {
    if (!inView || !visible || paused || reduceMotion || items.length < 2) return
    const timeout = setTimeout(() => select(active + 1), AUTO_INTERVAL)
    return () => clearTimeout(timeout)
  }, [active, inView, visible, paused, reduceMotion, items.length, select])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current
    pointerStartRef.current = null
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.25) return
    suppressClickRef.current = true
    select(active + (dx < 0 ? 1 : -1), true)
    window.setTimeout(() => { suppressClickRef.current = false }, 0)
  }

  return (
    <section id="services" ref={sectionRef} className="relative py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t('services.eyebrow')}</span>
          <h2 className="section-title mt-5">{t('services.title')}</h2>
          <p className="mt-4 text-muted">{t('services.subtitle')}</p>
        </Reveal>
        <div className="arkai-service-swap" role="region" aria-roledescription="carousel" aria-label={t('services.carouselLabel')}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}>
          <div className="arkai-service-swap__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}
            onPointerCancel={() => { pointerStartRef.current = null }}>
            {items.map((item, index) => {
              const depth = (index - active + items.length) % items.length
              const Icon = serviceIcons[item.icon] ?? serviceIcons.agent
              return (
                <article key={item.icon}
                  className={`arkai-service-swap__card${depth === 0 ? ' is-active' : ''}${exiting === index ? ' is-exiting' : ''}`}
                  style={{ '--swap-depth': depth, zIndex: exiting === index ? items.length + 1 : items.length - depth } as CSSProperties}
                  aria-hidden={depth !== 0}
                  onClick={() => {
                    if (suppressClickRef.current) return
                    select(depth === 0 ? active + 1 : index, true)
                  }}>
                  <div className="arkai-service-swap__topline">
                    <span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
                    <span className="arkai-service-swap__topline-rule" />
                    <span>ARKAI SOLUTIONS</span>
                  </div>
                  <div className="arkai-service-swap__identity">
                    <span className="arkai-service-swap__icon"><Icon width={29} height={29} aria-hidden="true" /></span>
                    <span className="arkai-service-swap__category">{t('services.cardCategory')}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="arkai-service-swap__description">{item.desc}</p>
                  <div className="arkai-service-swap__flow">
                    <span className="arkai-service-swap__flow-label">{t('services.flowLabel')}</span>
                    <div className="arkai-service-swap__flow-steps">
                      {item.flow.map((step, stepIndex) => (
                        <span key={step} className="arkai-service-swap__flow-step">
                          <b>{String(stepIndex + 1).padStart(2, '0')}</b>{step}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="arkai-service-swap__footer">
            <p>{t('services.interactionHint')}</p>
            <div className="arkai-service-swap__controls">
              <button type="button" onClick={() => select(active - 1, true)} aria-label={t('services.previous')}><span aria-hidden="true">←</span></button>
              <span aria-hidden="true">{String(active + 1).padStart(2, '0')} <i>/</i> {String(items.length).padStart(2, '0')}</span>
              <button type="button" onClick={() => select(active + 1, true)} aria-label={t('services.next')}><span aria-hidden="true">→</span></button>
            </div>
          </div>
          <span className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</span>
        </div>
      </div>
    </section>
  )
}
