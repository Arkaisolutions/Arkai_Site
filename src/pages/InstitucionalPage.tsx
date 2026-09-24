import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AuroraBg from '../components/AuroraBg'
import CookieBanner from '../components/CookieBanner'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import LeadForm from '../components/LeadForm'
import Reveal from '../components/Reveal'
import SiteFooter from '../components/SiteFooter'
import { agentIcons, IconArrow, IconClose, IconGlobe, IconMenu } from '../components/icons'
import { captureAttribution, trackPageView } from '../lib/track'
import { setSeo } from '../lib/seo'

interface Card       { title: string; text: string }
interface AgentItem  { icon: string; name: string; faz: string; muda: string }
interface Step       { title: string; text: string }
interface Bloco      { nome: string; legenda: string }
interface ClienteCard { segmento: string; nome: string; travava: string; acontecer: string }
interface QA         { q: string; a: string }

/**
 * Página institucional ("/") do briefing de reescrita.
 * Público: indicação, busca, quem recebeu proposta. Sem preço,
 * sem contador de vagas, sem escassez. A oferta mora em /vagas.
 */
export default function InstitucionalPage() {
  const { t } = useTranslation()

  useEffect(() => {
    setSeo({ title: t('inst.metaTitle'), description: t('inst.metaDesc'), canonicalPath: '/' })
    captureAttribution()
    trackPageView('/', t('inst.metaTitle'))
  }, [t])

  const cards    = t('inst.problema.cards', { returnObjects: true }) as Card[]
  const agents   = t('inst.fazemos.agents', { returnObjects: true }) as AgentItem[]
  const steps    = t('inst.implantacao.steps', { returnObjects: true }) as Step[]
  const blocos   = t('inst.rodando.blocos', { returnObjects: true }) as Bloco[]
  const clientes = t('inst.clientes.cards', { returnObjects: true }) as ClienteCard[]
  const faqs     = t('inst.perguntas.items', { returnObjects: true }) as QA[]

  return (
    <>
      <InstNav />

      <main className="relative">
        {/* ============ 1 · ABERTURA ============ */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36">
          <AuroraBg />
          <div className="container-content relative z-10 text-center">
            <Reveal>
              <span className="eyebrow">{t('inst.hero.eyebrow')}</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                {t('inst.hero.title')}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {t('inst.hero.subtitle')}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#contato" className="btn-primary text-base">
                  {t('inst.hero.ctaPrimary')}
                  <IconArrow width={16} height={16} />
                </a>
                <a href="#contato" className="btn-ghost">
                  {t('inst.hero.ctaSecondary')}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 2 · O PROBLEMA ============ */}
        <section id="problema" className="relative scroll-mt-24 py-20">
          <div className="container-content">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="section-title">{t('inst.problema.title')}</h2>
              <p className="mt-4 leading-relaxed text-muted">{t('inst.problema.subtitle')}</p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((c, i) => (
                <Reveal key={c.title} delay={i * 60}>
                  <article className="h-full rounded-2xl border border-line bg-surface p-6">
                    <h3 className="text-base font-bold">{c.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{c.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 3 · O QUE A ARKAI FAZ ============ */}
        <section id="fazemos" className="relative scroll-mt-24 border-y border-line bg-surface/40 py-20">
          <div className="container-content">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="section-title">{t('inst.fazemos.title')}</h2>
              <p className="mt-4 leading-relaxed text-muted">{t('inst.fazemos.subtitle')}</p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((a, i) => {
                const Icon = agentIcons[a.icon] ?? agentIcons.agent
                return (
                  <Reveal key={a.name} delay={i * 60}>
                    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                        <Icon width={20} height={20} />
                      </span>
                      <h3 className="mt-4 text-lg font-bold">{a.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        <span className="font-semibold uppercase tracking-wider text-accent-2 text-[10px]">
                          {t('inst.fazemos.fazLabel')}:
                        </span>{' '}
                        {a.faz}
                      </p>
                      <p className="mt-3 flex-1 border-t border-line pt-3 text-sm leading-relaxed text-ink/85">
                        <span className="font-semibold uppercase tracking-wider text-accent-2 text-[10px]">
                          {t('inst.fazemos.mudaLabel')}:
                        </span>{' '}
                        {a.muda}
                      </p>
                    </article>
                  </Reveal>
                )
              })}
            </div>
            <Reveal delay={200}>
              <p className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 px-6 py-5 text-center text-sm font-semibold leading-relaxed text-ink sm:text-base">
                {t('inst.fazemos.faixa')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 4 · IMPLANTAÇÃO ============ */}
        <section className="relative py-20">
          <div className="container-content max-w-5xl">
            <Reveal className="text-center">
              <h2 className="section-title">{t('inst.implantacao.title')}</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 70}>
                  <div className="h-full rounded-2xl border border-line bg-surface p-6">
                    <span className="text-3xl font-black text-line">0{i + 1}</span>
                    <h3 className="mt-3 text-base font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={280}>
              <p className="mt-8 text-center text-sm italic leading-relaxed text-muted sm:text-base">
                {t('inst.implantacao.faixa')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 5 · VER RODANDO ============ */}
        <section id="rodando" className="relative scroll-mt-24 border-y border-line bg-surface/40 py-20">
          <div className="container-content">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="section-title">{t('inst.rodando.title')}</h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {blocos.map((b, i) => (
                <Reveal key={b.nome} delay={i * 70}>
                  <figure>
                    <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-line bg-surface">
                      <span className="rounded-full border border-line bg-surface-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                        {t('inst.rodando.pendente')}
                      </span>
                    </div>
                    <figcaption className="mt-3">
                      <p className="text-sm font-bold">{b.nome}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{b.legenda}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Reveal delay={260}>
              <p className="mt-8 text-center text-xs text-muted">{t('inst.rodando.nota')}</p>
            </Reveal>
          </div>
        </section>

        {/* ============ 6 · CLIENTES ============ */}
        <section id="clientes" className="relative scroll-mt-24 py-20">
          <div className="container-content">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="section-title">{t('inst.clientes.title')}</h2>
              <p className="mt-4 leading-relaxed text-muted">{t('inst.clientes.subtitle')}</p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {clientes.map((c, i) => (
                <Reveal key={i} delay={i * 60}>
                  <article className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-6 text-sm">
                    <p>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-accent-2">
                        {t('inst.clientes.segmentoLabel')}
                      </span>
                      <span className="text-muted">{c.segmento}</span>
                    </p>
                    <p>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-accent-2">
                        {t('inst.clientes.nomeLabel')}
                      </span>
                      <span className="font-bold text-ink">{c.nome}</span>
                    </p>
                    <p>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-accent-2">
                        {t('inst.clientes.travavaLabel')}
                      </span>
                      <span className="text-muted">{c.travava}</span>
                    </p>
                    <p>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-accent-2">
                        {t('inst.clientes.acontecerLabel')}
                      </span>
                      <span className="text-muted">{c.acontecer}</span>
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 7 · PERGUNTAS ============ */}
        <section id="perguntas" className="relative scroll-mt-24 border-y border-line bg-surface/40 py-20">
          <div className="container-content max-w-3xl">
            <Reveal>
              <h2 className="section-title text-center">{t('inst.perguntas.title')}</h2>
            </Reveal>
            <div className="mt-10 flex flex-col gap-3">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 40}>
                  <details className="group rounded-xl border border-line bg-surface p-5 open:border-accent/50">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold sm:text-base">
                      {f.q}
                      <span className="text-accent-2 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 8 · FORMULÁRIO ============ */}
        <section id="contato" className="relative scroll-mt-24 py-20">
          <div className="container-content max-w-3xl">
            <Reveal>
              <LeadForm origem="institucional" />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
      <CookieBanner />
    </>
  )
}

/* ---------------- Menu da institucional ---------------- */

function InstNav() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLang = () => {
    const cur = i18n.language
    if (cur.startsWith('pt')) i18n.changeLanguage('en')
    else if (cur.startsWith('en')) i18n.changeLanguage('es')
    else i18n.changeLanguage('pt')
  }
  const lang = i18n.language.startsWith('pt') ? 'PT' : i18n.language.startsWith('es') ? 'ES' : 'EN'

  const links = [
    { href: '#problema', key: 'inst.nav.problema' },
    { href: '#fazemos', key: 'inst.nav.fazemos' },
    { href: '#rodando', key: 'inst.nav.rodando' },
    { href: '#clientes', key: 'inst.nav.clientes' },
    { href: '#perguntas', key: 'inst.nav.perguntas' },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-content flex h-[72px] items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-base font-black text-white">
            A
          </span>
          <span className="text-lg">
            Arkai<span className="text-muted"> Solutions</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted transition-colors hover:text-ink">
              {t(l.key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-ink"
            aria-label="Toggle language"
          >
            <IconGlobe width={15} height={15} />
            {lang}
          </button>
          <a href="#contato" className="btn-primary hidden sm:inline-flex">
            {t('inst.nav.contato')}
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <IconClose width={18} height={18} /> : <IconMenu width={18} height={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg lg:hidden">
          <div className="container-content flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted hover:bg-surface hover:text-ink"
              >
                {t(l.key)}
              </a>
            ))}
            <a href="#contato" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              {t('inst.nav.contato')}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
