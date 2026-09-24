import { useEffect } from 'react'
import SiteFooter from '../components/SiteFooter'
import { config } from '../config'
import { setSeo } from '../lib/seo'

/**
 * /privacidade e /termos — rascunhos em português, marcados para
 * revisão jurídica antes da publicação definitiva (exigência do briefing).
 * Conteúdo fixo em PT: documentos legais da operação brasileira.
 */
export default function LegalPage({ tipo }: { tipo: 'privacidade' | 'termos' }) {
  const isPriv = tipo === 'privacidade'
  const title = isPriv ? 'Política de Privacidade' : 'Termos de Uso'

  useEffect(() => {
    setSeo({
      title: `${title} · Arkai Solutions`,
      description: `${title} da Arkai Solutions.`,
      canonicalPath: `/${tipo}`,
    })
  }, [tipo, title])

  return (
    <>
      <main className="container-content max-w-3xl py-20">
        <a href="/" className="text-sm font-semibold text-accent-2">← Arkai Solutions</a>
        <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>

        <p className="mt-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs font-semibold text-ink">
          Rascunho aguardando revisão jurídica antes da publicação definitiva.
        </p>

        <div className="prose-arkai mt-8 flex flex-col gap-5 text-sm leading-relaxed text-ink/85">
          {isPriv ? <PrivacidadeBody /> : <TermosBody />}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-3 text-lg font-bold text-ink">{children}</h2>
}

function PrivacidadeBody() {
  return (
    <>
      <p>
        Esta política explica quais dados a Arkai Solutions coleta neste site, para que servem,
        por quanto tempo ficam guardados e como você pode exercer seus direitos.
      </p>

      <H>Quais dados coletamos</H>
      <p>
        No formulário de contato: nome, WhatsApp, empresa, segmento e a descrição que você
        escreve no campo aberto. Se você aceitar o aviso de medição, também coletamos dados de
        navegação para medir visitas e o desempenho de anúncios. A medição não dispara antes do
        seu aceite.
      </p>

      <H>Para que os dados servem</H>
      <p>
        Para responder sua solicitação, entender sua operação e fazer contato comercial sobre os
        serviços da Arkai. Não vendemos seus dados e não os usamos para outra finalidade.
      </p>

      <H>Por quanto tempo ficam guardados</H>
      <p>
        Enquanto durar o contato comercial ou a relação de serviço, ou até você pedir a exclusão.
      </p>

      <H>Com quem são compartilhados</H>
      <p>
        Somente com os fornecedores de infraestrutura necessários para operar o site e o
        atendimento, como hospedagem e ferramentas de automação, sempre limitados a essa função.
      </p>

      <H>Seus direitos</H>
      <p>
        Você pode pedir acesso, correção, exportação ou exclusão dos seus dados a qualquer
        momento, conforme a Lei Geral de Proteção de Dados (LGPD).
      </p>

      <H>Canal de contato</H>
      <p>
        Para qualquer pedido sobre seus dados, escreva para{' '}
        <a className="font-semibold text-accent-2" href={`mailto:${config.email}`}>{config.email}</a>.
      </p>
    </>
  )
}

function TermosBody() {
  return (
    <>
      <p>
        Estes termos regulam o uso deste site e a contratação dos serviços da Arkai Solutions.
      </p>

      <H>O serviço</H>
      <p>
        A Arkai implanta e acompanha operações de atendimento e vendas com agentes de
        inteligência artificial, conforme escopo e valores definidos em proposta enviada a cada
        cliente. O conteúdo do site é informativo e não substitui a proposta.
      </p>

      <H>Formulário e contato</H>
      <p>
        Ao enviar o formulário você autoriza o contato da Arkai sobre a sua solicitação. O envio
        não gera compromisso de contratação para nenhuma das partes.
      </p>

      <H>Contratação e cancelamento</H>
      <p>
        A contratação é formalizada por proposta aceita. O cancelamento pode ser pedido a
        qualquer momento pelo canal de contato: os acessos são revogados e os dados do cliente
        são entregues, conforme a Política de Privacidade.
      </p>

      <H>Responsabilidades</H>
      <p>
        A Arkai responde pela operação da infraestrutura que implanta. O cliente responde pelas
        informações que fornece para o treinamento dos agentes e pelo uso do seu próprio negócio.
      </p>

      <H>Contato e foro</H>
      <p>
        Dúvidas sobre estes termos:{' '}
        <a className="font-semibold text-accent-2" href={`mailto:${config.email}`}>{config.email}</a>.
        Aplica-se a legislação brasileira.
      </p>
    </>
  )
}
