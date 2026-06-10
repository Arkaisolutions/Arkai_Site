# SEO & Proteção de Marca — Arkai Solutions

Guia passo a passo do que **você (Renan)** precisa fazer fora do código para
o site aparecer no Google e a marca "Arkai Solutions" ser dominada por você
(combatendo as cópias de nome).

> O que JÁ foi feito no código (deploy automático):
> - ✅ `robots.txt` + `sitemap.xml`
> - ✅ Meta tags dinâmicas por página (título/descrição/canonical)
> - ✅ Schema.org Organization (autoridade de marca)
> - ✅ Estrutura de URLs limpa (/ , /agencia, /diagnostico)

---

## 1. Google Search Console (PRIORIDADE MÁXIMA · 10 min)

É isto que efetivamente "registra" o site no Google.

1. Acesse https://search.google.com/search-console
2. Login com a conta Google da Arkai
3. **Adicionar propriedade** → escolha **"Prefixo do URL"** → digite:
   `https://www.arkaisolutions.com.br`
4. Método de verificação: **"Tag HTML"** OU **"Provedor de nomes de domínio"**.
   - Se escolher Tag HTML: o Google te dá uma `<meta name="google-site-verification" content="XXXX">`.
     **Me mande esse código** que eu coloco no `index.html` em 1 minuto.
   - Se escolher domínio (Registro.br): o Google te dá um registro TXT pra
     adicionar na zona DNS do Registro.br (mesmo painel onde fizemos o A/CNAME).
5. Após verificar → menu **Sitemaps** → adicione: `sitemap.xml` → Enviar.
6. Pronto. O Google começa a indexar em 1-7 dias.

> 💡 Em **"Inspeção de URL"**, cole `https://www.arkaisolutions.com.br/` e clique
> **"Solicitar indexação"** pra acelerar. Repita pra /agencia.

---

## 2. Google Business Profile (proteção de marca · 15 min)

É o que faz a Arkai aparecer no mapa + painel lateral quando buscam o nome.
**Principal arma contra quem copiou seu nome.**

1. Acesse https://business.google.com
2. Criar perfil → Nome: **Arkai Solutions**
3. Categoria: **"Serviço de automação"** ou **"Consultoria de marketing"**
4. Área de atendimento: pode marcar "atendo clientes na localização deles"
   (não precisa endereço físico público se for home office)
5. Telefone: WhatsApp comercial (5521979610875)
6. Site: `https://www.arkaisolutions.com.br`
7. Verificação: o Google manda código por SMS/ligação/vídeo
8. Depois de verificado: adicione logo, descrição, fotos, horário

> Quando alguém buscar "Arkai Solutions", VOCÊ aparece no painel oficial à
> direita. Cópias de nome ficam pra baixo / invisíveis.

---

## 3. Bing Webmaster Tools (bônus · 5 min)

Mesma lógica do Search Console, pro Bing (alimenta também o ChatGPT/Copilot).
1. https://www.bing.com/webmasters
2. **Importar do Google Search Console** (1 clique, puxa tudo)

---

## 4. Consistência de marca (NAP) — combate à impersonation

Garanta que estes 4 dados estão **idênticos** em TODO lugar (site, Instagram,
Business Profile, LinkedIn, assinatura de e-mail):

- **Nome:** Arkai Solutions
- **Site:** www.arkaisolutions.com.br
- **WhatsApp:** +55 21 97961-0875
- **E-mail:** contato@arkaisolutions.com.br

Quanto mais consistente, mais o Google entende que ESTA é a entidade oficial.

Ações extras anti-cópia:
- [ ] Instagram @arkai_solutions com link pro site na bio
- [ ] LinkedIn da empresa "Arkai Solutions" linkado ao site
- [ ] Registrar a marca no INPI (proteção legal — opcional, mas forte)
- [ ] Se acharem perfil falso usando o nome → denunciar na plataforma

---

## 5. Conteúdo para ranquear (médio prazo)

O site sozinho ranqueia pro nome da marca. Pra ranquear pra termos como
"automação com IA para [setor]", precisa de **conteúdo**. Sugestão futura:
- Blog `/blog` com 1 artigo por setor ("Como automatizar atendimento de
  concessionária com IA", etc.)
- Cada artigo = porta de entrada orgânica de um nicho diferente
- Podemos construir quando você quiser.

---

## ⚠️ Limitação técnica conhecida (futuro)

O site é uma SPA (React). O Google renderiza JavaScript, mas a indexação é
mais lenta que um site com HTML pré-renderizado. Quando o tráfego orgânico
virar prioridade, vale migrar pra **prerendering / SSG** (gera HTML estático
por rota). Não é urgente agora — o Search Console + sitemap + Schema cobrem o
essencial pra começar a aparecer.

---

## ✅ Checklist rápido (faça nesta ordem)

1. [ ] Search Console verificado + sitemap enviado
2. [ ] Me mandar o código `google-site-verification` (se usar Tag HTML)
3. [ ] "Solicitar indexação" pra / e /agencia
4. [ ] Google Business Profile criado e verificado
5. [ ] Bing Webmaster (importar do Google)
6. [ ] NAP consistente em todas as redes
