# Agente Vendedor & Atendente — guia de instalação (n8n + Evolution API)

Workflow: `agente-vendedor-atendente.json` · Blueprint completo: `../docs/agente-vendedor-blueprint.md`

## O que este fluxo faz

```
WhatsApp (lead) → Evolution API → [Webhook] → [Normalizar + Config]
                                                   ├─→ [🤖 Agente Ari] → [📤 Responder no WhatsApp]
                                                   ├─→ [🔥 Lead quente?] → [📣 Avisar Renan]
                                                   └─→ [🗂️ Registrar lead] (webhook de leads)
```

- **Agente Ari** conversa, qualifica e vende com base na oferta real da Arkai (memória por contato).
- Quando o lead esfria em intenção de compra ("preço", "proposta", "fechar", "falar com humano"),
  o ramo **Avisar Renan** te manda um resumo no WhatsApp.
- Todo lead é gravado no seu **webhook de leads** (o mesmo do site).

## Pré-requisitos

1. **Evolution API** rodando com uma instância conectada (QR code do WhatsApp comercial).
   Anote: a **URL base**, o **nome da instância** e a **apikey**.
2. Uma **credencial de IA** já configurada no seu n8n (OpenAI ou Anthropic/Claude).

## Passo a passo

1. **Importar:** n8n → *Workflows* → *Import from File* → selecione `agente-vendedor-atendente.json`.

2. **Configurar credenciais e parâmetros:**
   - No nó **`📥 Normalizar + Config`**, edite o bloco `CONFIG` no topo do código:
     - `evoUrl` — URL base da sua Evolution API (sem barra no fim)
     - `evoInstance` — nome da instância
     - `evoApiKey` — apikey da Evolution
     - `renanNumber` — já preenchido (5521979610875)
     - `leadWebhook` / `bookingUrl` — já preenchidos
   - No nó **`Modelo (OpenAI)`**, selecione sua credencial de IA.
     👉 **Se sua credencial é Claude/Anthropic:** apague esse nó, adicione um
     **"Anthropic Chat Model"**, selecione a credencial e ligue a saída dele na
     entrada **Model** do nó `🤖 Agente Ari`. O resto continua igual.

3. **Apontar o webhook da Evolution para o n8n:**
   - Copie a **Production URL** do nó `Webhook (Evolution)` (algo como
     `https://SEU-N8N/webhook/arkai-wpp`).
   - Na Evolution, configure o **webhook da instância** para essa URL, ativando o
     evento **`MESSAGES_UPSERT`**.

4. **Ativar** o workflow (toggle no canto superior direito).

## Como testar

- Mande uma mensagem de outro número para o WhatsApp comercial.
- Esperado: a Ari responde em segundos; ao escrever "qual o preço?", você recebe o
  aviso de **lead quente**; o lead aparece no webhook de leads.
- Se algo falhar, abra a aba **Executions** do n8n e me mande o erro do nó — a gente ajusta.

## Notas de versão

- É a **v1** (conversa + handoff + registro). Pode ser que 1 nó precise de um pequeno
  ajuste conforme a versão do seu n8n — todos os campos estão documentados no blueprint.
- O `gpt-4o-mini` é o padrão por custo; para vendas, vale testar `gpt-4o` no nó do modelo.

## Próximas melhorias (v2)

- **Debounce** (agrupar mensagens rápidas do mesmo lead antes de responder).
- **Transcrição de áudio** e **visão de imagem** (STT + descrição) no nó Normalizar.
- **Registro estruturado** do lead (nome, nicho, dor, volume) via tool nativa do Agente.
- **Presença "digitando"** antes de responder (mais humano, anti-ban).
