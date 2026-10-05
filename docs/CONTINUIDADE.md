# Continuidade — site Arkai Solutions

Atualizado em 05/10/2026 (America/Sao_Paulo). Este arquivo é um resumo operacional, não uma transcrição de conversas. Antes de agir, confira o código, `git status`, o último commit e o ambiente publicado.

## Onde estamos

## Assunto em andamento: Google Tag Manager e Google Ads

- Pedido em 05/10/2026: preparar o rastreamento de contatos via formulário e WhatsApp antes de iniciar tráfego no Google Ads.
- Conta e contêiner GTM criados e verificados no navegador: `Arkai Solutions - GTM` / `Arkai Solutions - Web`, ID público `GTM-5SNX33LF`. Os termos foram aceitos após autorização explícita do usuário.
- Estado inicial deste checkout: clone limpo de `main`, com consentimento, Meta Pixel e eventos locais já implementados. Google Ads e GA4 ainda não configurados/validados neste trabalho.
- Integração concluída no código: GTM condicionado ao aceite; eventos de medição bloqueados antes do aceite/recusa; `whatsapp_click` sem número/mensagem e com `after_form`; envio do formulário aguarda callback/timeout do GTM antes da navegação. Preservado o Meta Pixel.
- Verificações locais aprovadas: `npm run build`, `npm run lint`, `node scripts/test-google-tracking.cjs` (ausência/recusa de consentimento, carga única, clique pós-formulário, callback e fallback). Não enviado lead de teste à produção.
- Publicação: push de `d511b81` em `main` confirmado. Foram incorporadas as atualizações concorrentes do outro chat, preservando o Meta Pixel `1573100370780259`. O push aciona Vercel; a inspeção imediatamente após o push ainda não confirmou o novo bundle no site. Deploy e recebimento de conversões seguem pendentes.
- Pendências: configurar propriedade/fluxo GA4 e ações Google Ads com IDs reais; criar/publicar tags no GTM; validar Tag Assistant e recebimento. Não iniciar tráfego assumindo que somente instalar o contêiner conclui essas etapas.

- Repositório: `Arkaisolutions/Arkai_Site`, branch `main`. O push em `main` aciona o deploy automático na Vercel. Site público: `https://www.arkaisolutions.com.br/`; o domínio sem `www` também serviu o mesmo bundle na última verificação.
- Aplicação Vite/React/TypeScript. `npm run build` valida TypeScript e gera a versão de produção. O `README.md` descreve a base, mas contém informações antigas sobre conteúdo e implantação; trate o código como fonte primária.
- O usuário quer manter este handoff atualizado **ao iniciar e concluir cada novo assunto**, para que outro agente continue de onde o trabalho parou. As instruções persistentes estão em `AGENTS.md` e `.cursor/rules/continuidade.mdc`.

## Último assunto concluído: Meta Pixel e consentimento

- ID público configurado em `src/config.ts`: `1448481406600125`.
- Commits de implantação: `bdfab18` (ID) e `45f5db1` (inicialização antecipada para quem já aceitou). Foi verificado que o bundle público continha o ID e que, após recarregar a página com consentimento aceito, o navegador carregava `fbevents.js` e o script de configuração desse ID. O usuário depois confirmou que o Pixel apareceu como ativo na sua extensão.
- O Pixel **não** é carregado antes da escolha nem após `Recusar`. `src/lib/consent.ts` guarda a opção no navegador; `src/main.tsx` inicializa cedo quando já existe aceite e `src/components/CookieConsent.tsx` inicia após novo aceite. `src/lib/metaPixel.ts` envia `PageView` ao iniciar e mapeia `offer_view` para `ViewContent` e `lead_submitted` para `Lead`.
- O usuário perguntou se o Gerenciador de Eventos poderia fazer o Pixel rastrear só pela entrada, mesmo após recusa. Foi explicado que não: o bloqueio decorre da escolha implementada no site, não de uma opção faltante na Meta. **Não foi alterado o comportamento de recusa.** Não tornar o botão `Recusar` fictício nem usar a API de Conversões como contorno dessa escolha. Para medir visitas não consentidas, discutir separadamente estatísticas agregadas sem identificação ou envio à Meta, com revisão de privacidade.
- Ainda não houve verificação de recebimento de `PageView`/`Lead` dentro do Gerenciador de Eventos da conta Meta. A presença do script e da extensão não comprova, sozinha, cada conversão recebida. Não enviar lead fictício ao fluxo de produção sem combinar o teste com o usuário.

## Outros contextos úteis

- O formulário de diagnóstico usa o webhook configurado em `src/config.ts`; sua ligação ao n8n foi publicada no commit `262c3e0`. O usuário relatou que um teste anterior apareceu na planilha. Consulte `docs/lead-webhook.md` e verifique o estado atual antes de mexer no fluxo.
- Na última inspeção local havia edições **não publicadas** em `src/locales/en.json`, `src/locales/es.json`, `src/locales/pt.json` e `src/pages/DiagnosticoPage.tsx`, além de arquivos novos sob `n8n/`. Elas não fazem parte deste handoff e devem ser preservadas; confira `git status` novamente, pois podem mudar.
- A página `src/pages/LegalPage.tsx` ainda se identifica como rascunho jurídico. Não apresentar seu texto como revisão jurídica final.

## Como continuar

1. Ler este arquivo e os arquivos diretamente relacionados ao pedido; confirmar branch, status e último commit.
2. Ao iniciar outro assunto, substituir/atualizar esta seção de assunto em andamento com objetivo, estado inicial e decisões relevantes. Registrar somente contexto necessário para continuidade.
3. Ao concluir, registrar o que mudou, como foi verificado, o que não foi verificado e pendências. Atualizar a data e publicar o Markdown no GitHub conforme `AGENTS.md`.
4. Se houver divergência entre este resumo, código e produção, investigar e corrigir o resumo. Não assumir que uma alteração local ou um push equivale a deploy confirmado.

## Atualização deste documento

- Pedido: deixar no GitHub o contexto recente e uma regra para próximos agentes atualizarem este arquivo ao iniciar e concluir um assunto.
- Entrega: este resumo, `AGENTS.md`, `.cursor/rules/continuidade.mdc` e correção de `docs/tracking.md`. São apenas documentos e regras; não há alteração no funcionamento do site nesta entrega.
- Validação: revisar o diff desses quatro arquivos, executar `git diff --check`, confirmar que nenhum trabalho local não relacionado entrou no commit e verificar o push em `main`. O identificador do commit desta entrega está no histórico Git do arquivo.
- Pendência anterior: testar o recebimento efetivo dos eventos na conta Meta, se o usuário solicitar.

## Assunto em andamento: acesso ao Chatwoot

- Em 05/10/2026, o usuário mostrou uma tela com `Finish Setup`, nome, empresa, e-mail e senha, além de erro de validação de senha/confirmação. A tela corresponde ao **onboarding inicial do Chatwoot**, não ao login nem a uma página deste repositório Arkai.
- Pedido: simplificar o acesso para e-mail e senha, com opção de entrar pelo Google. A busca no projeto Arkai não encontrou implementação de autenticação ou dessa tela; nenhuma mudança no site foi feita. O Chatwoot já dispõe de login por e-mail/senha e opção Google OAuth quando configurada na instância.
- Bloqueio: falta o URL exato da tela e a identificação da instalação/hospedagem ou do repositório Chatwoot controlado pelo usuário. Sem isso, não alterar o código do site Arkai nem prometer que uma mudança nele consertará o Chatwoot. Não pedir nem publicar senhas, client secrets ou outros tokens.
- Próximo passo: confirmar com o usuário a URL e onde o Chatwoot está hospedado/gerenciado; depois diagnosticar a falha de senha, completar o primeiro administrador sem contornar a validação e configurar o Google OAuth na instalação apropriada, se houver acesso e autorização.
