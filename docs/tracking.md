# Tracking & Conversion Setup — Arkai Solutions

Este documento explica **como ligar Meta Pixel, Google Ads, GA4 e GTM** ao site
para rastrear visitas e conversões dos anúncios.

---

## 🌐 URLs estratégicas

| URL | Função | Use em… |
|-----|--------|---------|
| `/` | Landing principal (modal in-page funciona) | Tráfego orgânico, SEO, branding |
| `/diagnostico` | **Formulário dedicado** (PT) | Anúncios em português, posts orgânicos |
| `/audit` | Formulário dedicado (EN) | Anúncios em inglês, LinkedIn |
| `/diagnostico/obrigado` | **Página de obrigado (PT)** | **Configure como CONVERSÃO** |
| `/audit/thank-you` | Página de obrigado (EN) | Configure como CONVERSÃO |

---

## 📊 Eventos disparados no dataLayer

A camada de eventos é compatível com Google Tag Manager, GA4 e Meta Pixel (via GTM).
Tudo é empurrado para `window.dataLayer`.

| Evento | Quando dispara | Payload útil |
|--------|----------------|--------------|
| `virtualPageview` | Em cada mudança de rota SPA | `page_path`, `page_title` |
| `lead_submitted` | Quando o lead envia o formulário (modal ou página) | `sector`, `bottleneck`, `revenue`, `language`, `variant`, `origin` |
| `lead_thankyou` | Quando o usuário chega na página de obrigado | `path` |

> 💡 Use **`lead_submitted`** como evento principal de conversão. O `lead_thankyou` é redundância pra pixels que rastreiam apenas pageview.

---

## 🎯 UTM tags & Click IDs — capturados automaticamente

Quando o anúncio enviar tráfego com:

```
https://www.arkaisolutions.com.br/diagnostico?utm_source=facebook&utm_medium=cpc&utm_campaign=solar_jan&fbclid=XYZ
```

O site **automaticamente captura e persiste** (sessionStorage):

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `gclid` (Google Ads), `fbclid` (Meta), `msclkid` (Microsoft), `ttclid` (TikTok)
- `firstLandingPage`, `firstReferrer`, `firstSeenAt`

Esses dados entram no **payload do webhook do lead** (`attribution` field) — você sabe exatamente qual campanha trouxe cada cliente.

---

## 🔧 Como adicionar Meta Pixel (3 minutos)

Cole isto no `<head>` do `index.html` (substitua `SEU_PIXEL_ID`):

```html
<!-- Meta Pixel Code -->
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

Em seguida, no **Gerenciador de Eventos do Meta**, crie um **Custom Conversion** baseado em URL contendo `/diagnostico/obrigado`. Isso vira sua conversão dos anúncios.

---

## 🔧 Como adicionar Google Tag Manager (recomendado)

1. Cria o container no [Google Tag Manager](https://tagmanager.google.com).
2. Cole o snippet no `<head>` e logo após `<body>` do `index.html`.
3. Dentro do GTM, cria triggers:
   - **Trigger 1**: Custom Event `lead_submitted` → fire tag de "Conversão Meta" + "Conversão Google Ads" + "GA4 Event".
   - **Trigger 2**: Custom Event `virtualPageview` → fire tag de GA4 Pageview.
4. Publica o container.

Você gerencia TODOS os pixels num só lugar — sem editar o site.

---

## 🔧 Como adicionar Google Analytics 4 (sem GTM)

Cole no `<head>` (substitua `G-XXXXXXXXXX`):

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', { send_page_view: false }); // SPA — usamos virtualPageview
  // Mapeia eventos custom para gtag
  window.addEventListener('load', () => {
    const orig = window.dataLayer.push;
    window.dataLayer.push = function(...args) {
      orig.apply(this, args);
      const e = args[0];
      if (e?.event === 'virtualPageview') gtag('event', 'page_view', { page_path: e.page_path });
      if (e?.event === 'lead_submitted') gtag('event', 'generate_lead', e);
    };
  });
</script>
```

---

## ✅ Checklist antes de subir campanha paga

- [ ] Meta Pixel instalado e ativo (verificar com extensão "Meta Pixel Helper")
- [ ] Google Ads Conversion Tracking configurado
- [ ] GA4 recebendo `virtualPageview` (DebugView)
- [ ] Conversão **"Lead Submitted"** criada no Meta e no Google Ads, mapeada para `/diagnostico/obrigado` OU evento `lead_submitted`
- [ ] Webhook do n8n recebendo payload com campo `attribution` (UTM tags chegando)
- [ ] URL de anúncio testada: `https://www.arkaisolutions.com.br/diagnostico?utm_source=teste&utm_campaign=teste`
- [ ] Lead de teste enviado → cai no n8n com UTMs presentes

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

Com esses dados no n8n você pode:
- Rotear leads por UTM source ("se veio do Facebook → atribui ao SDR X")
- Reportar ROAS por campanha
- Otimizar Pixels com Conversion API (envia conversão server-side via webhook → Meta)
