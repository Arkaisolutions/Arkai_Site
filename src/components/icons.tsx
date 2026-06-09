import type { ReactElement, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (p: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...p,
})

export const IconAgent = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="8" width="16" height="12" rx="3" />
    <path d="M12 8V4M9 4h6" />
    <circle cx="9" cy="13" r="1" />
    <circle cx="15" cy="13" r="1" />
    <path d="M9 17h6" />
  </svg>
)

export const IconSupport = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-3.8-.8L3 21l1.9-5.7A8.38 8.38 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" />
  </svg>
)

export const IconWorkflow = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="6" height="6" rx="1.5" />
    <rect x="15" y="15" width="6" height="6" rx="1.5" />
    <path d="M9 6h6a3 3 0 0 1 3 3v6" />
  </svg>
)

export const IconSaas = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
    <path d="M3 7l9 5 9-5M12 12v10" />
  </svg>
)

export const IconTraffic = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M21 7v6M21 7h-6" />
  </svg>
)

export const IconData = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 13h4v7H3zM10 7h4v13h-4zM17 10h4v10h-4z" />
  </svg>
)

export const IconArrow = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const IconGlobe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
)

export const IconMenu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

export const IconClose = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

export const IconSpark = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
)

export const IconBolt = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
  </svg>
)

export const serviceIcons: Record<string, (p: IconProps) => ReactElement> = {
  agent: IconAgent,
  support: IconSupport,
  workflow: IconWorkflow,
  saas: IconSaas,
  traffic: IconTraffic,
  data: IconData,
}

/* ====================== Industry icons ====================== */
export const IconSolar = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
  </svg>
)

export const IconCar = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 13l2-5h14l2 5M3 13v5h3v-2h12v2h3v-5M3 13h18" />
    <circle cx="7" cy="16" r="1" />
    <circle cx="17" cy="16" r="1" />
  </svg>
)

export const IconHotel = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 21V7l9-4 9 4v14" />
    <path d="M3 21h18M9 12h.01M15 12h.01M9 16h.01M15 16h.01M11 21v-4h2v4" />
  </svg>
)

export const IconBuilding = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 21V5l8-2 8 2v16" />
    <path d="M4 21h16M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" />
  </svg>
)

export const IconShop = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 8h18l-1 4H4L3 8Z" />
    <path d="M5 12v8h14v-8M9 20v-4h6v4" />
  </svg>
)

export const IconAgro = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 22V8" />
    <path d="M12 12c-3 0-6-1-6-5 4 0 6 2 6 5Z" />
    <path d="M12 12c3 0 6-1 6-5-4 0-6 2-6 5Z" />
    <path d="M4 22h16" />
  </svg>
)

export const IconHealth = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
    <path d="M9 12h6M12 9v6" />
  </svg>
)

export const IconFinance = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 17l5-5 4 4 8-8" />
    <path d="M14 8h6v6" />
    <path d="M3 21h18" />
  </svg>
)

export const IconEducation = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 9l10-5 10 5-10 5L2 9Z" />
    <path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    <path d="M22 9v6" />
  </svg>
)

export const IconConstruction = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 18h18M4 18V8h16v10" />
    <path d="M8 18v-6h8v6M10 12v-2h4v2" />
    <path d="M12 4v4" />
  </svg>
)

export const IconWhatsApp = (p: IconProps) => (
  <svg
    width={p.width || 24}
    height={p.height || 24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...p}
  >
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01ZM12.04 20.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.21 8.21 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.69 8.23-8.21 8.23Zm4.52-6.16c-.25-.12-1.46-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22a7.5 7.5 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.06s.88 2.39 1 2.56c.12.17 1.73 2.64 4.2 3.7.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
  </svg>
)

export const IconHomeServices = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 12 12 4l9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M14 14l4 4M18 14l-4 4" />
  </svg>
)

export const IconInsurance = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

export const IconLegal = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v18M5 21h14M7 8h10" />
    <path d="M7 8l-3 6c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5L7 8Z" />
    <path d="M17 8l-3 6c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5L17 8Z" />
  </svg>
)

export const IconCloud = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 18a5 5 0 1 1 1-9.9 6 6 0 0 1 11.4 2A4 4 0 0 1 18 18H7Z" />
    <path d="M10 13l2 2 4-4" />
  </svg>
)

export const IconFitness = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12" />
  </svg>
)

export const IconCalendar = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
)

export const IconDocs = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6M8 13h8M8 17h5" />
  </svg>
)

/** Map of all icons usable in the agents grid. */
export const agentIcons: Record<string, (p: IconProps) => ReactElement> = {
  agent: IconAgent,
  check: IconCheck,
  workflow: IconWorkflow,
  support: IconSupport,
  calendar: IconCalendar,
  finance: IconFinance,
  docs: IconDocs,
  data: IconData,
  spark: IconSpark,
  saas: IconCloud,
}

export const industryIcons: Record<string, (p: IconProps) => ReactElement> = {
  realestate: IconBuilding,
  health: IconHealth,
  solar: IconSolar,
  automotive: IconCar,
  homeservices: IconHomeServices,
  insurance: IconInsurance,
  legal: IconLegal,
  finance: IconFinance,
  ecommerce: IconShop,
  saas: IconCloud,
  hospitality: IconHotel,
  fitness: IconFitness,
  // legacy (Also serving)
  education: IconEducation,
  construction: IconConstruction,
  agro: IconAgro,
}
