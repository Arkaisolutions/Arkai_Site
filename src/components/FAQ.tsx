import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'

interface QA {
  q: string
  a: string
}

export default function FAQ() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as QA[]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative py-24">
      <div className="container-content max-w-3xl">
        <Reveal className="text-center">
          <span className="eyebrow">{t('faq.eyebrow')}</span>
          <h2 className="section-title mt-5">{t('faq.title')}</h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div
                  className={`overflow-hidden rounded-xl border transition-colors ${
                    isOpen ? 'border-accent/40 bg-surface-2' : 'border-line bg-surface'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold">{item.q}</span>
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-lg leading-none text-accent transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
