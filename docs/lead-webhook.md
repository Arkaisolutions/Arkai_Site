# Lead Webhook — Arkai Solutions

O modal de captação de leads do site (`<LeadModal />`) faz um **POST JSON** para a URL configurada em `src/config.ts → leadWebhookUrl`.

## Como ativar

1. Cria o workflow no n8n (ou Make / Airtable Automations).
2. Adiciona um nó **Webhook** (trigger). Modo: **POST**. Copia a URL de produção.
3. Cola essa URL no arquivo `src/config.ts`:
   ```ts
   leadWebhookUrl: 'https://n8n.seu-dominio.com.br/webhook/arkai-lead',
   ```
4. Commit + push. A Vercel rebuilda sozinha.

Enquanto a URL ficar vazia, o site **não quebra** — os leads são logados no console do navegador (útil pra demo).

## Payload (o que o webhook recebe)

```json
{
  "name": "João da Silva",
  "email": "joao@empresa.com",
  "whatsapp": "+55 11 99999 9999",
  "company": "Acme Ltda.",
  "sector": "Imobiliário",
  "bottleneck": "Atendimento ao cliente",
  "revenue": "R$50k – R$200k",
  "language": "pt",
  "source": "arkaisolutions.com.br",
  "pageUrl": "https://arkaisolutions.com.br/",
  "referrer": "https://www.google.com/",
  "timestamp": "2026-05-26T12:34:56.000Z"
}
```

### Campos

| Campo | Tipo | Sempre presente? | Descrição |
|---|---|---|---|
| `name` | string | sim | Nome digitado |
| `email` | string | sim | E-mail (validado por regex no front) |
| `whatsapp` | string | sim | WhatsApp com DDI |
| `company` | string | não | Empresa (opcional) |
| `sector` | string | sim | Setor escolhido no passo 1 |
| `bottleneck` | string | sim | Maior gargalo escolhido no passo 2 |
| `revenue` | string | sim | Faixa de faturamento mensal |
| `language` | `"pt"` \| `"en"` | sim | Idioma em que o lead preencheu |
| `source` | string | sim | Sempre `arkaisolutions.com.br` |
| `pageUrl` | string | sim | URL completa de onde veio |
| `referrer` | string | sim | Referrer do navegador (pode ser vazio) |
| `timestamp` | ISO 8601 | sim | Quando o lead foi enviado |

## Fluxo n8n sugerido

```
[Webhook] ──> [Set: normaliza WhatsApp / pontua score]
              │
              ├─> [Airtable / Notion]  → cria registro "Leads"
              ├─> [Slack]              → notifica canal #leads-arkai
              ├─> [WhatsApp / Z-API]   → envia mensagem automática pro lead
              └─> [Gmail / SMTP]       → confirma por e-mail + agenda nutrição
```

### Pontuação simples (lead score)

```js
let score = 0
if (revenue.includes('R$200k') || revenue.includes('R$1M') || revenue.includes('$200k')) score += 40
if (revenue.includes('R$50k') || revenue.includes('$50k')) score += 25
if (bottleneck === 'Gerar leads' || bottleneck === 'Generating leads') score += 20
if (bottleneck.includes('Follow-up') || bottleneck.includes('Sales')) score += 20
if (sector !== 'Outro' && sector !== 'Other') score += 10
return { ...payload, score }
```

> Score >= 60 → caso "quente" → notificação prioritária no Slack + tag urgente no CRM.
> Score < 60 → cai em fluxo de nutrição padrão.

## Resposta esperada

O front considera **qualquer 2xx** como sucesso. Você não precisa retornar payload — pode responder `{ "ok": true }` ou só `200 OK`.

Se a resposta não for 2xx, o modal mostra a tela de erro com botão "tentar novamente".

## Segurança

- O webhook é público (não tem como esconder em SPA). Proteja com:
  - **Rate limit** no n8n (1 req/sec por IP).
  - **Honeypot** ou Cloudflare Turnstile (se começar a chegar spam).
  - Validação no n8n: se `email` não bate regex / `whatsapp` < 8 dígitos → descarta.

## Teste manual

```bash
curl -X POST $WEBHOOK -H "Content-Type: application/json" -d '{
  "name":"Teste","email":"t@t.com","whatsapp":"+5511999999999","company":"",
  "sector":"Automotivo","bottleneck":"Gerar leads","revenue":"R$50k – R$200k",
  "language":"pt","source":"arkaisolutions.com.br","pageUrl":"https://x","referrer":"","timestamp":"2026-05-26T00:00:00.000Z"
}'
```
