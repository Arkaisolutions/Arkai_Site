import { useTranslation } from 'react-i18next'

/**
 * Fake "Arkai Command Center" dashboard, designed to live inside ContainerScroll.
 * Pure HTML/CSS — no external images. Bilingual via i18n.
 */
export default function CommandCenterMockup() {
  const { i18n } = useTranslation()
  const isPt = i18n.language.startsWith('pt')

  const leads = [
    { name: 'João Silva',  city: isPt ? 'São Paulo'      : 'São Paulo',  status: 'hot',    score: 94, time: '2m'  },
    { name: 'Maria Costa', city: isPt ? 'Rio de Janeiro' : 'Rio',        status: 'qual',   score: 81, time: '7m'  },
    { name: 'Carlos R.',   city: isPt ? 'Belo Horizonte' : 'Belo H.',    status: 'booked', score: 88, time: '14m' },
    { name: 'Ana Pereira', city: isPt ? 'Curitiba'       : 'Curitiba',   status: 'hot',    score: 91, time: '21m' },
    { name: 'Diego Lima',  city: isPt ? 'Porto Alegre'   : 'P. Alegre',  status: 'qual',   score: 76, time: '38m' },
  ]

  const activity = [
    { kind: 'in',   text: isPt ? 'Quero saber sobre energia solar pra minha casa' : 'I want to know about solar for my home' },
    { kind: 'bot',  text: isPt ? 'Claro! Você está pesquisando pra qual cidade?'  : 'Sure! Which city are you looking for?'  },
    { kind: 'in',   text: isPt ? 'Campinas, conta de luz uns R$ 480'              : 'Campinas, energy bill around R$ 480'    },
    { kind: 'bot',  text: isPt ? 'Posso te chamar amanhã às 14h pra apresentar o projeto?' : 'Can I call you tomorrow at 2 PM with the plan?' },
    { kind: 'in',   text: isPt ? 'Pode sim!'                                       : 'Sounds good!'                            },
    { kind: 'sys',  text: isPt ? '✓ Reunião agendada · CRM atualizado'             : '✓ Meeting booked · CRM updated'          },
  ]

  return (
    <div className="flex h-full w-full flex-col font-sans">
      {/* Header bar */}
      <header className="flex items-center justify-between border-b border-line bg-surface-2/60 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-accent to-accent-2 text-[11px] font-black text-white">
            A
          </span>
          <span className="text-sm font-bold tracking-tight">Arkai · Command Center</span>
          <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-green-400/30 bg-green-400/10 px-2 py-0.5 text-[10px] font-semibold text-green-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
            </span>
            LIVE
          </span>
        </div>
        <div className="hidden items-center gap-2 text-[11px] text-muted sm:flex">
          <span className="rounded-md border border-line bg-surface px-2 py-1">{isPt ? 'Hoje' : 'Today'}</span>
          <span className="rounded-md border border-line bg-surface px-2 py-1">3 {isPt ? 'agentes' : 'agents'} on</span>
        </div>
      </header>

      {/* Main 3-col layout */}
      <div className="grid flex-1 min-h-0 grid-cols-1 gap-px overflow-hidden bg-line md:grid-cols-[1.05fr_1.25fr_1.25fr]">
        {/* LEFT: leads list */}
        <section className="hidden flex-col bg-surface p-4 md:flex">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted">
              {isPt ? 'Leads ao vivo' : 'Live leads'}
            </h4>
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent-2">
              +24 {isPt ? 'hoje' : 'today'}
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {leads.map((l) => (
              <li key={l.name} className="rounded-lg border border-line bg-surface-2/60 p-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent/80 to-accent-2/80 text-[10px] font-bold text-white">
                    {l.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-ink">{l.name}</p>
                    <p className="text-[10px] text-muted">{l.city} · {l.time}</p>
                  </div>
                  <StatusPill status={l.status} isPt={isPt} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                      style={{ width: `${l.score}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-ink/80">{l.score}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* CENTER: pipeline + chart */}
        <section className="flex flex-col bg-surface p-4">
          <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted">
            {isPt ? 'Pipeline · hoje' : 'Pipeline · today'}
          </h4>

          {/* KPI row */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <KpiCard label={isPt ? 'Novos' : 'New'} value="24" delta="+8" />
            <KpiCard label={isPt ? 'Qualif.' : 'Qual.'} value="12" delta="+3" />
            <KpiCard label={isPt ? 'Agendados' : 'Booked'} value="6" delta="+2" />
            <KpiCard label={isPt ? 'Fechados' : 'Won'} value="3" delta="+1" />
          </div>

          {/* Funnel bars */}
          <div className="mt-4 flex flex-1 flex-col justify-end gap-2">
            <FunnelRow label={isPt ? 'Novos' : 'New'}      pct={100} value="24" />
            <FunnelRow label={isPt ? 'Qualif.' : 'Qual.'}  pct={50}  value="12" />
            <FunnelRow label={isPt ? 'Agendados' : 'Booked'} pct={25} value="6"  />
            <FunnelRow label={isPt ? 'Fechados' : 'Won'}   pct={12}  value="3"  />
          </div>

          {/* Revenue */}
          <div className="mt-4 rounded-lg border border-line bg-surface-2/60 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
              {isPt ? 'Receita gerada hoje' : 'Revenue captured today'}
            </p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="gradient-text text-2xl font-black">$ 4,720</span>
              <span className="text-xs font-semibold text-green-400">▲ 38%</span>
            </p>
          </div>
        </section>

        {/* RIGHT: agent activity */}
        <section className="flex flex-col bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted">
              {isPt ? 'Agente IA · ao vivo' : 'AI Agent · live'}
            </h4>
            <span className="text-[10px] font-medium text-muted">WhatsApp</span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
            {activity.map((a, i) => (
              <ChatBubble key={i} kind={a.kind} text={a.text} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

/* ---------------- helpers ---------------- */

function StatusPill({ status, isPt }: { status: string; isPt: boolean }) {
  const map = {
    hot:    { label: isPt ? 'Quente'    : 'Hot',     cls: 'bg-orange-400/15 text-orange-300 border-orange-400/30' },
    qual:   { label: isPt ? 'Qualific.' : 'Qual.',   cls: 'bg-accent/15 text-accent-2 border-accent/30' },
    booked: { label: isPt ? 'Agendado'  : 'Booked',  cls: 'bg-green-400/15 text-green-400 border-green-400/30' },
  } as const
  const cfg = map[status as keyof typeof map] ?? map.qual
  return (
    <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${cfg.cls}`}>
      {cfg.label}
    </span>
  )
}

function KpiCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface-2/60 p-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <div className="mt-0.5 flex items-baseline gap-1.5">
        <span className="text-lg font-black tracking-tight">{value}</span>
        <span className="text-[10px] font-semibold text-green-400">{delta}</span>
      </div>
    </div>
  )
}

function FunnelRow({ label, pct, value }: { label: string; pct: number; value: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[10px] text-muted">
        <span className="font-semibold">{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function ChatBubble({ kind, text }: { kind: string; text: string }) {
  if (kind === 'sys') {
    return (
      <div className="self-center rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-[10px] font-semibold text-green-400">
        {text}
      </div>
    )
  }
  const isBot = kind === 'bot'
  return (
    <div className={`flex ${isBot ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-[11px] leading-snug ${
          isBot
            ? 'bg-gradient-to-br from-accent to-accent-2 text-white'
            : 'border border-line bg-surface-2 text-ink/85'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
