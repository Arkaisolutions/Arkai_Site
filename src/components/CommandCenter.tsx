import { useTranslation } from 'react-i18next'
import CommandCenterMockup from './CommandCenterMockup'
import { ContainerScroll } from './ContainerScroll'

export default function CommandCenter() {
  const { t } = useTranslation()

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
    </section>
  )
}
