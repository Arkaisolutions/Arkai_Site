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

## Google Tag Manager — base preparada em 05/10/2026

- Contêiner: `GTM-5SNX33LF`, configurado em `src/config.ts`.
- `src/lib/googleTagManager.ts` carrega o contêiner somente depois do aceite
  de medição. Não inserir um segundo snippet no HTML nem um iframe noscript
  que carregue sem essa escolha. Antes do aceite e após recusa, eventos de
  medição também não são enfileirados para envio posterior.
- O envio bem-sucedido do formulário produz `lead_submitted`. A navegação
  aguarda o callback do GTM por no máximo dois segundos. Erro de webhook
  não é conversão; a página de agradecimento isolada também não é conversão.
- Links para `wa.me`, `api.whatsapp.com` e `web.whatsapp.com` produzem
  `whatsapp_click`, com `page_path`, `contact_channel` e `after_form`.
  Não são enviados o número, a mensagem nem os campos pessoais do contato.
- No GTM, usar acionadores de Evento personalizado para `lead_submitted`
  e `whatsapp_click`. O clique na página de agradecimento tem `after_form=true`:
  manter como observação secundária para não duplicar o lead do formulário.
- Configuração futura: GA4 e ações de conversão do Google Ads precisam dos
  identificadores reais. Escolher conversão direta do Ads ou importação do GA4
  para cada resultado; não usar ambas como principais para a mesma ação.
- Para GA4, escolher uma estratégia de pageview (automática ou
  `virtualPageview`) e evitar contar as duas. O clique WhatsApp não comprova
  mensagem enviada ou reunião agendada.
- Publicação do código não comprova recebimento de conversões. Validar no
  Tag Assistant e nas contas de destino; combinar envio de lead de teste
  em produção antes de executá-lo.
