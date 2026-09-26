import { useTranslation } from 'react-i18next'
import ContactForm from '../lead/ContactForm'

type Locale = 'pt' | 'en' | 'es'

const copy: Record<Locale, {
  eyebrow: string
  campaignEyebrow: string
  title: string
  description: string
  benefits: [string, string, string]
}> = {
  pt: {
    eyebrow: 'VAMOS CONVERSAR',
    campaignEyebrow: 'PRÓXIMO PASSO',
    title: 'Vamos ver onde sua empresa está perdendo venda',
    description: 'Preencha o formulário para conversarmos sobre sua operação. Sem compromisso de contratação.',
    benefits: ['Análise gratuita da operação', 'Sem compromisso de contratação', 'Conversa sobre os próximos passos'],
  },
  en: {
    eyebrow: "LET'S TALK",
    campaignEyebrow: 'NEXT STEP',
    title: 'Let’s see where your company is losing sales',
    description: 'Fill out the form so we can discuss your operations. No obligation to hire us.',
    benefits: ['Free review of your operations', 'No obligation to hire', 'A conversation about next steps'],
  },
  es: {
    eyebrow: 'HABLEMOS',
    campaignEyebrow: 'SIGUIENTE PASO',
    title: 'Veamos dónde está perdiendo ventas tu empresa',
    description: 'Completa el formulario para que conversemos sobre tu operación. Sin compromiso de contratación.',
    benefits: ['Análisis gratuito de tu operación', 'Sin compromiso de contratación', 'Una conversación sobre los próximos pasos'],
  },
}

export default function ContactSection({ campaign = false }: { campaign?: boolean }) {
  const { i18n } = useTranslation()
  const locale: Locale = i18n.language.startsWith('en') ? 'en' : i18n.language.startsWith('es') ? 'es' : 'pt'
  const content = copy[locale]

  return (
    <section id="contato" className="relative py-20 sm:py-24">
      <div className="container-content grid items-start gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
        <div className="max-w-xl">
          <span className="eyebrow">{campaign ? content.campaignEyebrow : content.eyebrow}</span>
          <h2 className="section-title mt-5">{content.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted">{content.description}</p>
          <ul className="mt-8 space-y-3 text-sm text-ink/85">
            {content.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent-2" />{benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-[0_22px_100px_-55px_rgb(var(--accent))] sm:p-9">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
