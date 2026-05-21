import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'

const tools = [
  'n8n',
  'OpenAI',
  'Anthropic Claude',
  'Supabase',
  'WhatsApp API',
  'Make',
  'Vercel',
  'Python',
  'React',
  'PostgreSQL',
  'Meta Ads',
  'Google Cloud',
]

export default function Stack() {
  const { t } = useTranslation()

  return (
    <section className="relative border-y border-line bg-surface/40 py-20">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t('stack.eyebrow')}</span>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t('stack.title')}
          </h2>
          <p className="mt-3 text-sm text-muted">{t('stack.subtitle')}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-ink"
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
