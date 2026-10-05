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

Após o aceite de medição, UTMs (`utm_source`, `utm_campaign`, `gclid`,
`fbclid`...) são capturados em sessionStorage e enviados no payload do webhook
do lead (campo `attribution`).

---

## 🔧 Meta Pixel — configurado no site

O ID `1448481406600125` está em `src/config.ts`. O código de
`src/lib/metaPixel.ts` é carregado **somente após aceite de medição**. Quem
recusa ou não escolhe não é rastreado pelo Meta Pixel; o Gerenciador de
Eventos não altera essa escolha do site.

Ao iniciar, o Pixel envia `PageView`. O `window.dataLayer` também espelha:

| dataLayer | Evento Meta |
|-----------|-------------|
| `offer_view` | ViewContent |
| `lead_submitted` | **Lead** ← marque como conversão |

`virtualPageview` e `lead_thankyou` existem no `dataLayer`, mas **não** estão
mapeados para eventos Meta em `src/lib/metaPixel.ts`. Não afirmar que geram
eventos Meta sem implementar e verificar essa ligação.

Para conferir: abra o site em um navegador sem bloqueador, aceite a medição e
use **Testar eventos** no Gerenciador de Eventos para verificar `PageView`.
Um `Lead` requer envio bem-sucedido do formulário; combine qualquer teste em
produção antes de criar uma linha de teste no n8n/planilha.

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
