import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'

const copy = {
  pt: {
    eyebrow: 'O QUE SE PERDE NO CAMINHO',
    title: 'A demanda chega. O problema vem depois.',
    intro: 'O tempo até responder, o orçamento sem retorno e o dono no meio de tudo: é nesses pontos que a operação precisa de cuidado.',
    items: [
      ['O contato esfria', 'Quem pergunta preço e não recebe resposta a tempo pode comprar de outro.'],
      ['O orçamento fica parado', 'Sem retorno, a conversa perde ritmo e a oportunidade pode desaparecer.'],
      ['Tudo passa por você', 'A rotina fica dependente de uma pessoa lembrar de cada próximo passo.'],
      ['Crescer fica caro', 'Mais demanda pode significar mais retrabalho e mais cobrança interna.'],
    ],
  },
  en: {
    eyebrow: 'WHAT GETS LOST ALONG THE WAY',
    title: 'Demand arrives. The problem comes after.',
    intro: 'Response time, quotes without follow-up and the owner caught in every step: these are the moments that need attention.',
    items: [
      ['Inquiries go cold', 'Someone asking for a price may choose another company if the answer takes too long.'],
      ['Quotes stall', 'Without a follow-up, the conversation loses momentum.'],
      ['Everything depends on you', 'The routine depends on one person remembering every next step.'],
      ['Growth gets expensive', 'More demand can bring more rework and internal chasing.'],
    ],
  },
  es: {
    eyebrow: 'LO QUE SE PIERDE EN EL CAMINO',
    title: 'La demanda llega. El problema viene después.',
    intro: 'La demora en responder, el presupuesto sin seguimiento y el dueño en medio de todo son los puntos que requieren atención.',
    items: [
      ['El contacto se enfría', 'Quien pregunta el precio puede comprar en otro lugar si la respuesta tarda.'],
      ['El presupuesto se detiene', 'Sin seguimiento, la conversación pierde impulso.'],
      ['Todo pasa por ti', 'La rutina depende de una persona que recuerde cada paso.'],
      ['Crecer cuesta más', 'Más demanda puede traer más retrabajo y más seguimiento interno.'],
    ],
  },
}

export default function FrictionSection() {
  const { i18n } = useTranslation()
  const lang = i18n.language.startsWith('en') ? 'en' : i18n.language.startsWith('es') ? 'es' : 'pt'
  const content = copy[lang]

  return (
    <section className="relative border-y border-line bg-surface/30 py-20">
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title mt-5">{content.title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{content.intro}</p>
        </Reveal>
        <div className="mt-11 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {content.items.map(([title, description], index) => (
            <Reveal key={title} delay={index * 60}>
              <article className="h-full rounded-2xl border border-line bg-surface px-6 py-7">
                <div className="mb-8 h-1 w-11 rounded-full bg-gradient-to-r from-accent to-accent-2" aria-hidden="true" />
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
