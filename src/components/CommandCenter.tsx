import { useTranslation } from 'react-i18next'
import CommandCenterMockup from './CommandCenterMockup'
import { ContainerScroll } from './ContainerScroll'

export default function CommandCenter() {
  const { t, i18n } = useTranslation()

  return (
    <section id="command" className="relative">
      <ContainerScroll
        titleComponent={
          <div className="mb-2">
            <span className="eyebrow">{t('command.eyebrow')}</span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              {t('command.title1')}{' '}
              <span className="gradient-text">{t('command.title2')}</span>
            </h2>
          </div>
        }
      >
        <CommandCenterMockup />
      </ContainerScroll>
      <p className="container-content -mt-10 pb-10 text-center text-xs text-muted">
        {i18n.language.startsWith('en') ? 'Illustrative interface. Real product screenshots will be added after validation.' : i18n.language.startsWith('es') ? 'Interfaz ilustrativa. Las capturas reales se añadirán después de la validación.' : 'Interface ilustrativa. Capturas reais do produto serão adicionadas após validação.'}
      </p>
    </section>
  )
}
