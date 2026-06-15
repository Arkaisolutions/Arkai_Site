/* ===================================================================
   ARKAI SOLUTIONS — CONTACT & LINKS
   Edite os links abaixo. (Edit your contact links here.)
   =================================================================== */
export const config = {
  brand: 'Arkai Solutions',
  domain: 'arkaisolutions.com.br',

  // CNPJ exibido no rodapé (transmite confiança). Cole o número formatado,
  // ex.: '12.345.678/0001-90'. Vazio = não aparece no rodapé.
  cnpj: '67.279.923/0001-03',

  /* ===================================================================
     MODO DA HOME (qual página fica em "/")
       'oferta'  → / mostra a página de OFERTA (promo early-access ativa).
                   Institucional fica em /agencia.
       'agencia' → / mostra o site INSTITUCIONAL (perene).
                   Oferta fica em standby acessível só em /oferta.

     COMO TROCAR (quando fechar os 10 clientes):
       mude a linha abaixo de 'oferta' para 'agencia', commit e push.
       Pronto — a home troca sozinha, sem mexer em mais nada.
     =================================================================== */
  homeMode: 'oferta' as 'oferta' | 'agencia',

  // Link de agendamento (Calendly, Cal.com, etc.) — usado no fallback do final do modal.
  bookingUrl: 'https://calendly.com/arkaisolutions',

  // Webhook que recebe os leads do funil (n8n / Make / Airtable Automations).
  // Deixe vazio em dev — leads cairão no console. Veja docs/lead-webhook.md.
  // URL-encoded porque o path tem espaços ("Arkai - Leads - Site").
  leadWebhookUrl: 'https://nwook.futurosolaroficial.cloud/webhook/Arkai%20-%20Leads%20-%20Site',

  // Meta Pixel / Dataset ID (Business Manager → Fontes de Dados).
  // Vazio = desligado. Cole o ID de 16 dígitos aqui pra ativar o rastreio
  // de conversão dos anúncios do Facebook/Instagram. Veja docs/tracking.md.
  metaPixelId: '',

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
