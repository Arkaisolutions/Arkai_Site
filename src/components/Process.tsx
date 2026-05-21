import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'

interface Step {
  n: string
  title: string
  desc: string
}

export default function Process() {
  const { t } = useTranslation()
  const steps = t('process.steps', { returnObjects: true }) as Step[]

  return (
    <section id="process" className="relative py-24">
      <div className="glow left-1/2 top-1/3 h-[360px] w-[360px] -translate-x-1/2 bg-accent opacity-30" />
      <div className="container-content relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t('process.eyebrow')}</span>
          <h2 className="section-title mt-5">{t('process.title')}</h2>
          <p className="mt-4 text-muted">{t('process.subtitle')}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <div className="card h-full">
                <span className="text-4xl font-black text-line">{step.n}</span>
                <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
