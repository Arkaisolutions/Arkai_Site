import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IconArrow,
  IconBuilding,
  IconData,
  IconGlobe,
  IconHealth,
  IconHotel,
  IconShop,
  IconSaas,
  IconSolar,
  IconWorkflow,
} from './icons'
import './ArkaiServicesIndustries.css'

type Locale = 'pt' | 'en' | 'es'
type ServiceId = 'software' | 'platforms' | 'websites' | 'automation' | 'integrations'
type IndustryId = 'health' | 'realestate' | 'retail' | 'travel' | 'solar'

type Service = {
  id: ServiceId
  title: string
  description: string
}

type Industry = {
  id: IndustryId
  name: string
  heading: string
  description: string
  journey: [string, string, string]
}

type Copy = {
  eyebrow: string
  title: string
  introduction: string
  coreLabel: string
  coreName: string
  coreNote: string
  canvasKicker: string
  canvasChannels: string
  canvasSystems: string
  canvasOperation: string
  servicesLabel: string
  industriesEyebrow: string
  industriesTitle: string
  industriesIntroduction: string
  industriesNote: string
  journeyLabel: string
  cta: string
  services: Service[]
  industries: Industry[]
}

const copy: Record<Locale, Copy> = {
  pt: {
    eyebrow: 'Ecossistema Arkai',
    title: 'A tecnologia ao redor dos seus seis agentes.',
    introduction:
      'Os agentes são o centro da oferta. Quando a sua operação precisa de uma camada própria, criamos os pontos de contato, sistemas e conexões que ajudam tudo a trabalhar junto.',
    coreLabel: 'Oferta principal',
    coreName: 'Agentes de IA',
    coreNote: 'O núcleo da operação',
    canvasKicker: 'Arquitetura conectada',
    canvasChannels: 'Canais',
    canvasSystems: 'Sistemas',
    canvasOperation: 'Operação',
    servicesLabel: 'Serviços complementares',
    industriesEyebrow: 'Onde aplicamos',
    industriesTitle: 'Cada setor tem uma jornada diferente.',
    industriesIntroduction:
      'Selecionamos os fluxos e integrações conforme o contexto de cada negócio. Estes são exemplos de jornadas possíveis, não resultados ou projetos específicos já entregues.',
    industriesNote: 'Exemplo de jornada a desenhar em conjunto',
    journeyLabel: 'Jornada possível',
    cta: 'Conversar sobre meu projeto',
    services: [
      {
        id: 'software',
        title: 'Software sob medida',
        description: 'Ferramentas próprias para organizar processos e informações que não cabem em soluções prontas.',
      },
      {
        id: 'platforms',
        title: 'Plataformas',
        description: 'Ambientes digitais para reunir solicitações, acompanhamento e áreas da sua operação.',
      },
      {
        id: 'websites',
        title: 'Criação de sites',
        description: 'Experiências claras para apresentar sua oferta e abrir o caminho para uma conversa.',
      },
      {
        id: 'automation',
        title: 'Automações',
        description: 'Fluxos para reduzir etapas manuais entre o contato inicial e o trabalho da equipe.',
      },
      {
        id: 'integrations',
        title: 'Integrações',
        description: 'Conexões entre canais e ferramentas existentes, definidas após análise técnica.',
      },
    ],
    industries: [
      {
        id: 'health',
        name: 'Saúde e bem-estar',
        heading: 'Do primeiro contato ao agendamento.',
        description:
          'Uma jornada de comunicação mais organizada, respeitando os cuidados próprios de cada serviço e seus dados.',
        journey: ['Contato', 'Orientação', 'Agendamento'],
      },
      {
        id: 'realestate',
        name: 'Imobiliária',
        heading: 'Da procura ao encontro com o corretor.',
        description:
          'Informações sobre interesse, perfil e disponibilidade podem chegar à equipe em uma sequência mais clara.',
        journey: ['Interesse', 'Perfil', 'Visita'],
      },
      {
        id: 'retail',
        name: 'Varejo',
        heading: 'Produto, dúvida e retorno no mesmo fluxo.',
        description:
          'Organize o caminho entre descoberta, atendimento e acompanhamento conforme seus canais de venda.',
        journey: ['Descoberta', 'Atendimento', 'Retorno'],
      },
      {
        id: 'travel',
        name: 'Viagens e Turismo',
        heading: 'Uma conversa contínua em cada etapa da viagem.',
        description:
          'Reúna perguntas, informações e próximos passos para atender melhor antes e depois da reserva.',
        journey: ['Consulta', 'Planejamento', 'Reserva'],
      },
      {
        id: 'solar',
        name: 'Energia Solar',
        heading: 'Do interesse inicial à proposta.',
        description:
          'Estruture a coleta de informações e o acompanhamento comercial de acordo com o seu processo.',
        journey: ['Contato', 'Necessidade', 'Proposta'],
      },
    ],
  },
  en: {
    eyebrow: 'The Arkai ecosystem',
    title: 'Technology around your six agents.',
    introduction:
      'The agents are the heart of the offer. When your operation needs its own layer, we build the touchpoints, systems and connections that help everything work together.',
    coreLabel: 'Main offer',
    coreName: 'AI agents',
    coreNote: 'The operational core',
    canvasKicker: 'Connected architecture',
    canvasChannels: 'Channels',
    canvasSystems: 'Systems',
    canvasOperation: 'Operations',
    servicesLabel: 'Complementary services',
    industriesEyebrow: 'Where we apply it',
    industriesTitle: 'Every industry has a different journey.',
    industriesIntroduction:
      'We select workflows and integrations for each business context. These are possible journeys, not results or specific projects already delivered.',
    industriesNote: 'An example journey to design together',
    journeyLabel: 'Possible journey',
    cta: 'Discuss my project',
    services: [
      { id: 'software', title: 'Custom software', description: 'Purpose-built tools to organize processes and information that off-the-shelf products cannot cover.' },
      { id: 'platforms', title: 'Platforms', description: 'Digital spaces that bring requests, follow-up and parts of your operation together.' },
      { id: 'websites', title: 'Website creation', description: 'Clear experiences to present your offer and open a path to a conversation.' },
      { id: 'automation', title: 'Automation', description: 'Workflows that reduce manual steps between the first contact and your team’s work.' },
      { id: 'integrations', title: 'Integrations', description: 'Connections between existing channels and tools, defined after a technical review.' },
    ],
    industries: [
      { id: 'health', name: 'Health and wellness', heading: 'From first contact to scheduling.', description: 'A more organized communication journey, respectful of each service’s requirements and data.', journey: ['Contact', 'Guidance', 'Scheduling'] },
      { id: 'realestate', name: 'Real estate', heading: 'From property search to the agent.', description: 'Interest, profile and availability information can reach the team in a clearer sequence.', journey: ['Interest', 'Profile', 'Visit'] },
      { id: 'retail', name: 'Retail', heading: 'Product, questions and follow-up in one flow.', description: 'Organize the path from discovery to service and follow-up across your sales channels.', journey: ['Discovery', 'Service', 'Follow-up'] },
      { id: 'travel', name: 'Travel and tourism', heading: 'A continuous conversation at every stage.', description: 'Bring questions, information and next steps together before and after booking.', journey: ['Inquiry', 'Planning', 'Booking'] },
      { id: 'solar', name: 'Solar energy', heading: 'From initial interest to proposal.', description: 'Structure information gathering and sales follow-up around your process.', journey: ['Contact', 'Needs', 'Proposal'] },
    ],
  },
  es: {
    eyebrow: 'Ecosistema Arkai',
    title: 'La tecnología alrededor de tus seis agentes.',
    introduction:
      'Los agentes son el centro de la oferta. Cuando tu operación necesita una capa propia, creamos los puntos de contacto, sistemas y conexiones que ayudan a que todo funcione en conjunto.',
    coreLabel: 'Oferta principal',
    coreName: 'Agentes de IA',
    coreNote: 'El núcleo de la operación',
    canvasKicker: 'Arquitectura conectada',
    canvasChannels: 'Canales',
    canvasSystems: 'Sistemas',
    canvasOperation: 'Operación',
    servicesLabel: 'Servicios complementarios',
    industriesEyebrow: 'Dónde lo aplicamos',
    industriesTitle: 'Cada sector tiene un recorrido diferente.',
    industriesIntroduction:
      'Elegimos flujos e integraciones según el contexto de cada negocio. Estos son recorridos posibles, no resultados ni proyectos específicos ya entregados.',
    industriesNote: 'Ejemplo de recorrido para diseñar juntos',
    journeyLabel: 'Recorrido posible',
    cta: 'Hablar sobre mi proyecto',
    services: [
      { id: 'software', title: 'Software a medida', description: 'Herramientas propias para organizar procesos e información que no caben en soluciones listas.' },
      { id: 'platforms', title: 'Plataformas', description: 'Espacios digitales para reunir solicitudes, seguimiento y áreas de tu operación.' },
      { id: 'websites', title: 'Creación de sitios web', description: 'Experiencias claras para presentar tu oferta y abrir el camino a una conversación.' },
      { id: 'automation', title: 'Automatizaciones', description: 'Flujos que reducen tareas manuales entre el primer contacto y el trabajo del equipo.' },
      { id: 'integrations', title: 'Integraciones', description: 'Conexiones entre canales y herramientas existentes, definidas después de una revisión técnica.' },
    ],
    industries: [
      { id: 'health', name: 'Salud y bienestar', heading: 'Del primer contacto a la cita.', description: 'Una comunicación más organizada, respetando las necesidades y los datos de cada servicio.', journey: ['Contacto', 'Orientación', 'Cita'] },
      { id: 'realestate', name: 'Inmobiliaria', heading: 'De la búsqueda al encuentro con el agente.', description: 'Los datos de interés, perfil y disponibilidad pueden llegar al equipo en una secuencia más clara.', journey: ['Interés', 'Perfil', 'Visita'] },
      { id: 'retail', name: 'Comercio', heading: 'Producto, dudas y seguimiento en un mismo flujo.', description: 'Organiza el camino desde el descubrimiento hasta la atención y el seguimiento.', journey: ['Descubrimiento', 'Atención', 'Seguimiento'] },
      { id: 'travel', name: 'Viajes y turismo', heading: 'Una conversación continua en cada etapa.', description: 'Reúne preguntas, información y siguientes pasos antes y después de la reserva.', journey: ['Consulta', 'Planificación', 'Reserva'] },
      { id: 'solar', name: 'Energía solar', heading: 'Del interés inicial a la propuesta.', description: 'Estructura la recopilación de información y el seguimiento comercial según tu proceso.', journey: ['Contacto', 'Necesidad', 'Propuesta'] },
    ],
  },
}

const serviceIcons = {
  software: IconSaas,
  platforms: IconData,
  websites: IconGlobe,
  automation: IconWorkflow,
  integrations: IconWorkflow,
}

const industryIcons = {
  health: IconHealth,
  realestate: IconBuilding,
  retail: IconShop,
  travel: IconHotel,
  solar: IconSolar,
}

function getLocale(language: string): Locale {
  if (language.startsWith('en')) return 'en'
  if (language.startsWith('es')) return 'es'
  return 'pt'
}

export default function ArkaiServicesIndustries() {
  const { i18n } = useTranslation()
  const [activeIndustry, setActiveIndustry] = useState<IndustryId>('health')
  const content = copy[getLocale(i18n.language)]
  const industry = content.industries.find((item) => item.id === activeIndustry) ?? content.industries[0]
  const IndustryIcon = industryIcons[industry.id]

  return (
    <section id="services" className="arkai-capabilities" aria-labelledby="arkai-capabilities-title">
      <div className="arkai-capabilities__shell">
        <div className="arkai-capabilities__intro">
          <div>
            <span className="arkai-capabilities__eyebrow">{content.eyebrow}</span>
            <h2 id="arkai-capabilities-title">{content.title}</h2>
          </div>
          <p>{content.introduction}</p>
        </div>

        <div className="arkai-capabilities__service-layout">
          <div className="arkai-capabilities__visual" aria-hidden="true">
            <div className="arkai-capabilities__visual-top">
              <span><i /> {content.canvasKicker}</span>
              <span>ARKAI / 06</span>
            </div>
            <div className="arkai-capabilities__visual-stage">
              <div className="arkai-capabilities__visual-orbit arkai-capabilities__visual-orbit--outer" />
              <div className="arkai-capabilities__visual-orbit arkai-capabilities__visual-orbit--inner" />
              <div className="arkai-capabilities__visual-core">
                <span>{content.coreLabel}</span>
                <strong>06</strong>
                <span>{content.coreName}</span>
                <small>{content.coreNote}</small>
              </div>
            </div>
            <div className="arkai-capabilities__visual-footer">
              <span>{content.canvasChannels}</span>
              <span>{content.canvasSystems}</span>
              <span>{content.canvasOperation}</span>
            </div>
          </div>

          <div className="arkai-capabilities__services">
            <p className="arkai-capabilities__list-label">{content.servicesLabel}</p>
            {content.services.map((service, index) => {
              const ServiceIcon = serviceIcons[service.id]
              return (
                <article className="arkai-capabilities__service" key={service.id}>
                  <span className="arkai-capabilities__service-number">0{index + 1}</span>
                  <div className="arkai-capabilities__service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <span className="arkai-capabilities__service-icon" aria-hidden="true">
                    <ServiceIcon width={21} height={21} />
                  </span>
                </article>
              )
            })}
          </div>
        </div>

        <div className="arkai-capabilities__industries" id="industries">
          <div className="arkai-capabilities__industries-heading">
            <div>
              <span className="arkai-capabilities__eyebrow">{content.industriesEyebrow}</span>
              <h2>{content.industriesTitle}</h2>
            </div>
            <p>{content.industriesIntroduction}</p>
          </div>

          <div className="arkai-capabilities__industry-picker" role="group" aria-label={content.industriesEyebrow}>
            {content.industries.map((item) => {
              const SectorIcon = industryIcons[item.id]
              return (
                <button
                  className="arkai-capabilities__industry-button"
                  type="button"
                  key={item.id}
                  aria-pressed={item.id === activeIndustry}
                  onClick={() => setActiveIndustry(item.id)}
                >
                  <SectorIcon width={17} height={17} aria-hidden="true" />
                  {item.name}
                </button>
              )
            })}
          </div>

          <div className="arkai-capabilities__industry-panel" aria-live="polite">
            <div className="arkai-capabilities__industry-story">
              <span className="arkai-capabilities__panel-index">{content.industriesNote}</span>
              <div className="arkai-capabilities__industry-mark" aria-hidden="true">
                <IndustryIcon width={31} height={31} />
              </div>
              <p className="arkai-capabilities__panel-name">{industry.name}</p>
              <h3>{industry.heading}</h3>
              <p className="arkai-capabilities__panel-description">{industry.description}</p>
              <a href="/diagnostico" className="arkai-capabilities__industry-link">
                {content.cta} <IconArrow width={17} height={17} aria-hidden="true" />
              </a>
            </div>
            <div className="arkai-capabilities__journey" aria-label={content.journeyLabel}>
              <span className="arkai-capabilities__journey-title">{content.journeyLabel}</span>
              {industry.journey.map((step, index) => (
                <div className="arkai-capabilities__journey-step" key={`${industry.id}-${index}`}>
                  <span>0{index + 1}</span>
                  <strong>{step}</strong>
                  <i aria-hidden="true" />
                </div>
              ))}
              <div className="arkai-capabilities__journey-end" aria-hidden="true">ARKAI / 06</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
