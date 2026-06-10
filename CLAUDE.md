# CLAUDE.md — Fluintech Website

## Visão geral do projeto
Site institucional da Fluintech em Next.js 15.
Objetivo: vitrine honesta da empresa, com único CTA direcionando para a Lia no WhatsApp.
Deploy automático na Vercel a cada push na branch main.

## Stack
- Next.js 15 (App Router)
- Tailwind CSS v4
- shadcn/ui estilo new-york
- Geist Sans + Geist Mono
- Lucide React (ícones)
- pnpm (gerenciador de pacotes — nunca usar npm ou yarn)
- TypeScript

## Comandos essenciais
```bash
pnpm dev          # servidor local em localhost:3000
pnpm build        # build de produção (rodar antes de qualquer PR)
pnpm lint         # linting
```

## Estrutura de pastas
```
src/
  app/
    page.tsx          # página principal — home
    layout.tsx        # layout raiz com metadados globais
    globals.css       # design tokens e estilos base
    blog/             # blog (estrutura pronta, sem conteúdo ainda)
    termos/           # página de termos de uso
    privacidade/      # política de privacidade
    actions/          # server actions (newsletter, webhooks)
    api/              # rotas de API
    robots.ts         # configuração do robots.txt
    sitemap.ts        # sitemap dinâmico
  components/
    ui/               # componentes shadcn — nunca editar diretamente
    footer.tsx        # footer do site
    logo.tsx          # componente de logo
  lib/
    utils.ts          # utilitários (cn, etc)
```

## Design system

### Paleta de cores (tokens CSS em globals.css)
```
--brand: #23C9B6          cor primária teal
--brand-hover: #1BA89A    hover dos elementos teal
--brand-subtle: #23C9B614 fundo sutil teal
--brand-border: #23C9B633 borda sutil teal
--surface: #0D1017        fundo principal
--surface-card: #141820   cards e superfícies elevadas
--surface-border: #1E2530 bordas
--text-primary: #F0F2F5   texto principal
--text-secondary: #8892A0 texto secundário
--text-muted: #3A4450     texto apagado
```

### Regras visuais obrigatórias
- Estilo de referência: Linear.app — sóbrio, minimalista, confiável
- Fundo sempre escuro: var(--surface)
- Bordas: 0.5px solid var(--surface-border)
- Border radius botões: rounded-md
- Border radius cards: rounded-xl
- Sem gradientes purple ou pink em nenhum lugar
- Sem sombras decorativas
- Dois pesos de fonte apenas: 400 (normal) e 500 (medium)
- Transições: duration-150 ease-in-out
- Labels de seção: text-xs font-medium uppercase tracking-widest text-[--brand]

### Componentes shadcn
Instalados via `pnpm dlx shadcn@latest add [componente]`.
Nunca editar arquivos dentro de src/components/ui/ manualmente.

## Conteúdo e copywriting

### Tagline
"Sua operação, comandada por agentes que agem."

### CTA único do site
Todos os botões de ação levam para o WhatsApp da Lia:
```
https://wa.me/554431010224?text=Olá!+Quero+entender+como+a+Fluintech+pode+ajudar+minha+empresa.
```
Definir como constante em page.tsx:
```ts
const WHATSAPP_URL = "https://wa.me/554431010224?text=Ol%C3%A1!+Quero+entender+como+a+Fluintech+pode+ajudar+minha+empresa."
```

### Regras de conteúdo — nunca violar
1. Sem depoimentos de clientes (não existem clientes reais ainda)
2. Sem métricas ou percentuais inventados (ex: "85% de qualificação")
3. A Lia não é personagem visual do site — ela existe no WhatsApp, o site só direciona para lá
4. Sem lista de espera ou formulários de captura de email na home
5. Copyright sempre dinâmico: {new Date().getFullYear()}
6. Sem traços longos em textos de UI

## Integrações

### n8n (automações)
Webhook base: https://n8nwh.fluintech.com.br
Autenticação: Bearer token via variável de ambiente JWT_TOKEN
Usado em: src/app/actions/newsletter.ts

### Vercel
Deploy automático via git push na branch main.
Variáveis de ambiente configuradas no painel da Vercel:
- WEBHOOK_URL
- JWT_TOKEN

## Variáveis de ambiente
```
WEBHOOK_URL=https://n8nwh.fluintech.com.br/webhook/subscriptions
JWT_TOKEN=<token configurado na Vercel>
```
Nunca commitar valores reais. Usar .env.local para desenvolvimento.

## Redes sociais
```
YouTube:   https://www.youtube.com/@fluintech
Instagram: https://www.instagram.com/fluintech
Facebook:  https://www.facebook.com/profile.php?id=61578914720363
WhatsApp:  +55 44 3101-0224
```

## Arquivos protegidos — nunca modificar sem motivo explícito
- src/middleware.ts (segurança, rate limiting, CSP)
- src/app/robots.ts (SEO e proteção de bots)
- src/app/termos/ (jurídico)
- src/app/privacidade/ (jurídico)
- src/components/ui/ (shadcn gerenciado)

## Rotas com redirect
- /lista-espera → / (permanent redirect em next.config.mjs)

## Padrões de código

### Nomenclatura
- Componentes: PascalCase
- Funções utilitárias: camelCase
- Arquivos de componente: kebab-case.tsx
- Constantes globais: UPPER_SNAKE_CASE

### Componentes
- Preferir Server Components por padrão
- Usar "use client" apenas quando necessário (interatividade, hooks)
- Props tipadas com TypeScript inline (sem interfaces separadas para props simples)

### Estilização
- Tailwind classes diretamente no JSX
- Variáveis CSS customizadas via className="text-[--brand]" ou style={{color: "var(--brand)"}}
- Evitar classes Tailwind com cores hardcoded (ex: text-teal-400) — usar os tokens

### Acessibilidade
- Imagens com alt descritivo sempre
- Botões com texto ou aria-label
- Links externos com rel="noopener noreferrer"
- Estrutura de headings semântica (h1 único por página)

## Blog
Estrutura pronta em src/app/blog/ mas sem conteúdo ainda.
Não linkar no nav até ter pelo menos um post publicado.
Posts serão em MDX ou via CMS (a definir).

## Checklist antes de qualquer deploy
- [ ] pnpm build sem erros
- [ ] Sem console.log esquecidos
- [ ] Sem credenciais hardcoded
- [ ] Links do WhatsApp testados
- [ ] Responsivo em 375px (mobile) e 1280px (desktop)
- [ ] Copyright dinâmico funcionando
