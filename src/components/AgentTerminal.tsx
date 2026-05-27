import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * "AI Agent · Live" terminal. Cycles through fake but plausible agent
 * activity lines with a typewriter effect. Show-don't-tell for the product.
 *
 * NOTE: We intentionally depend on `i18n.language` (NOT on the lines array),
 * because `t(..., { returnObjects: true })` returns a NEW array reference on
 * every render, which would reset the animation every render and the terminal
 * would never finish typing the first line.
 */
export default function AgentTerminal() {
  const { t, i18n } = useTranslation()

  const [printed, setPrinted] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Snapshot the lines once for this language pass.
    const lines = t('terminal.lines', { returnObjects: true }) as string[]
    if (!Array.isArray(lines) || lines.length === 0) return

    // Reset visual state for this run.
    setPrinted([])
    setCurrentLine('')

    let mounted = true
    let typeTimer: number | undefined
    let nextLineTimer: number | undefined
    let index = 0

    const typeLine = (line: string, onDone: () => void) => {
      let i = 0
      const tick = () => {
        if (!mounted) return
        i++
        setCurrentLine(line.slice(0, i))
        if (i < line.length) {
          typeTimer = window.setTimeout(tick, 22 + Math.random() * 28)
        } else {
          typeTimer = window.setTimeout(onDone, 900)
        }
      }
      tick()
    }

    const advance = () => {
      if (!mounted) return
      const line = lines[index % lines.length]
      typeLine(line, () => {
        if (!mounted) return
        setPrinted((prev) => {
          const next = [...prev, line]
          // keep last 7 lines so the box doesn't grow indefinitely
          return next.length > 7 ? next.slice(next.length - 7) : next
        })
        setCurrentLine('')
        index += 1
        nextLineTimer = window.setTimeout(advance, 250)
      })
    }

    advance()

    return () => {
      mounted = false
      if (typeTimer) clearTimeout(typeTimer)
      if (nextLineTimer) clearTimeout(nextLineTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight
    }
  }, [printed, currentLine])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-[0_30px_80px_-30px_rgb(var(--accent))] backdrop-blur">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-line bg-surface-2/60 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          {t('terminal.label')}
        </div>
        <div className="w-9" />
      </div>

      {/* Output */}
      <div
        ref={scrollerRef}
        className="font-mono text-[12.5px] leading-[1.65] sm:text-[13.5px]"
        style={{
          height: 260,
          overflowY: 'hidden',
          padding: '18px 20px',
        }}
      >
        {printed.map((l, i) => (
          <div
            key={i}
            className={l.trimStart().startsWith('→') ? 'text-accent-2' : 'text-ink/85'}
          >
            {l}
          </div>
        ))}
        <div
          className={currentLine.trimStart().startsWith('→') ? 'text-accent-2' : 'text-ink/85'}
        >
          {currentLine}
          <span className="ml-0.5 inline-block h-[14px] w-[7px] -mb-[2px] animate-blink bg-accent" />
        </div>
      </div>
    </div>
  )
}
