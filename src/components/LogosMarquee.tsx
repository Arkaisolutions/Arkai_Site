import { useTranslation } from 'react-i18next'

/**
 * Marquee infinito com os nichos atendidos. Texto vem do i18n,
 * duplicado pra loop sem corte.
 */
export default function LogosMarquee() {
  const { t } = useTranslation()
  const items = t('trust.items', { returnObjects: true }) as string[]

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
          {[...items, ...items].map((name, i) => (
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
