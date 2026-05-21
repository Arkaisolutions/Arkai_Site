# Arkai Solutions — Site

Site institucional da **Arkai Solutions** — agência de automação com agentes de IA.
Bilíngue (EN/PT), construído para vender projetos em USD/EUR.

**Domínio:** arkaisolutions.com.br

## Stack

- **Vite 6** + **React 19** + **TypeScript**
- **Tailwind CSS 3** (tema dark, cores em variáveis CSS)
- **react-i18next** (bilíngue EN/PT, detecta o idioma do navegador)
- Deploy: **Vercel**

## Rodar localmente

```bash
npm install        # instala as dependências (só na primeira vez)
npm run dev        # abre em http://localhost:5173
npm run build      # gera a versão de produção em /dist
npm run preview    # testa a versão de produção
```

## Onde editar o conteúdo

| O que mudar | Arquivo |
|-------------|---------|
| Textos (EN) | `src/locales/en.json` |
| Textos (PT) | `src/locales/pt.json` |
| Cores da marca | `src/index.css` (bloco `:root`, valores RGB) |
| Link de agendamento, e-mail, WhatsApp, redes | `src/config.ts` |
| Logo / favicon | `public/favicon.svg` |
| Ferramentas listadas na seção "Stack" | `src/components/Stack.tsx` |

> Os preços dos planos ficam em `locales/en.json` e `pt.json` (chave `pricing.plans`).
> Os valores atuais ($390 / $890) são **placeholders** — ajuste para os seus.

## Publicar (GitHub + Vercel)

1. Crie um repositório no GitHub e faça `git push`.
2. Em [vercel.com](https://vercel.com), importe o repositório (framework Vite é detectado automaticamente).
3. Em **Settings → Domains**, adicione `arkaisolutions.com.br` e configure o DNS conforme o Vercel indicar.

## Estrutura

```
src/
  components/   Navbar, Hero, Services, Process, Work, Stack, Pricing, FAQ, CTA, Footer
  locales/      en.json, pt.json  (todo o conteúdo do site)
  config.ts     Links de contato
  i18n.ts       Configuração de idioma
  index.css     Tema / tokens de marca
```
