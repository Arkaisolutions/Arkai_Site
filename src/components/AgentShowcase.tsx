import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { agentIcons } from './icons'
import './SixAgents.css'

export interface AgentShowcaseItem {
  icon: string
  image: string
  stillImage: string
  name: string
  primary: string
  secondary: string
}

export default function AgentShowcase({
  items,
  title,
  primaryLabel,
  secondaryLabel,
}: {
  items: AgentShowcaseItem[]
  title: string
  primaryLabel?: string
  secondaryLabel: string
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [reduceMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window))
  const [pageVisible, setPageVisible] = useState(true)
  const [dragging, setDragging] = useState(false)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const dragged = useRef(false)
  const selectedAgent = items[selectedIndex]
  const autoplaying = visible && pageVisible && !reduceMotion && !dragging

  useEffect(() => {
    const element = showcaseRef.current
    if (!element || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible')
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    if (!autoplaying || items.length < 2) return
    const timeout = window.setTimeout(() => {
      setSelectedIndex((current) => (current + 1) % items.length)
    }, 3000)
    return () => window.clearTimeout(timeout)
  }, [autoplaying, items.length, selectedIndex])

  const navigate = (step: number) => {
    setSelectedIndex((current) => (current + step + items.length) % items.length)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      navigate(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      navigate(-1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setSelectedIndex(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setSelectedIndex(items.length - 1)
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    pointerStart.current = { x: event.clientX, y: event.clientY }
    dragged.current = false
    setDragging(true)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current) return
    const dx = event.clientX - pointerStart.current.x
    const dy = event.clientY - pointerStart.current.y
    pointerStart.current = null
    setDragging(false)
    if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
      dragged.current = true
      navigate(dx < 0 ? 1 : -1)
      window.setTimeout(() => { dragged.current = false }, 0)
    }
  }

  return (
    <div ref={showcaseRef} className="agent-showcase" role="group" aria-roledescription="carousel" aria-label={title}>
      <div
        className="agent-showcase__stage"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => { pointerStart.current = null; setDragging(false) }}
        onPointerCancel={() => { pointerStart.current = null; setDragging(false) }}
      >
        {items.map((agent, index) => {
          const Icon = agentIcons[agent.icon] ?? agentIcons.agent
          const depth = (index - selectedIndex + items.length) % items.length
          const visible = depth <= 3
          return (
            <button
              key={agent.name}
              type="button"
              className={`agent-showcase__card${depth === 0 ? ' agent-showcase__card--selected' : ''}`}
              style={{ '--agent-depth': depth, zIndex: items.length - depth } as CSSProperties}
              aria-label={`${index + 1} de ${items.length}: ${agent.name}`}
              aria-current={depth === 0 ? 'true' : undefined}
              aria-hidden={!visible}
              tabIndex={-1}
              onClick={() => { if (!dragged.current) setSelectedIndex(index) }}
            >
              <span className="agent-showcase__card-top">
                <span>0{index + 1} / 0{items.length}</span>
                <Icon width={22} height={22} aria-hidden="true" />
              </span>
              <span className="agent-showcase__art">
                <img
                  src={reduceMotion ? agent.stillImage : agent.image}
                  className={reduceMotion ? 'agent-showcase__still' : undefined}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  draggable={false}
                />
              </span>
              <span className="agent-showcase__card-name">{agent.name}</span>
              <span className="agent-showcase__card-indicator" aria-hidden="true" />
            </button>
          )
        })}
      </div>

      <div className="agent-showcase__details" aria-live={autoplaying ? 'off' : 'polite'}>
        <div className="agent-showcase__details-heading">
          <span>0{selectedIndex + 1} / 0{items.length}</span>
          <h3>{selectedAgent.name}</h3>
        </div>
        <div className="agent-showcase__details-copy">
          <div>{primaryLabel && <h4>{primaryLabel}</h4>}<p>{selectedAgent.primary}</p></div>
          <div><h4>{secondaryLabel}</h4><p>{selectedAgent.secondary}</p></div>
        </div>
      </div>
    </div>
  )
}
