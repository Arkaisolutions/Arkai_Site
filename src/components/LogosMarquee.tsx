import { useTranslation } from 'react-i18next'

/**
 * Scrolling client wordmarks. Text-based for now (no logo assets yet).
 * Duplicated to create a seamless infinite loop.
 */
const clients = [
  'ClickParts Brasil',
  'Futuro Solar',
  'Principal Automóveis',
  'Casae Temporada',
  'Hotel Palace',
  'Casa Reserva Tucano',
]

export default function LogosMarquee() {
  const { t } = useTranslation()

  return (
    <div className="relative w-full">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted">
        {t('trust.label')}
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-marquee gap-12 py-2">
          {[...clients, ...clients].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap text-base font-semibold tracking-tight text-muted/80 transition-colors hover:text-ink sm:text-lg"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
