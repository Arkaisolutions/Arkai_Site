import { useState } from 'react'
import Aurora from './reactbits/Aurora'

const arkaiColors = ['#6c5cff', '#4369ff', '#25d6e6']

/** React Bits Aurora behind the first two Arkai hero sections only. */
export default function BrandAuroraBg() {
  const [reduceMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_28%,rgba(108,92,255,0.18),transparent_48%),radial-gradient(ellipse_at_85%_25%,rgba(37,214,230,0.11),transparent_48%)]" />
      {!reduceMotion && (
        <div className="absolute inset-0 opacity-90" style={{ transform: 'scale(1.05)' }}>
          <Aurora colorStops={arkaiColors} amplitude={0.8} blend={0.65} speed={0.55} />
        </div>
      )}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: 'linear-gradient(rgb(var(--ink)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ink)) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 75% 75% at 50% 15%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 15%, #000 30%, transparent 100%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/25 to-bg" />
    </div>
  )
}
