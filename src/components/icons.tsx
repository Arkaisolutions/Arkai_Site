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

export const industryIcons: Record<string, (p: IconProps) => ReactElement> = {
  solar: IconSolar,
  automotive: IconCar,
  hospitality: IconHotel,
  realestate: IconBuilding,
  ecommerce: IconShop,
  agro: IconAgro,
}
