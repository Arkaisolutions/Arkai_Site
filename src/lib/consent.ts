const STORAGE_KEY = 'arkai_analytics_consent'

export type AnalyticsConsent = 'accepted' | 'rejected' | null

export function readAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === 'undefined') return null
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' || value === 'rejected' ? value : null
  } catch {
    return null
  }
}

export function saveAnalyticsConsent(choice: Exclude<AnalyticsConsent, null>): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Se o armazenamento estiver indisponível, o Pixel continua inativo.
  }
}

export function clearAnalyticsConsent(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // O visitante poderá ajustar a preferência ao recarregar a página.
  }
}
