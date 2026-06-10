/* ===================================================================
   ARKAI SOLUTIONS — CONTACT & LINKS
   Edite os links abaixo. (Edit your contact links here.)
   =================================================================== */
export const config = {
  brand: 'Arkai Solutions',
  domain: 'arkaisolutions.com.br',

  // Link de agendamento (Calendly, Cal.com, etc.) — usado no fallback do final do modal.
  bookingUrl: 'https://calendly.com/arkaisolutions',

  // Webhook que recebe os leads do funil (n8n / Make / Airtable Automations).
  // Deixe vazio em dev — leads cairão no console. Veja docs/lead-webhook.md.
  // URL-encoded porque o path tem espaços ("Arkai - Leads - Site").
  leadWebhookUrl: 'https://nwook.futurosolaroficial.cloud/webhook/Arkai%20-%20Leads%20-%20Site',

  email: 'contato@arkaisolutions.com.br',

  // WhatsApp em formato internacional, só números (ex.: 5521999999999).
  whatsapp: '5521979610875',

  social: {
    instagram: 'https://www.instagram.com/arkai_solutions/',
    linkedin: '',
  },

  /* ===================================================================
     EARLY ACCESS · vagas iniciais (contador da LP /oferta)
     ATUALIZE APENAS `remaining` quando uma venda fechar.
     Quando chegar a 0, considere reabrir batch ou aumentar pra 20/30.
     =================================================================== */
  earlyAccess: {
    total: 10,
    remaining: 7,
  },
}

export const whatsappLink = (text = '') =>
  `https://wa.me/${config.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
