# Tracking & Conversion Setup — Arkai Solutions

Como ligar Meta Pixel, Google Ads, GA4 e GTM ao site para rastrear visitas e
conversões dos anúncios.

> ⚠️ **Importante:** o modal de captura na home (`/`) NÃO dispara eventos de tracking.
> Os eventos são disparados apenas nas páginas dedicadas `/diagnostico` e `/diagnostico/obrigado`.
> Isso é intencional: o modal serve quem já chegou no site organicamente; as páginas
> servem o tráfego pago rastreável.

---

## 🌐 URLs estratégicas

| URL | Função | Use em… |
|-----|--------|---------|
| `/` | Landing principal (modal in-page funciona, sem tracking) | Tráfego orgânico, SEO, branding |
| `/diagnostico` | **Formulário dedicado** (PT) — com tracking | Anúncios em português |
| `/audit` | Formulário dedicado (EN) — com tracking | Anúncios em inglês |
| `/diagnostico/obrigado` | **Página de obrigado (PT)** | **Configure como CONVERSÃO** |
| `/audit/thank-you` | Página de obrigado (EN) | Configure como CONVERSÃO |

---

## 📊 Eventos disparados no dataLayer

Camada compatível com GTM, GA4 e Meta Pixel (via GTM).

| Evento | Quando dispara | Onde |
|--------|----------------|------|
| `virtualPageview` | Em cada mudança de rota SPA | Todas |
| `lead_submitted` | Quando o lead envia o form de `/diagnostico` | `/diagnostico` |
| `lead_thankyou` | Quando o usuário chega na thank-you | `/diagnostico/obrigado` |

---

## 🎯 UTM tags & Click IDs — capturados automaticamente

```
https://www.arkaisolutions.com.br/diagnostico?utm_source=facebook&utm_medium=cpc&utm_campaign=solar_jan&fbclid=XYZ
```

Captura automática (sessionStorage):
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `gclid`, `fbclid`, `msclkid`, `ttclid`
- `firstLandingPage`, `firstReferrer`, `firstSeenAt`

Esses dados entram no payload do webhook do lead — você sabe qual campanha trouxe cada cliente.

---

## 🔧 Como adicionar Meta Pixel (3 minutos)

No `<head>` do `index.html` (substitua `SEU_PIXEL_ID`):

```html
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'SEU_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

No Gerenciador de Eventos do Meta, crie **Custom Conversion**:
- Tipo: URL contains
- Valor: `/diagnostico/obrigado`

---

## 🔧 Como adicionar Google Tag Manager (recomendado)

1. Cria container no [GTM](https://tagmanager.google.com).
2. Cola o snippet no `<head>` e após `<body>` do `index.html`.
3. Triggers:
   - `lead_submitted` → tag de Conversão Meta + Google Ads + GA4 Event
   - `virtualPageview` → tag de GA4 Pageview
4. Publica.

---

## 🔍 Payload completo do webhook (referência)

```json
{
  "name": "João Silva",
  "email": "joao@empresa.com",
  "whatsapp": "+5521999999999",
  "company": "Acme Ltda.",
  "sector": "Automotivo",
  "bottleneck": "Gerar leads",
  "revenue": "R$200k – R$1M",
  "language": "pt",
  "source": "arkaisolutions.com.br",
  "pageUrl": "https://www.arkaisolutions.com.br/diagnostico?utm_source=facebook",
  "referrer": "https://www.facebook.com/",
  "timestamp": "2026-05-27T14:30:00.000Z",
  "attribution": {
    "utm_source": "facebook",
    "utm_medium": "cpc",
    "utm_campaign": "solar_jan",
    "fbclid": "IwAR0xyz...",
    "firstLandingPage": "https://www.arkaisolutions.com.br/diagnostico?utm_source=facebook",
    "firstReferrer": "https://www.facebook.com/",
    "firstSeenAt": "2026-05-27T14:25:00.000Z"
  }
}
```
