# Reescrita do site Arkai · Instruções e pendências

Atualizado em 24/09/2026. Este documento registra o estado da reescrita do site
(briefing de 23/09), o que já está pronto, o que falta e quem destrava cada item.

## Estado atual

| Onde | O que tem |
| --- | --- |
| **No ar** (arkaisolutions.com.br, branch `main`) | Site atual da oferta, intocado: preço, contador, título em 3 linhas, og-image nova. |
| **Branch `reescrita-briefing`** (em revisão) | Site novo do briefing: institucional em `/` + campanha em `/vagas`. Nada disso está público. |
| **Branch `backup/cases-faq-og`** | Versão antiga de cases/FAQ, guardada. Não usar sem adaptar às regras do briefing. |

## O que mudou no site novo

### Página institucional `/` (nova)
- Público: indicação, busca, quem recebeu proposta. **Sem preço, sem contador, sem escassez** (regra do briefing — o preço mora na /vagas; ver "Decisões abertas").
- Seções: abertura → 4 cartões do problema → 6 agentes (Atendimento, Qualificação, Marketing e tráfego, Gestão comercial, Leitura de números, Acompanhamento) → 4 semanas de implantação → "Ver rodando" (3 imagens pendentes) → Clientes (4 cards aguardando autorização) → 8 perguntas → formulário.
- Menu: O problema · O que fazemos · Ver rodando · Clientes · Perguntas · Falar com a gente.

### Página de campanha `/vagas` (nova)
- Sem menu. Recebe o tráfego pago e o link da bio do Instagram.
- Contador "6 vagas restantes de 10" (manual: `src/config.ts` → `earlyAccess.remaining`; atualizar a cada venda ou remover).
- Título em 3 linhas definido pelo Renan: "Você contrataria 6 profissionais. / Contrate 1 sistema, / pelo preço de 1 CLT."
- Oferta completa: R$ 2.500/mês, implantação inclusa para as 10 primeiras, tabela que fecha em **custo por hora coberta (R$ 14,20 vs R$ 3,47)** — sem empate e sem $997.

### Correções obrigatórias aplicadas
- Saíram: "Evolution API (oficial)", "cobra inadimplente sozinho", "espia os concorrentes", inventário "39 agentes / 63 workflows / 22 sistemas", "$997/mês", "4 tomadas".
- Formulário único (Nome, WhatsApp, Empresa, Segmento, "o que mais trava hoje?") com consentimento LGPD → webhook n8n, com UTM preservada.
- Rodapé institucional com CNPJ, links legais; páginas `/privacidade` e `/termos` (rascunhos).
- Banner de cookies: a medição (Pixel) só dispara após o aceite.
- Nenhuma URL quebra: `/oferta` e `/diagnostico` → `/vagas`; `/agencia` → `/`.
- Idiomas PT/EN/ES mantidos; moeda única (R$) nos três.

## Como revisar o site novo
1. **No app (Claude Code):** painel do navegador → `http://localhost:5173/` e `/vagas`.
2. **No celular / fora do PC:** o link de preview da Vercel exige login por padrão.
   Para liberar: vercel.com → projeto Arkai_Site → Settings → **Deployment Protection** → desativar para Previews. Link: `https://arkai-site-git-reescrita-briefing-arkais-projects-6f5a3604.vercel.app`

## Como publicar (quando aprovar)
1. Merge do branch na main: `git checkout main && git merge reescrita-briefing && git push`.
2. A Vercel publica sozinha em 1 a 2 minutos.
3. Rollback, se precisar: `git revert` do merge (nada é perdido).

## Decisões abertas (só o Renan decide)
- [ ] **Preço na institucional?** O briefing recomenda que NÃO (só na /vagas). Se quiser mostrar, entra depois da seção Clientes, nunca na abertura.
- [ ] **Contador de vagas:** manter com atualização manual a cada venda, ou remover.
- [ ] **Marca "Arkai":** existe arkaicloud.com.br na mesma categoria. Checar registro no INPI (classes de software e serviços de tecnologia) e depositar se estiver livre — antes de investir mais em tráfego na marca.

## Pendências do Renan (o site não vai ao ar completo sem isso)
- [ ] **Razão social e endereço** para o rodapé (o CNPJ 67.279.923/0001-03 já está).
- [ ] **3 capturas de tela** em ambiente de demonstração, sem dado de cliente real: conversa do agente, painel de acompanhamento, mapa da base. Substituem os `[imagem pendente]`.
- [ ] **4 clientes para a seção Clientes**, cada um com: segmento, nome (com autorização por escrito, guardada em arquivo), "o que travava" e "o que passou a acontecer" (1 frase cada, sem porcentagem sem relatório). ClickParts só entra identificada como operação própria.
- [ ] **Segmentos autorizados** para a resposta do FAQ "Vocês atendem meu segmento?".
- [ ] **E-mail no domínio** (contato@arkaisolutions.com.br) criado e funcionando.
- [ ] **ID do Meta Pixel** (Business Manager → Fontes de Dados) → colar em `src/config.ts` → `metaPixelId`. Sem ele a campanha roda cega.
- [ ] **Revisão jurídica** dos rascunhos de `/privacidade` e `/termos`.

## Pendência técnica (Claude)
- [ ] **Pré-render**: servir o texto das duas páginas direto no HTML (hoje depende do JavaScript). Exigência do briefing para busca e preview de link. Fazer depois do merge, com calma.
- [ ] Nova og-image da /vagas (a atual é a da institucional).

## Relacionado (fora do site, já analisado)
- **Fluxo n8n do Instagram**: colocar timeout na aprovação por e-mail; resolver limite do HCTI (50 img/mês vs ~132 de consumo — alternativa: renderizar nas VPS); criar o fluxo que responde o comentário "ORÇAMENTO" no direct; unificar a conta (fluxo posta em @arkaisolutions.ia, site aponta @arkai_solutions); quando o site novo subir, apontar a bio para /vagas.
- **Agente Ari (n8n)**: prompt ainda vende "14 agentes" — atualizar para a narrativa de 6.
