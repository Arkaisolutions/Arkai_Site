import { useTranslation } from 'react-i18next'
import { IconArrow } from './icons'
import AgentShowcase from './AgentShowcase'
import Reveal from './Reveal'

type Locale = 'pt' | 'en' | 'es'

type Agent = {
  icon: string
  name: string
  does: string
  changes: string
}

const agentArt = [
  '/assets/agentes/animados/atendimento.gif',
  '/assets/agentes/animados/qualificacao.gif',
  '/assets/agentes/animados/marketing.gif',
  '/assets/agentes/animados/gestao-comercial.gif',
  '/assets/agentes/animados/leitura-de-numeros.gif',
  '/assets/agentes/animados/acompanhamento.gif',
] as const

const agentStillArt = [
  '/assets/agentes/agente-atendimento-v1.png',
  '/assets/agentes/agente-qualificacao-v1.png',
  '/assets/agentes/agente-marketing-v1.png',
  '/assets/agentes/agente-gestao-comercial-v1.png',
  '/assets/agentes/agente-analise-v1.png',
  '/assets/agentes/agente-acompanhamento-v1.png',
] as const

const copy: Record<Locale, {
  eyebrow: string
  title: string
  intro: string
  does: string
  changes: string
  closing: string
  cta: string
  agents: Agent[]
}> = {
  pt: {
    eyebrow: 'A OPERAÇÃO, NÃO UMA FERRAMENTA SOLTA',
    title: 'Seis agentes que conversam entre si',
    intro: 'Montados com o jeito da sua empresa atender, conectados à sua operação e acompanhados depois de entrar no ar.',
    does: 'O que faz',
    changes: 'O que muda',
    closing: 'Você não monta nada. A Arkai conecta os agentes, testa com você e acompanha a operação.',
    cta: 'Ver funcionando na minha empresa',
    agents: [
      { icon: 'agent', name: 'Atendimento', does: 'Responde cada contato em segundos, 24 horas, inclusive áudio e foto.', changes: 'Ninguém espera para ser atendido.' },
      { icon: 'check', name: 'Qualificação', does: 'Entende quem tem perfil e quem ainda está só olhando.', changes: 'O vendedor recebe contato pronto.' },
      { icon: 'traffic', name: 'Marketing e tráfego', does: 'Acompanha campanhas e devolve o que avançou até a venda.', changes: 'A verba fica mais orientada ao que funciona.' },
      { icon: 'workflow', name: 'Gestão comercial', does: 'Move contatos pelas etapas e cuida dos retornos pendentes.', changes: 'Nada fica parado esperando alguém lembrar.' },
      { icon: 'data', name: 'Leitura de números', does: 'Organiza o resumo do dia e sinaliza o que sai do padrão.', changes: 'Você enxerga a operação com mais clareza.' },
      { icon: 'support', name: 'Acompanhamento', does: 'Vigia o que ficou em aberto e sinaliza o próximo passo.', changes: 'O que começou tem acompanhamento até o fim.' },
    ],
  },
  en: {
    eyebrow: 'AN OPERATION, NOT A STANDALONE TOOL',
    title: 'Six agents working together',
    intro: 'Built around how your company serves customers, connected to your operation and monitored after launch.',
    does: 'What it does',
    changes: 'What changes',
    closing: 'You do not have to assemble the tools. Arkai connects the agents, tests with you and follows the operation.',
    cta: 'See it working for my company',
    agents: [
      { icon: 'agent', name: 'Customer service', does: 'Answers inquiries around the clock, including audio and photos.', changes: 'No inquiry is left waiting.' },
      { icon: 'check', name: 'Qualification', does: 'Identifies who is ready to buy and who is still exploring.', changes: 'Sales receives better-prepared contacts.' },
      { icon: 'traffic', name: 'Marketing and traffic', does: 'Tracks campaigns and feeds sales outcomes back into them.', changes: 'Spend is guided by what works.' },
      { icon: 'workflow', name: 'Sales management', does: 'Moves contacts through stages and handles pending follow-ups.', changes: 'Opportunities do not depend on someone remembering.' },
      { icon: 'data', name: 'Numbers and insights', does: 'Summarizes the day and flags unusual changes.', changes: 'You can see the operation more clearly.' },
      { icon: 'support', name: 'Follow-through', does: 'Watches open items and signals the next step.', changes: 'Work in progress stays visible until completion.' },
    ],
  },
  es: {
    eyebrow: 'UNA OPERACIÓN, NO UNA HERRAMIENTA AISLADA',
    title: 'Seis agentes que trabajan juntos',
    intro: 'Configurados según la forma en que tu empresa atiende, conectados a tu operación y supervisados después del lanzamiento.',
    does: 'Qué hace',
    changes: 'Qué cambia',
    closing: 'No tienes que montar las herramientas. Arkai conecta los agentes, prueba contigo y acompaña la operación.',
    cta: 'Verlo funcionando en mi empresa',
    agents: [
      { icon: 'agent', name: 'Atención', does: 'Responde consultas a cualquier hora, incluso audio y fotos.', changes: 'Nadie queda esperando una respuesta.' },
      { icon: 'check', name: 'Calificación', does: 'Distingue quién tiene perfil de compra y quién todavía explora.', changes: 'Ventas recibe contactos mejor preparados.' },
      { icon: 'traffic', name: 'Marketing y tráfico', does: 'Sigue las campañas y les devuelve lo que avanzó hasta la venta.', changes: 'La inversión se orienta a lo que funciona.' },
      { icon: 'workflow', name: 'Gestión comercial', does: 'Mueve contactos por etapas y atiende los seguimientos pendientes.', changes: 'Nada queda parado por falta de recordatorio.' },
      { icon: 'data', name: 'Lectura de datos', does: 'Resume el día y avisa cuando algo sale de lo normal.', changes: 'Ves la operación con más claridad.' },
      { icon: 'support', name: 'Seguimiento', does: 'Vigila lo que sigue abierto y señala el próximo paso.', changes: 'Cada proceso permanece visible hasta cerrarse.' },
    ],
  },
}

export default function SixAgents({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation()
  const locale: Locale = i18n.language.startsWith('en') ? 'en' : i18n.language.startsWith('es') ? 'es' : 'pt'
  const content = copy[locale]
  return (
    <section id="agents" className={`relative ${compact ? 'py-16' : 'py-24'}`}>
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[460px] max-w-5xl rounded-full bg-accent/10 blur-[140px]" aria-hidden="true" />
      <div className="container-content relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title mt-5">{content.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{content.intro}</p>
        </Reveal>

        <AgentShowcase
          items={content.agents.map((agent, index) => ({
            icon: agent.icon,
            image: agentArt[index],
            stillImage: agentStillArt[index],
            name: agent.name,
            primary: agent.does,
            secondary: agent.changes,
          }))}
          title={content.title}
          primaryLabel={content.does}
          secondaryLabel={content.changes}
        />

        <Reveal delay={180}>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-accent/25 bg-accent/5 px-6 py-6 sm:flex-row sm:items-center sm:px-8">
            <p className="max-w-2xl text-sm leading-relaxed text-ink/90 sm:text-base">{content.closing}</p>
            <a href="/diagnostico" className="btn-primary shrink-0">{content.cta}<IconArrow width={16} height={16} /></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
