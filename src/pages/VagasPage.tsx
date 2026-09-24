import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AuroraBg from '../components/AuroraBg'
import CookieBanner from '../components/CookieBanner'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import LeadForm from '../components/LeadForm'
import Reveal from '../components/Reveal'
import SiteFooter from '../components/SiteFooter'
import { agentIcons, IconArrow, IconBolt, IconCheck } from '../components/icons'
import { config } from '../config'
import { captureAttribution, trackEvent, trackPageView } from '../lib/track'
import { setSeo } from '../lib/seo'

interface AgentItem { icon: string; name: string; faz: string; muda: string }
interface Step      { title: string; text: string }

/**
 * /vagas — landing de campanha do briefing.
 * Sem menu: uma coluna, rolagem curta, botão repetido três vezes.
 * A equipe de seis agentes reusa os textos da institucional (inst.fazemos).
 */
export default function VagasPage() {
  const { t } = useTranslation()

  useEffect(() => {
    setSeo({ title: t('vagas.metaTitle'), description: t('vagas.metaDesc'), canonicalPath: '/vagas' })
    captureAttribution()
    trackPageView('/vagas', t('vagas.metaTitle'))
    trackEvent('offer_view', { path: '/vagas', slots_remaining: config.earlyAccess.remaining })
  }, [t])

  const { remaining, total } = config.earlyAccess
  const agents     = t('inst.fazemos.agents', { returnObjects: true }) as AgentItem[]
  const steps      = t('inst.implantacao.steps', { returnObjects: true }) as Step[]
  const entra      = t('vagas.entra.items', { returnObjects: true }) as string[]
  const naoPrecisa = t('vagas.naoPrecisa.items', { returnObjects: true }) as string[]
  const headers    = t('vagas.comparacao.headers', { returnObjects: true }) as string[]
  const rows       = t('vagas.comparacao.rows', { returnObjects: true }) as string[][]

  return (
    <>
      {/* Contador de vagas — atualizado manualmente em config.earlyAccess */}
      <div className="fixed inset-x-0 top-0 z-[60] bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-center text-[12.5px] font-bold uppercase tracking-wide text-white shadow-md">
        {t('vagas.contador', { remaining, total })}
      </div>
      <div className="h-8" />

      <main className="relative">
        {/* ============ 1 · ABERTURA ============ */}
        <section className="relative overflow-hidden pt-24 pb-20 sm:pt-28">
          <AuroraBg />
          <div className="container-content relative z-10 text-center">
            <Reveal>
              <span className="eyebrow">
                <IconBolt width={13} height={13} className="text-accent" />
                {t('vagas.eyebrow')}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">{t('vagas.hero.title1')}</span>
                <span className="block">{t('vagas.hero.title1b')}</span>
                <span className="gradient-text block">{t('vagas.hero.title2')}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {t('vagas.hero.subtitle')}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9">
                <a href="#contato" className="btn-primary text-base">
                  {t('vagas.hero.cta')}
                  <IconArrow width={16} height={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 2 · O PROBLEMA ============ */}
        <section className="relative py-16">
          <div className="container-content max-w-3xl text-center">
            <Reveal>
              <h2 className="section-title">{t('vagas.problema.title')}</h2>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                {t('vagas.problema.body')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 3 · A EQUIPE (mesmos agentes da institucional) ============ */}
        <section className="relative border-y border-line bg-surface/40 py-20">
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
                      <p className="mt-2 text-sm leading-relaxed text-muted">{a.faz}</p>
                      <p className="mt-3 flex-1 border-t border-line pt-3 text-sm leading-relaxed text-ink/85">
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

        {/* ============ 4 · O QUE ENTRA ============ */}
        <section className="relative py-20">
          <div className="container-content max-w-3xl">
            <Reveal>
              <div className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
                <h2 className="text-base font-bold sm:text-lg">{t('vagas.entra.title')}</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {entra.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <IconCheck width={17} height={17} className="mt-0.5 shrink-0 text-accent-2" />
                      <span className="text-ink/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-6 rounded-2xl border border-line bg-surface p-7 sm:p-9">
                <h2 className="text-base font-bold sm:text-lg">{t('vagas.naoPrecisa.title')}</h2>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {naoPrecisa.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-red-400/15 text-[10px] font-bold text-red-300">
                        ✗
                      </span>
                      <span className="text-ink/85 line-through decoration-line/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 5 · COMPARAÇÃO ============ */}
        <section className="relative py-4">
          <div className="container-content max-w-3xl">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-line">
                <div className="border-b border-line bg-surface-2 px-5 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    {t('vagas.comparacao.label')}
                  </p>
                </div>
                <ComparacaoTable headers={headers} rows={rows} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 6 · CRONOGRAMA ============ */}
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
          </div>
        </section>

        {/* ============ 7 · OFERTA E FECHAMENTO ============ */}
        <section className="relative border-y border-line bg-surface/40 py-20">
          <div className="container-content max-w-3xl text-center">
            <Reveal>
              <h2 className="section-title gradient-text">{t('vagas.oferta.title')}</h2>
              <p className="mt-5 text-base leading-relaxed text-ink/90 sm:text-lg">
                {t('vagas.oferta.subtitle')}
              </p>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
                {t('vagas.oferta.escassez')}
              </p>
              <div className="mt-8">
                <a href="#contato" className="btn-primary text-base">
                  {t('vagas.oferta.cta')}
                  <IconArrow width={16} height={16} />
                </a>
              </div>
              <p className="mt-4 text-xs text-muted">{t('vagas.oferta.nota')}</p>
            </Reveal>
          </div>
        </section>

        {/* ============ 8 · FORMULÁRIO ============ */}
        <section id="contato" className="relative scroll-mt-16 py-20">
          <div className="container-content max-w-3xl">
            <Reveal>
              <LeadForm origem="vagas" />
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

/* ---------------- Tabela de comparação ---------------- */

function ComparacaoTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  // Última linha = custo por hora coberta → destaque (conclusão da tabela)
  return (
    <>
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface-2/60">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`px-5 py-3 text-left text-xs font-bold uppercase tracking-wider ${
                    i === 0 ? 'w-2/5 text-muted' : i === 1 ? 'text-muted' : 'text-accent-2'
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              const isLast = ri === rows.length - 1
              return (
                <tr key={ri} className={`border-t border-line ${isLast ? 'bg-accent/5' : ''}`}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-5 py-3.5 text-sm ${
                        ci === 0 ? 'font-semibold text-muted' : ci === 1 ? 'text-ink/80' : 'font-semibold text-ink'
                      } ${isLast && ci === 2 ? 'gradient-text font-black' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col divide-y divide-line md:hidden">
        {rows.map((row, ri) => {
          const isLast = ri === rows.length - 1
          return (
            <div key={ri} className={`p-4 ${isLast ? 'bg-accent/5' : ''}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{row[0]}</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted">{headers[1]}</p>
                  <p className="mt-0.5 text-sm text-ink/80">{row[1]}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-accent-2">{headers[2]}</p>
                  <p className={`mt-0.5 text-sm font-semibold ${isLast ? 'gradient-text font-black' : 'text-ink'}`}>
                    {row[2]}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
