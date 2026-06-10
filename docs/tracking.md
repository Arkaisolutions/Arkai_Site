# Tracking & Conversão — Arkai Solutions

Como ligar Meta Pixel e medir conversão dos anúncios.

> Já feito no código: eventos no `window.dataLayer` (virtualPageview,
> offer_view, lead_submitted, lead_thankyou) + captura de UTM/click IDs.

---

## 🌐 URLs e eventos

| URL | Evento disparado |
|-----|------------------|
| `/` (oferta) | `offer_view` + `virtualPageview` |
| `/diagnostico` | `virtualPageview` |
| (envio do form) | `lead_submitted` ← **conversão** |
| `/diagnostico/obrigado` | `lead_thankyou` |

UTMs (`utm_source`, `utm_campaign`, `gclid`, `fbclid`...) são capturados em
sessionStorage e enviados no payload do webhook do lead (campo `attribution`).

---

## 🔧 Meta Pixel — JÁ ESTÁ INSTALADO (só falta o ID)

O código do Pixel já está no site (`src/lib/metaPixel.ts`), **desligado** até
você colar o ID. Não precisa editar HTML.

1. Meta Business Manager (https://business.facebook.com) → Configurações do
   Negócio → Fontes de Dados → Conjuntos de Dados → **Criar**
2. Conecta ao site `arkaisolutions.com.br`, copia o **ID do Pixel** (16 dígitos)
3. Em `src/config.ts`, cola na linha `metaPixelId`:
   ```ts
   metaPixelId: '1234567890123456',
   ```
4. commit + push → Vercel rebuilda → Pixel ativo

**Eventos mapeados automaticamente** (só precisa do ID):

| dataLayer | Evento Meta |
|-----------|-------------|
| `virtualPageview` | PageView |
| `offer_view` | ViewContent |
| `lead_submitted` | **Lead** ← marque como conversão |
| `lead_thankyou` | CompleteRegistration |

No Gerenciador de Eventos do Meta → marque **Lead** como conversão (ou crie
Custom Conversion por URL contendo `/diagnostico/obrigado`).

---

## 📣 URL dos anúncios

```
https://www.arkaisolutions.com.br/?utm_source=facebook&utm_medium=cpc&utm_campaign=NOME
```

(a home `/` é a oferta. Cada lead chega no n8n com a campanha identificada.)

---

## 🔵 Google Ads (quando rodar tráfego no Google também)

Mesma lógica: o evento `lead_submitted` no dataLayer pode alimentar uma
conversão do Google Ads via Google Tag / GTM. Quando for usar, me passe o
ID de conversão que eu mapeio.
