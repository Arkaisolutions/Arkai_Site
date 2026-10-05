/* ===================================================================
   ARKAI SOLUTIONS — CONTACT & LINKS
   Edite os links abaixo. (Edit your contact links here.)
   =================================================================== */
export const config = {
  brand: 'Arkai Solutions',
  domain: 'arkaisolutions.com.br',

  // Mantido para a página de oferta original; confirmar disponibilidade antes de publicar.
  homeMode: 'oferta' as 'oferta' | 'agencia',
  earlyAccess: { total: 10, remaining: 7 },

  // CNPJ exibido no rodapé (transmite confiança). Cole o número formatado,
  // ex.: '12.345.678/0001-90'. Vazio = não aparece no rodapé.
  cnpj: '67.279.923/0001-03',

  // Link de agendamento (Calendly, Cal.com, etc.) — usado no fallback do final do modal.
  bookingUrl: 'https://calendly.com/arkaisolutions',

  // Webhook que recebe os leads do funil (n8n / Make / Airtable Automations).
  // Deixe vazio em dev — leads cairão no console. Veja docs/lead-webhook.md.
  // Endpoint de produção do fluxo de leads validado no n8n.
  leadWebhookUrl: 'https://nwook.futurosolaroficial.cloud/webhook/arkai-site-leads-v2',

  // Meta Pixel / Dataset ID (Business Manager → Fontes de Dados).
  // Vazio = desligado. Cole o ID de 16 dígitos aqui pra ativar o rastreio
  // de conversão dos anúncios do Facebook/Instagram. Veja docs/tracking.md.
  metaPixelId: '1573100370780259',

  email: 'contato@arkaisolutions.com.br',

  // WhatsApp em formato internacional, só números (ex.: 5521999999999).
  whatsapp: '5521979610875',

  social: {
    instagram: 'https://www.instagram.com/arkai_solutions/',
    linkedin: '',
  },

}

export const whatsappLink = (text = '') =>
  `https://wa.me/${config.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
