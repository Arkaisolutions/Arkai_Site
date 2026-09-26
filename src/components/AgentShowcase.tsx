import { useId, useState, type KeyboardEvent } from 'react'
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [reduceMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const tabId = useId().replaceAll(':', '')
  const selectedAgent = items[selectedIndex]

  const handleAgentKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % items.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + items.length) % items.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = items.length - 1
    else return

    event.preventDefault()
    setSelectedIndex(nextIndex)
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus()
  }

  return (
    <>
      <div className="agent-showcase__stack" role="tablist" aria-label={title}>
        {items.map((agent, index) => {
          const Icon = agentIcons[agent.icon] ?? agentIcons.agent
          const selected = selectedIndex === index
          const raised = hoveredIndex === index
          return (
            <button
              key={agent.name}
              id={`${tabId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${tabId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={`agent-showcase__card${selected ? ' agent-showcase__card--selected' : ''}${raised ? ' agent-showcase__card--raised' : ''}`}
              style={{ zIndex: raised ? 20 : index + 1 }}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
                  setHoveredIndex(index)
                  setSelectedIndex(index)
                }
              }}
              onPointerLeave={() => setHoveredIndex((current) => current === index ? null : current)}
              onFocus={() => setSelectedIndex(index)}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(event) => handleAgentKeyDown(event, index)}
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
                />
              </span>
              <span className="agent-showcase__card-name">{agent.name}</span>
              <span className="agent-showcase__card-indicator" aria-hidden="true" />
            </button>
          )
        })}
      </div>

      <div
        id={`${tabId}-panel`}
        role="tabpanel"
        aria-labelledby={`${tabId}-tab-${selectedIndex}`}
        tabIndex={0}
        className="agent-showcase__details"
      >
        <div className="agent-showcase__details-heading">
          <span>0{selectedIndex + 1} / 0{items.length}</span>
          <h3>{selectedAgent.name}</h3>
        </div>
        <div className="agent-showcase__details-copy">
          <div>{primaryLabel && <h4>{primaryLabel}</h4>}<p>{selectedAgent.primary}</p></div>
          <div><h4>{secondaryLabel}</h4><p>{selectedAgent.secondary}</p></div>
        </div>
      </div>
    </>
  )
}
