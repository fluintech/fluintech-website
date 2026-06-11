# Briefing — Refatoração do site Fluintech

## Contexto
Site da Fluintech em Next.js 15, Tailwind CSS, shadcn/ui (estilo new-york), Geist font, pnpm.
Hospedado na Vercel. Repositório: github.com/fluintech/fluintech-website

## Objetivo
Substituir o conteúdo atual por um site institucional honesto, alinhado ao posicionamento real
da empresa. Sem depoimentos falsos, sem métricas inventadas, sem personagens fictícios.

---

## PROBLEMAS URGENTES — CORRIGIR PRIMEIRO

### 1. Conflito de merge em src/app/layout.tsx
O arquivo tem marcadores de merge não resolvidos (<<<<<<, =======, >>>>>>>).
Substituir o arquivo inteiro por esta versão limpa:

```tsx
import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Fluintech — Agentes de IA que executam o trabalho pesado",
  description:
    "Implementamos agentes de IA que executam o trabalho pesado para que sua equipe foque no que realmente importa. Do diagnóstico ao primeiro agente em 30 dias.",
  keywords: "agentes de IA, automação, n8n, WhatsApp, inteligência artificial, PME, Brasil",
  authors: [{ name: "Fluintech" }],
  creator: "Fluintech",
  publisher: "Fluintech",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.fluintech.com.br",
    siteName: "Fluintech",
    title: "Fluintech — Agentes de IA que executam o trabalho pesado",
    description:
      "Implementamos agentes de IA que executam o trabalho pesado para que sua equipe foque no que realmente importa.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@fluintech",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Suspense>
          {children}
        </Suspense>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 2. Redirect de /lista-espera
Adicionar ao next.config.mjs:

```js
async redirects() {
  return [
    { source: '/lista-espera', destination: '/', permanent: true },
  ]
}
```

---

## DESIGN SYSTEM

### Tokens de cor
Adicionar ao final do bloco :root em src/app/globals.css:

```css
/* Fluintech brand tokens */
--brand: #23C9B6;
--brand-hover: #1BA89A;
--brand-subtle: #23C9B614;
--brand-border: #23C9B633;
--surface: #0D1017;
--surface-card: #141820;
--surface-border: #1E2530;
--text-primary: #F0F2F5;
--text-secondary: #8892A0;
--text-muted: #3A4450;
```

Também adicionar ao bloco .dark as mesmas variáveis (os valores já são para dark mode).

### Regras visuais
- Fundo do site: var(--surface) que é #0D1017
- Cards e superfícies elevadas: var(--surface-card) que é #141820
- Bordas: 0.5px solid var(--surface-border)
- Cor primária e acentos: var(--brand) que é #23C9B6
- Texto principal: var(--text-primary)
- Texto secundário: var(--text-secondary)
- Border radius em botões: rounded-md (6px)
- Border radius em cards: rounded-xl (10px)
- Sem gradientes purple ou pink em nenhum componente
- Sem sombras decorativas
- Transições: duration-150 ease-in-out
- Referência de estilo: Linear.app — sóbrio, denso, confiável

### Tipografia
- Fonte: Geist Sans (já instalada via variável CSS)
- Headings: font-medium, tracking-tight
- Body: font-normal, leading-relaxed
- Label de seção: text-xs font-medium uppercase tracking-widest text-[--brand]
- Dois pesos apenas: 400 e 500. Nunca 600 ou 700.

---

## ESTRUTURA DA PÁGINA PRINCIPAL (src/app/page.tsx)

Reescrever o arquivo completamente. Componente chamado FluintechHome.

### Navbar
Sticky no topo com backdrop-blur ao fazer scroll.
Esquerda: logo (marca quadrada teal 24x24 com rounded-md + texto "Fluintech" em font-medium).
Centro: links de navegação em text-sm text-[--text-secondary].
Direita: botão "Falar com a Lia" em teal sólido.
Mobile: hamburger que abre menu vertical.

Links de navegação:
- "Como funciona" ancora para id="como-funciona"
- "Para quem" ancora para id="para-quem"
- "Contato" abre WhatsApp

### Hero (seção 1)
Badge no topo: pílula com ponto teal animado + texto "Agentes de IA para operações reais".
Headline: "Sua operação, comandada por agentes que agem."
Subheadline: "Implementamos agentes de IA que executam o trabalho pesado para que sua equipe foque no que realmente importa."
CTA principal: botão teal "Falar com a Lia" com ícone do WhatsApp.
CTA secundário: botão outline "Ver como funciona" que ancora para id="como-funciona".

Elemento visual abaixo dos CTAs: card horizontal com fundo surface-card mostrando o fluxo
do método em quatro etapas com ícones Lucide e labels: Diagnóstico, Especificação, Produção, Autonomia.
Setas separando cada etapa. Etapa "Produção" destacada com borda teal sutil.

Sem métricas animadas. Sem números inventados.

### Seção Problema (seção 2)
Label: "O problema"
Título: "A maioria das empresas tenta adotar IA e falha."
Subtítulo: "Não por falta de tecnologia. Por falta de método. Automatizar o processo errado é pior do que não automatizar nada."

Grid de 3 cards em surface-card:
Card 1: texto "Automações que quebram" em vermelho sutil acima de divisória, texto "Spec antes de build" em teal abaixo. Descrição: "O que for construído é exatamente o que foi acordado."
Card 2: texto "Bots que não escalam" acima, texto "Arquitetura real" abaixo. Descrição: "Agentes com estrutura para crescer junto com o negócio."
Card 3: texto "Dependência técnica permanente" acima, texto "Você opera com autonomia" abaixo. Descrição: "Transferimos o controle após a entrega."

### Seção Agentes (seção 3, id="como-funciona")
Label: "O que entregamos"
Título: "Agentes que agem de verdade."
Subtítulo: "Não entregamos bots de resposta automática."

Grid 2x2 de feature cards em surface-card:
Card 1: ícone Zap, título "Executam", descrição "Respondem, decidem, encaminham e registram sem intervenção humana constante."
Card 2: ícone Clock, título "Operam 24/7", descrição "Sem pausa, sem limite de horário. Sua operação não para."
Card 3: ícone TrendingUp, título "Escalam", descrição "Mais volume sem mais equipe. O agente cresce com a demanda."
Card 4: ícone BarChart3, título "Reportam", descrição "Você acompanha o que cada agente faz e por quê. Sem caixa preta."

### Seção Método (seção 4)
Label: "O método"
Título: "Do diagnóstico ao primeiro agente em 30 dias."
Subtítulo: "Um processo claro do início ao fim. Sem surpresas."

Container surface-card com borda, dividido em 4 colunas com divisórias verticais entre elas.
Em mobile empilhar verticalmente com divisórias horizontais.

Coluna 1: número "01" em teal, título "Diagnóstico", descrição "Mapeamos onde está o gargalo real e o que pode ser delegado a um agente."
Coluna 2: número "02" em teal, título "Especificação", descrição "Cada agente tem um documento aprovado por você antes de qualquer implementação."
Coluna 3: número "03" em teal, título "Produção", descrição "Primeiros resultados mensuráveis em semanas, não em meses."
Coluna 4: número "04" em teal, título "Autonomia", descrição "Sua equipe aprende a monitorar, ajustar e evoluir. Sem dependência técnica."

### Seção Para Quem (seção 5, id="para-quem")
Label: "Para quem"
Título: "Para quem é a Fluintech."
Subtítulo: "Não somos para todo mundo. Somos para quem quer resultado real."

Grid de 3 cards em surface-card:
Card 1: título "Startups", tag "Crescendo rápido, equipe enxuta", descrição "Escale operação sem escalar headcount. Agentes fazem o trabalho repetitivo para que seu time foque no que importa."
Card 2: título "Pequenas e médias empresas", tag "Processos manuais que não deveriam ser", descrição "Atendimento, agendamento, follow-up, triagem. Tudo que consome energia mas não precisa de decisão humana."
Card 3: título "Quem já tentou", tag "IA que não entregou o prometido", descrição "Automações que quebraram, bots que não escalaram. A diferença está no método que vem antes."

### CTA Final (seção 6)
Fundo: surface-card com borda superior
Alinhamento: centralizado
Título: "30 minutos. Diagnóstico real."
Subtítulo: "Mapeamos os processos da sua operação e mostramos onde agentes geram mais impacto. Sem pitch de venda. Sem compromisso."
Botão: teal, ícone MessageCircle, texto "Falar com a Lia no WhatsApp"
Texto abaixo do botão: "Resposta em minutos · 24/7" em text-muted

### Footer
Reutilizar src/components/footer.tsx com ajustes de cor (remover purple/pink, usar teal).
Copyright dinâmico: {new Date().getFullYear()} Fluintech. Todos os direitos reservados.
Redes sociais: YouTube, Instagram, Facebook com links corretos.
Links: Termos de Uso, Privacidade.

---

## LINK DO WHATSAPP
Usar em todos os CTAs do site:
https://wa.me/554431010224?text=Olá!+Quero+entender+como+a+Fluintech+pode+ajudar+minha+empresa.

Definir como constante no topo de page.tsx:
const WHATSAPP_URL = "https://wa.me/554431010224?text=Ol%C3%A1!+Quero+entender+como+a+Fluintech+pode+ajudar+minha+empresa."

---

## COMPONENTES A PRESERVAR SEM ALTERAÇÃO
- src/middleware.ts
- src/app/robots.ts
- src/app/termos/
- src/app/privacidade/
- src/components/ui/ (todos os shadcn)

## COMPONENTES A AJUSTAR
- src/components/footer.tsx: trocar cores purple/pink por teal, copyright dinâmico
- src/app/sitemap.ts: garantir que a URL base é https://www.fluintech.com.br

## COMPONENTES A REMOVER
- src/components/whatsapp-chat.tsx
- src/components/demo-modal.tsx
- src/app/lista-espera/ (pasta inteira, já tem redirect)

## COMPONENTES A AVALIAR ANTES DE REMOVER
- src/components/workflow-animation.tsx
- src/components/solutions-grid.tsx
Se não forem usados na nova page.tsx, remover.

---

## REGRAS ABSOLUTAS
1. Sem depoimentos de clientes
2. Sem métricas ou percentuais inventados
3. Sem a Lia como personagem visual no site (ela existe no WhatsApp, o site só direciona)
4. Sem lista de espera
5. Copyright sempre dinâmico via new Date().getFullYear()
6. Um único CTA em todo o site: WhatsApp da Lia
7. Sem traços em descrições de UI nos comentários do código
8. Sem gradientes purple ou pink em nenhum lugar

---

## ORDEM DE EXECUÇÃO
1. Corrigir src/app/layout.tsx (remover conflito de merge)
2. Atualizar next.config.mjs (redirect lista-espera)
3. Adicionar tokens de cor em src/app/globals.css
4. Reescrever src/app/page.tsx
5. Atualizar src/components/footer.tsx
6. Remover componentes desnecessários
7. Rodar pnpm build e corrigir erros de TypeScript
8. Testar em mobile (375px) e desktop (1280px)
9. Deploy na Vercel via git push
