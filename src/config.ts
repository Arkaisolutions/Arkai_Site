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
  leadWebhookUrl: '',

  email: 'contato@arkaisolutions.com.br',

  // WhatsApp em formato internacional, só números (ex.: 5521999999999).
  whatsapp: '5500000000000',

  social: {
    instagram: 'https://www.instagram.com/arkai_solutions/',
    linkedin: '',
  },
}

export const whatsappLink = (text = '') =>
  `https://wa.me/${config.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
