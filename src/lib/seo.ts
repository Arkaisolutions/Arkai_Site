/**
 * SEO helper — updates document title + meta tags per route (SPA).
 * Centraliza title/description/canonical/OG para cada página.
 *
 * Nota: SPA renderiza no cliente. O Google renderiza JS, mas para
 * indexação mais rápida e robusta o ideal futuro é prerender/SSG.
 * Por ora, isto + sitemap + robots + Schema cobre o essencial.
 */

const SITE = 'https://www.arkaisolutions.com.br'

interface SeoInput {
  title: string
  description: string
  /** Path canônico (sem domínio). Default: pathname atual. */
  canonicalPath?: string
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function setSeo({ title, description, canonicalPath }: SeoInput) {
  if (typeof document === 'undefined') return

  document.title = title

  upsertMeta('meta[name="description"]', 'name', 'description', description)
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', title)
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

  const path = canonicalPath ?? (window.location.pathname.replace(/\/+$/, '') || '/')
  const canonical = path === '/' ? `${SITE}/` : `${SITE}${path}`
  upsertCanonical(canonical)
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
}
