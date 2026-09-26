import { useEffect } from 'react'
import type { ReactNode } from 'react'
import Footer from '../components/Footer'
import { config } from '../config'
import { clearAnalyticsConsent } from '../lib/consent'
import { setSeo } from '../lib/seo'

type LegalKind = 'privacy' | 'terms'

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const isPrivacy = kind === 'privacy'

  useEffect(() => {
    document.documentElement.lang = 'pt-BR'
    setSeo({
      title: `${isPrivacy ? 'Política de Privacidade' : 'Termos de Uso'} | Arkai Solutions`,
      description: `${isPrivacy ? 'Informações sobre o tratamento de dados' : 'Condições de uso do site'} da Arkai Solutions. Rascunho pendente de revisão jurídica.`,
      canonicalPath: isPrivacy ? '/privacidade' : '/termos',
      robots: 'noindex,nofollow',
    })
  }, [isPrivacy])

  return (
    <>
      <main className="container-content mx-auto max-w-3xl pb-24 pt-16 text-ink sm:pt-24">
        <a href="/" className="text-sm text-accent hover:underline">← Voltar para Arkai Solutions</a>
        <p className="mt-12 text-xs font-bold uppercase tracking-widest text-accent">Documento em revisão</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          {isPrivacy ? 'Política de Privacidade' : 'Termos de Uso'}
        </h1>
        <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-100">
          Este texto é um rascunho para a prévia local. Dados da empresa, fornecedores e condições finais precisam ser confirmados e revisados juridicamente antes da publicação.
        </p>

        {isPrivacy ? <PrivacyContent /> : <TermsContent />}
      </main>
      <Footer />
    </>
  )
}

function PrivacyContent() {
  const resetCookieChoice = () => {
    clearAnalyticsConsent()
    window.location.reload()
  }

  return (
    <div className="mt-12 space-y-9 text-sm leading-7 text-muted">
      <Section title="Quem recebe a solicitação">
        <p>Arkai Solutions. [Razão social, CNPJ e endereço do responsável pelo tratamento a confirmar.]</p>
      </Section>
      <Section title="Dados coletados no formulário">
        <p>Nome, e-mail, WhatsApp, empresa (opcional), setor, maior gargalo e faixa de faturamento mensal escolhida. O site também registra o horário e a página de envio. Dados de origem da visita são armazenados apenas após o aceite da medição opcional.</p>
      </Section>
      <Section title="Para que usamos os dados">
        <p>Usamos as informações do formulário para responder à solicitação e conversar sobre a operação da empresa. A medição opcional ajuda a entender o desempenho do site e dos anúncios quando houver autorização.</p>
      </Section>
      <Section title="Armazenamento e compartilhamento">
        <p>[Prazo de retenção, critérios de exclusão, fornecedores, locais de armazenamento e eventuais transferências internacionais a confirmar.] Essas informações precisam refletir o fluxo real de recebimento e atendimento antes da publicação desta página.</p>
      </Section>
      <Section title="Cookies e medição">
        <p>O visitante pode aceitar ou recusar a medição opcional no aviso exibido pelo site. O Meta Pixel só é carregado quando estiver configurado e houver aceite. A escolha fica salva neste navegador.</p>
        <button type="button" onClick={resetCookieChoice} className="mt-3 text-accent underline underline-offset-2 hover:text-ink">
          Alterar preferência de medição
        </button>
      </Section>
      <Section title="Acesso, correção e exclusão">
        <p>Para pedir acesso, correção ou exclusão dos dados da solicitação, escreva para <a className="text-accent underline" href={`mailto:${config.email}`}>{config.email}</a>. [Confirmar que este endereço recebe e responde solicitações de privacidade.]</p>
      </Section>
    </div>
  )
}

function TermsContent() {
  return (
    <div className="mt-12 space-y-9 text-sm leading-7 text-muted">
      <Section title="Uso deste site">
        <p>Este site apresenta a Arkai Solutions e permite solicitar uma conversa sobre serviços. O envio do formulário não cria contrato nem obrigação de contratação.</p>
      </Section>
      <Section title="Propostas e serviços">
        <p>Escopo, prazos, preços e responsabilidades de cada projeto precisam constar da proposta e do contrato aplicáveis. Informações gerais desta página não substituem esses documentos.</p>
      </Section>
      <Section title="Conteúdo e marcas">
        <p>[Confirmar titularidade e permissões de uso de textos, imagens e marcas exibidas no site antes da publicação.]</p>
      </Section>
      <Section title="Privacidade e contato">
        <p>Consulte a <a href="/privacidade" className="text-accent underline">Política de Privacidade</a> para informações sobre o formulário. Para contato sobre o site, escreva para <a href={`mailto:${config.email}`} className="text-accent underline">{config.email}</a>.</p>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-xl font-bold text-ink">{title}</h2>
      {children}
    </section>
  )
}
