import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import './ArkaiProofFaq.css'

interface Company {
  name: string
  image: string
  mediaVariant?: 'hotel' | 'solar' | 'principal'
}

type Locale = 'pt' | 'en' | 'es'

interface CompanyMeta {
  segment: string
  relationship: string
  imageAlt: string
}

interface SectionCopy {
  casesEyebrow: string
  casesTitle: string
  casesDescription: string
  carouselLabel: string
  carouselRole: string
  slideRole: string
  positionOf: string
  previous: string
  next: string
  chooseCompany: string
  showCompany: string
  play: string
  pause: string
  imageNote: string
  faqEyebrow: string
  faqTitle: string
  companies: CompanyMeta[]
  faqItems: ArkaiFaqItem[]
}

export interface ArkaiFaqItem {
  question: string
  answer: string
}

const companies: Company[] = [
  {
    name: 'ClickParts',
    image: '/assets/clientes/clickparts-captura.png',
  },
  {
    name: 'Hotel Palace',
    image: '/assets/clientes/hotel-palace-captura.png',
    mediaVariant: 'hotel',
  },
  {
    name: 'Futuro Solar',
    image: '/assets/clientes/futuro-solar-marca-2026-09-25.png',
    mediaVariant: 'solar',
  },
  {
    name: 'Principal Automóveis',
    image: '/assets/clientes/principal-automoveis-captura.png',
    mediaVariant: 'principal',
  },
]

const copy: Record<Locale, SectionCopy> = {
  pt: {
    casesEyebrow: 'Projetos e relações reais',
    casesTitle: 'Empresas e operações com projetos Arkai',
    casesDescription:
      'Estas empresas já receberam serviços com agentes de IA da Arkai. Projetos e resultados específicos são apresentados somente quando aprovados para divulgação.',
    carouselLabel: 'Empresas e operações com projetos Arkai',
    carouselRole: 'carrossel',
    slideRole: 'slide',
    positionOf: 'de',
    previous: 'Mostrar empresa anterior',
    next: 'Mostrar próxima empresa',
    chooseCompany: 'Escolher empresa',
    showCompany: 'Mostrar',
    play: 'Reproduzir',
    pause: 'Pausar',
    imageNote:
      'A arte da Futuro Solar foi recriada a partir do símbolo enviado como referência.',
    faqEyebrow: 'Perguntas frequentes',
    faqTitle: 'Respostas claras antes de começar',
    companies: [
      {
        segment: 'Varejo / peças',
        relationship: 'Agentes de IA da Arkai · melhorias nos resultados',
        imageAlt: 'Captura enviada da marca ClickParts',
      },
      {
        segment: 'Hotelaria / turismo',
        relationship: 'Agentes de IA da Arkai · melhorias nos resultados',
        imageAlt: 'Captura enviada da marca Hotel Palace',
      },
      {
        segment: 'Energia solar',
        relationship: 'Agentes de IA da Arkai · melhorias nos resultados',
        imageAlt: 'Símbolo de sol e ondas com o nome Futuro Solar',
      },
      {
        segment: 'Veículos / automóveis',
        relationship: 'Atendimento automatizado com agentes da Arkai',
        imageAlt: 'Logo da Principal Automóveis enviada como referência',
      },
    ],
    faqItems: [
      {
        question: 'O que são os seis agentes de IA?',
        answer:
          'São seis frentes de trabalho: Atendimento, Qualificação, Marketing e tráfego, Gestão comercial, Leitura de números e Acompanhamento. A configuração de cada agente depende do diagnóstico da operação.',
      },
      {
        question: 'A Arkai também cria sites e plataformas?',
        answer:
          'Sim. Também desenvolvemos sites, softwares e plataformas. Eles podem complementar os agentes de IA ou atender a uma necessidade específica do projeto.',
      },
      {
        question: 'Vocês atendem minha área de atuação?',
        answer:
          'Trabalhamos com necessidades de saúde e bem-estar, imobiliária, varejo, viagens e turismo, entre outras áreas. Conversamos sobre cada operação para definir o que faz sentido implementar.',
      },
      {
        question: 'Como começa um projeto?',
        answer:
          'Primeiro entendemos a operação e suas prioridades. Em seguida, apresentamos uma proposta com escopo, integrações e etapas de implantação para avaliação antes do início.',
      },
      {
        question: 'Quem controla os dados da minha empresa?',
        answer:
          'Antes da implantação, definimos por escrito onde os dados ficam, quem pode acessá-los e como solicitar exportação ou exclusão, conforme o contrato e a Política de Privacidade.',
      },
      {
        question: 'Posso acompanhar as conversas dos agentes?',
        answer:
          'O acesso aos registros e ao acompanhamento é configurado conforme a operação e as permissões acordadas. Na proposta, mostramos o que sua equipe poderá visualizar e ajustar.',
      },
      {
        question: 'E se eu quiser encerrar o serviço?',
        answer:
          'As condições de cancelamento, entrega dos dados e revogação de acessos são apresentadas antes da contratação e formalizadas no contrato.',
      },
      {
        question: 'Preciso trocar meu sistema atual?',
        answer:
          'Não necessariamente. Mapeamos as ferramentas que você já usa e avaliamos as integrações possíveis. Se alguma conexão não for viável, explicamos as alternativas antes de implementar.',
      },
    ],
  },
  en: {
    casesEyebrow: 'Real projects and relationships',
    casesTitle: 'Companies and operations connected to Arkai projects',
    casesDescription:
      'These companies have received Arkai AI agent services. Specific projects and results are shared only when approved for publication.',
    carouselLabel: 'Companies and operations connected to Arkai projects',
    carouselRole: 'carousel',
    slideRole: 'slide',
    positionOf: 'of',
    previous: 'Show previous company',
    next: 'Show next company',
    chooseCompany: 'Choose a company',
    showCompany: 'Show',
    play: 'Play',
    pause: 'Pause',
    imageNote:
      'The Futuro Solar artwork was recreated from the symbol supplied as a reference.',
    faqEyebrow: 'Frequently asked questions',
    faqTitle: 'Clear answers before we begin',
    companies: [
      {
        segment: 'Retail / parts',
        relationship: 'Arkai AI agents · improved results',
        imageAlt: 'Supplied capture of the ClickParts brand',
      },
      {
        segment: 'Hospitality / travel',
        relationship: 'Arkai AI agents · improved results',
        imageAlt: 'Supplied capture of the Hotel Palace brand',
      },
      {
        segment: 'Solar energy',
        relationship: 'Arkai AI agents · improved results',
        imageAlt: 'Sun and waves symbol with the Futuro Solar name',
      },
      {
        segment: 'Vehicles / automotive',
        relationship: 'Automated customer service with Arkai agents',
        imageAlt: 'Supplied Principal Automóveis logo',
      },
    ],
    faqItems: [
      {
        question: 'What are the six AI agents?',
        answer:
          'They cover six areas: Customer service, Qualification, Marketing and traffic, Sales management, Performance insights, and Follow-up. Each agent is configured after reviewing the operation.',
      },
      {
        question: 'Does Arkai also build websites and platforms?',
        answer:
          'Yes. We also develop websites, software, and platforms. They can complement the AI agents or address a specific project need.',
      },
      {
        question: 'Do you work in my industry?',
        answer:
          'We work with needs in health and wellness, real estate, retail, travel and tourism, and other sectors. We review each operation to decide what makes sense to implement.',
      },
      {
        question: 'How does a project start?',
        answer:
          'We first learn about the operation and its priorities. Then we present a proposal covering scope, integrations, and implementation stages for review before work begins.',
      },
      {
        question: 'Who controls my company’s data?',
        answer:
          'Before implementation, we define in writing where data is stored, who can access it, and how to request export or deletion, according to the contract and Privacy Policy.',
      },
      {
        question: 'Can I review the agents’ conversations?',
        answer:
          'Access to records and monitoring is configured for the operation and the agreed permissions. The proposal explains what your team will be able to view and adjust.',
      },
      {
        question: 'What if I want to end the service?',
        answer:
          'Cancellation terms, data handover, and access revocation are presented before contracting and formalized in the agreement.',
      },
      {
        question: 'Do I need to replace my current system?',
        answer:
          'Not necessarily. We review the tools you already use and assess possible integrations. If a connection is not feasible, we explain the alternatives before implementation.',
      },
    ],
  },
  es: {
    casesEyebrow: 'Proyectos y relaciones reales',
    casesTitle: 'Empresas y operaciones vinculadas a proyectos Arkai',
    casesDescription:
      'Estas empresas ya recibieron servicios con agentes de IA de Arkai. Los proyectos y resultados específicos se comparten solo cuando se aprueba su publicación.',
    carouselLabel: 'Empresas y operaciones vinculadas a proyectos Arkai',
    carouselRole: 'carrusel',
    slideRole: 'diapositiva',
    positionOf: 'de',
    previous: 'Mostrar empresa anterior',
    next: 'Mostrar siguiente empresa',
    chooseCompany: 'Elegir empresa',
    showCompany: 'Mostrar',
    play: 'Reproducir',
    pause: 'Pausar',
    imageNote:
      'La imagen de Futuro Solar se recreó a partir del símbolo enviado como referencia.',
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Respuestas claras antes de comenzar',
    companies: [
      {
        segment: 'Comercio / repuestos',
        relationship: 'Agentes de IA de Arkai · mejores resultados',
        imageAlt: 'Captura proporcionada de la marca ClickParts',
      },
      {
        segment: 'Hotelería / turismo',
        relationship: 'Agentes de IA de Arkai · mejores resultados',
        imageAlt: 'Captura proporcionada de la marca Hotel Palace',
      },
      {
        segment: 'Energía solar',
        relationship: 'Agentes de IA de Arkai · mejores resultados',
        imageAlt: 'Símbolo de sol y ondas con el nombre Futuro Solar',
      },
      {
        segment: 'Vehículos / automóviles',
        relationship: 'Atención automatizada con agentes de Arkai',
        imageAlt: 'Logotipo de Principal Automóveis proporcionado como referencia',
      },
    ],
    faqItems: [
      {
        question: '¿Qué son los seis agentes de IA?',
        answer:
          'Son seis áreas de trabajo: Atención, Calificación, Marketing y tráfico, Gestión comercial, Análisis de resultados y Seguimiento. Cada agente se configura después de analizar la operación.',
      },
      {
        question: '¿Arkai también crea sitios y plataformas?',
        answer:
          'Sí. También desarrollamos sitios web, software y plataformas. Pueden complementar a los agentes de IA o responder a una necesidad específica del proyecto.',
      },
      {
        question: '¿Trabajan en mi sector?',
        answer:
          'Trabajamos con necesidades de salud y bienestar, inmobiliarias, comercio, viajes y turismo, entre otros sectores. Evaluamos cada operación para definir qué conviene implementar.',
      },
      {
        question: '¿Cómo comienza un proyecto?',
        answer:
          'Primero conocemos la operación y sus prioridades. Después presentamos una propuesta con alcance, integraciones y etapas de implementación para su evaluación antes de comenzar.',
      },
      {
        question: '¿Quién controla los datos de mi empresa?',
        answer:
          'Antes de la implementación, definimos por escrito dónde se almacenan los datos, quién puede acceder a ellos y cómo solicitar su exportación o eliminación, según el contrato y la Política de Privacidad.',
      },
      {
        question: '¿Puedo revisar las conversaciones de los agentes?',
        answer:
          'El acceso a los registros y al seguimiento se configura según la operación y los permisos acordados. La propuesta explica qué podrá ver y ajustar su equipo.',
      },
      {
        question: '¿Qué pasa si quiero cancelar el servicio?',
        answer:
          'Las condiciones de cancelación, entrega de datos y revocación de accesos se presentan antes de contratar y se formalizan en el contrato.',
      },
      {
        question: '¿Necesito cambiar mi sistema actual?',
        answer:
          'No necesariamente. Revisamos las herramientas que ya utiliza y evaluamos las integraciones posibles. Si alguna conexión no es viable, explicamos las alternativas antes de implementar.',
      },
    ],
  },
}

function localeFor(language: string): Locale {
  if (language.startsWith('en')) return 'en'
  if (language.startsWith('es')) return 'es'
  return 'pt'
}

function getPosition(index: number, activeIndex: number): 'before' | 'active' | 'after' | 'back' {
  const distance = (index - activeIndex + companies.length) % companies.length
  if (distance === 0) return 'active'
  if (distance === 1) return 'after'
  if (distance === companies.length - 1) return 'before'
  return 'back'
}

export function ArkaiCases() {
  const { i18n } = useTranslation()
  const text = copy[localeFor(i18n.resolvedLanguage || i18n.language)]
  const [activeIndex, setActiveIndex] = useState(1)
  const [focused, setFocused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [visible, setVisible] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window),
  )
  const [pageVisible, setPageVisible] = useState(true)
  const stageRef = useRef<HTMLDivElement>(null)
  const pointerStart = useRef<{ id: number; x: number; y: number } | null>(null)
  const titleId = useId()

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(motionPreference.matches)
    updateMotion()
    motionPreference.addEventListener('change', updateMotion)
    return () => motionPreference.removeEventListener('change', updateMotion)
  }, [])

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible')
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    const element = stageRef.current
    if (!element) return
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const autoplaying = visible && pageVisible && !reducedMotion && !focused && !dragging

  useEffect(() => {
    if (!autoplaying) return
    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % companies.length)
    }, 3500)
    return () => window.clearTimeout(timeout)
  }, [activeIndex, autoplaying])

  const showPrevious = () =>
    setActiveIndex((current) => (current - 1 + companies.length) % companies.length)
  const showNext = () => setActiveIndex((current) => (current + 1) % companies.length)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPrevious()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      showNext()
    } else if (event.key === 'Home') {
      event.preventDefault()
      setActiveIndex(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setActiveIndex(companies.length - 1)
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    pointerStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
    setDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current
    if (!start || start.id !== event.pointerId) return
    pointerStart.current = null
    setDragging(false)
    const deltaX = event.clientX - start.x
    const deltaY = event.clientY - start.y
    if (Math.abs(deltaX) < 35 || Math.abs(deltaX) <= Math.abs(deltaY)) return
    if (deltaX > 0) showPrevious()
    else showNext()
  }

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current?.id !== event.pointerId) return
    pointerStart.current = null
    setDragging(false)
  }

  return (
    <section id="cases" className="arkai-cases" aria-labelledby={titleId}>
      <div className="container-content">
        <div className="arkai-cases__heading">
          <span className="arkai-proof__eyebrow">{text.casesEyebrow}</span>
          <h2 id={titleId}>{text.casesTitle}</h2>
          <p>{text.casesDescription}</p>
        </div>

        <div
          ref={stageRef}
          className="arkai-cases__stage"
          role="region"
          aria-roledescription={text.carouselRole}
          aria-label={text.carouselLabel}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onFocusCapture={(event) => setFocused(event.target.matches(':focus-visible'))}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div className="arkai-cases__slides">
            {companies.map((company, index) => {
              const meta = text.companies[index]
              const position = getPosition(index, activeIndex)
              return (
                <article
                  key={company.name}
                  className={`arkai-cases__card arkai-cases__card--${position}`}
                  role="group"
                  aria-roledescription={text.slideRole}
                  aria-label={`${index + 1} ${text.positionOf} ${companies.length}: ${company.name}`}
                  aria-current={position === 'active' ? 'true' : undefined}
                >
                  <div className={`arkai-cases__media${company.mediaVariant ? ` arkai-cases__media--${company.mediaVariant}` : ''}`}>
                    <img src={company.image} alt={meta.imageAlt} loading="lazy" draggable={false} />
                  </div>
                </article>
              )
            })}
          </div>

        </div>
        <div className="arkai-cases__details" aria-live={autoplaying ? 'off' : 'polite'} aria-atomic="true">
          <span className="arkai-cases__count">{String(activeIndex + 1).padStart(2, '0')} / {String(companies.length).padStart(2, '0')}</span>
          <h3>{companies[activeIndex].name}</h3>
          <p className="arkai-cases__segment">{text.companies[activeIndex].segment}</p>
          <p className="arkai-cases__relationship">{text.companies[activeIndex].relationship}</p>
        </div>
        <p className="arkai-cases__note">{text.imageNote}</p>
      </div>
    </section>
  )
}

export function ArkaiFAQ({ items }: { items?: ArkaiFaqItem[] }) {
  const { i18n } = useTranslation()
  const text = copy[localeFor(i18n.resolvedLanguage || i18n.language)]
  const faqItems = items ?? text.faqItems
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const titleId = useId()
  const baseId = useId().replaceAll(':', '')

  return (
    <section id="faq" className="arkai-faq" aria-labelledby={titleId}>
      <div className="container-content">
        <div className="arkai-faq__heading">
          <span className="arkai-proof__eyebrow">{text.faqEyebrow}</span>
          <h2 id={titleId}>{text.faqTitle}</h2>
        </div>
        <div className="arkai-faq__grid">
          {faqItems.map((item, index) => {
            const open = openIndex === index
            const panelId = `arkai-faq-panel-${baseId}-${index}`
            return (
              <article key={item.question} className={`arkai-faq__item${open ? ' arkai-faq__item--open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="arkai-faq__toggle" aria-hidden="true">{open ? '−' : '+'}</span>
                  </button>
                </h3>
                <div id={panelId} className="arkai-faq__answer" hidden={!open}>
                  <p>{item.answer}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function ArkaiProofFaq() {
  return (
    <>
      <ArkaiCases />
      <ArkaiFAQ />
    </>
  )
}
