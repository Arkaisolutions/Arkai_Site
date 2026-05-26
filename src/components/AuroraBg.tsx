/**
 * Animated aurora-style background.
 * Three blurred gradient orbs drift slowly over a subtle grid.
 * Pure CSS / no GPU-heavy WebGL.
 */
export default function AuroraBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--ink)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ink)) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 75% 65% at 50% 0%, #000 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 65% at 50% 0%, #000 30%, transparent 100%)',
        }}
      />

      {/* Aurora orbs */}
      <div
        className="absolute left-[-15%] top-[-10%] h-[55vmax] w-[55vmax] animate-aurora-1 rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at center, rgb(var(--accent)) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute right-[-15%] top-[-5%] h-[50vmax] w-[50vmax] animate-aurora-2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle at center, rgb(var(--accent-2)) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute left-[20%] top-[30%] h-[40vmax] w-[40vmax] animate-aurora-3 rounded-full opacity-30 blur-[140px]"
        style={{
          background:
            'radial-gradient(circle at center, rgb(108 92 255) 0%, transparent 65%)',
        }}
      />

      {/* Dark fade toward bottom so next section blends */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgb(var(--bg)) 90%)',
        }}
      />
    </div>
  )
}
