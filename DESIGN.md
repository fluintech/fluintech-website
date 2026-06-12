# Fluintech Design System

Sistema de design usado no site institucional. Referência para todos os projetos internos.
Referência visual: **Linear.app** — sóbrio, minimalista, confiável.

---

## Princípios

1. **Fundo sempre escuro** — nunca fundo branco ou claro
2. **Sem gradientes coloridos** — zero purple, pink, rainbow; apenas radial sutis com emerald
3. **Sem sombras decorativas** — `box-shadow` só em hover de card com `--brand-glow`
4. **Bordas finas** — sempre `0.5px` ou `1px`, nunca 2px+
5. **Dois pesos de fonte** — `400` (normal) e `500` (medium). Nunca bold/700
6. **Transições curtas** — `duration-150` para hover, `duration-300` para transforms
7. **Easing consistente** — `cubic-bezier(0.16, 1, 0.3, 1)` para entradas, `ease-in-out` para loops

---

## Tokens de cor

Definidos em `globals.css` como CSS custom properties. **Nunca usar hex hardcoded no JSX — usar sempre os tokens.**

```css
/* Marca */
--brand: #00D992          /* emerald elétrico — CTA, ícones ativos, destaques */
--brand-hover: #2FD6A1    /* hover de elementos brand */
--brand-subtle: #00D99212 /* fundo de badges e áreas sutis brand */
--brand-border: #00D99238 /* bordas de elementos brand */
--brand-glow: #00D99226   /* glow de radial-gradient e box-shadow hover */

/* Superfícies */
--surface: #0A0A0A        /* fundo da página */
--surface-card: #131313   /* cards, footers, headers de nav */
--surface-border: #262626 /* bordas entre elementos */

/* Texto */
--text-primary: #F2F2F2   /* títulos, texto principal */
--text-secondary: #B0B8C1 /* corpo, descrições */
--text-muted: #6B7280     /* meta, labels, placeholders */

/* Sinais */
--signal-amber: #F5A623   /* aviso, pendente */
--signal-red: #F87171     /* erro, crítico */
```

### Como usar em Tailwind v4

```tsx
// CSS variable inline
<p style={{ color: "var(--brand)" }}>

// Tailwind arbitrary value
<p className="text-[--brand]">
<div className="border-[--surface-border]">
<div className="bg-[--surface-card]">

// Hover com CSS variable
<a className="hover:text-[--brand]">
<button className="hover:border-[--brand-border]">
```

---

## Tipografia

**Fontes:** Geist Sans (sans-serif) + Geist Mono (monospace) — self-hosted via `geist` npm package.

```tsx
// globals.css
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

// layout.tsx
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
<html className={`${GeistSans.variable} ${GeistMono.variable}`}>
```

### Escala de tamanhos

| Uso | Classe Tailwind | Peso |
|-----|----------------|------|
| Hero h1 | `text-4xl md:text-5xl` | `font-medium` |
| Section h2 | `text-3xl` | `font-medium` |
| Card h3 | `text-base` | `font-medium` |
| Body | `text-base` ou `text-sm` | normal |
| Meta / label | `text-xs` | `font-medium` |
| Mono badge | `text-[10px]` ou `text-xs` | `font-medium` |

### Labels de seção (padrão obrigatório)

Toda seção tem um label acima do título principal:

```tsx
<p className="font-mono text-xs font-medium uppercase tracking-widest mb-4"
   style={{ color: "var(--brand)" }}>
  Label da seção
</p>
<h2 className="text-3xl font-medium tracking-tight">
  Título da seção.
</h2>
```

### Tracking padrão

- Títulos: `tracking-tight`
- Labels mono uppercase: `tracking-widest`
- Corpo: padrão (sem classe)

---

## Layout e espaçamento

```tsx
// Container padrão — máximo 6xl, padding responsivo
<div className="max-w-6xl mx-auto px-4 lg:px-8">

// Seção padrão
<section style={{ borderTop: "1px solid var(--surface-border)" }}>
  <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">

// Conteúdo de blog/artigo — mais estreito
<div className="max-w-3xl mx-auto px-4 lg:px-8 py-16">
```

### Grid

```tsx
// 3 colunas (cards de feature)
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

// 2 colunas (hero + visual)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

// 4 colunas (steps/método)
<div className="grid grid-cols-1 md:grid-cols-4">

// Blog posts
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## Border radius

| Elemento | Classe |
|----------|--------|
| Botões | `rounded-md` |
| Ícone pequeno (24px) | `rounded-md` |
| Cards | `rounded-xl` |
| Badges / pills | `rounded` (pequeno) ou `rounded-full` (pill) |
| Inputs | `rounded-md` |

---

## Bordas

Sempre `1px solid`, nunca mais espessa. Cor via token.

```tsx
// Borda padrão entre elementos
style={{ border: "1px solid var(--surface-border)" }}

// Borda brand (badge, card ativo)
style={{ border: "1px solid var(--brand-border)" }}

// Borda de seção (separador horizontal)
style={{ borderTop: "1px solid var(--surface-border)" }}
```

---

## Componentes padrão

### Botão primário (CTA)

```tsx
<a
  href={CTA_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-colors duration-150"
  style={{
    background: "var(--brand)",
    color: "#0A0A0A",
  }}
>
  Texto do CTA
</a>
```

### Botão secundário (outline)

```tsx
<a
  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-colors duration-150 hover:border-[--brand-border] hover:text-[--brand]"
  style={{
    border: "1px solid var(--surface-border)",
    color: "var(--text-secondary)",
  }}
>
  Texto
</a>
```

### Card padrão

```tsx
<div
  className="rounded-xl p-5 card-interactive"
  style={{
    border: "1px solid var(--surface-border)",
    background: "var(--surface-card)",
  }}
>
  {/* conteúdo */}
</div>
```

A classe `card-interactive` (definida em globals.css) aplica hover lift + brand border automaticamente — não adicionar `onMouseEnter`/`onMouseLeave` para isso.

```css
.card-interactive {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease, box-shadow 0.3s ease;
}
.card-interactive:hover {
  transform: translateY(-4px);
  border-color: var(--brand-border) !important;
  box-shadow: 0 8px 32px -12px var(--brand-glow);
}
```

### Badge / Tag

```tsx
// Brand badge
<span
  className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded"
  style={{
    background: "var(--brand-subtle)",
    color: "var(--brand)",
    border: "1px solid var(--brand-border)",
  }}
>
  Label
</span>

// Neutro
<span
  className="font-mono text-xs px-2 py-1 rounded"
  style={{
    background: "var(--surface-card)",
    border: "1px solid var(--surface-border)",
    color: "var(--text-muted)",
  }}
>
  #tag
</span>
```

### Ícone em container

```tsx
<div
  className="w-8 h-8 rounded-md flex items-center justify-center"
  style={{
    background: "var(--brand-subtle)",
    border: "1px solid var(--brand-border)",
  }}
>
  <Icon className="w-4 h-4" style={{ color: "var(--brand)" }} />
</div>
```

Tamanhos: container `w-6/h-6` (nav), `w-8/h-8` (card feature), `w-10/h-10` (destaque).
Ícone sempre ~50% do container.

### Navbar sticky

```tsx
<header
  className="sticky top-0 z-50"
  style={{
    borderBottom: "1px solid var(--surface-border)",
    background: "color-mix(in srgb, var(--surface) 88%, transparent)",
    backdropFilter: "blur(12px)",
  }}
>
  <nav className="max-w-6xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
```

### Ícone social (footer)

```tsx
<a
  className="w-9 h-9 rounded-md flex items-center justify-center border transition-colors duration-150 hover:border-[--brand-border]"
  style={{ borderColor: "var(--surface-border)", color: "var(--text-muted)" }}
>
  <Icon className="w-4 h-4" />
</a>
```

---

## Animações

Todas definidas em `globals.css` `@layer utilities`. Usar via classe Tailwind.

### Reveal (scroll entrance)

Componente React que usa IntersectionObserver + classes CSS:

```tsx
// Wrapper — adicionar em torno de qualquer bloco que deve entrar com animação
<Reveal delay={150}>
  <div>conteúdo</div>
</Reveal>
```

```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

`prefers-reduced-motion` desativa automaticamente.

### Classes de animação disponíveis

| Classe | Efeito | Uso típico |
|--------|--------|-----------|
| `animate-fade-in-up` | Sobe 24px + fade in (0.5s) | Entradas one-shot |
| `animate-fade-in` | Fade in (0.4s) | Texto, overlays |
| `animate-glow-drift` | Glow flutuante lento (14s) | Backgrounds decorativos |
| `animate-float-soft` | Flutua ±8px (5s) | Elementos visuais |
| `animate-marquee` | Scroll horizontal infinito (28s) | Marquee de termos |
| `animate-caret` | Pisca cursor (1s step-end) | Cursor de texto animado |
| `pulse-ring` | Anel de pulso radial (2.4s) | Status "ao vivo" |
| `scanline-overlay` | Scanline verde deslizando (7s) | Painéis de dashboard |
| `beam-edge` | Beam luminoso no topo (3.5s) | Cards destacados |

### Glow radial decorativo

Padrão de fundo sutil — não usar gradientes visíveis:

```tsx
<div
  className="absolute pointer-events-none"
  aria-hidden="true"
  style={{
    background: "radial-gradient(circle, var(--brand-glow) 0%, transparent 65%)",
    filter: "blur(48px)",
  }}
/>
```

---

## Tipografia de blog / artigo

Classes semânticas em globals.css para renderização de Markdown:

```css
.blog-h1     /* 1.5rem, medium, --text-primary */
.blog-h2     /* 1.25rem, medium, --text-primary */
.blog-h3     /* 1.05rem, medium, --text-primary */
.blog-p      /* 0.9375rem, --text-secondary, line-height 1.75 */
.blog-strong /* medium, --text-primary */
.blog-ul     /* lista sem bullets nativos */
.blog-li     /* bullet customizado: ponto brand 4px */
```

Uso no parser de Markdown — substituir `<p>` → `<p class="blog-p">` etc.

---

## Scrollbar customizada

```css
::-webkit-scrollbar        { width: 6px; height: 6px; }
::-webkit-scrollbar-track  { background: var(--surface-card); }
::-webkit-scrollbar-thumb  { background: var(--surface-border); border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: var(--brand-border); }
* { scrollbar-width: thin; scrollbar-color: var(--surface-border) var(--surface-card); }
```

---

## Ícones

Biblioteca: **Lucide React** — `lucide-react`. Sem outras bibliotecas de ícones.

Tamanhos padrão: `w-3 h-3` (inline texto), `w-4 h-4` (default), `w-5 h-5` (prominente).
Cor sempre via `style={{ color: "var(--token)" }}`.

---

## Acessibilidade

- `lang="pt-BR"` no `<html>`
- `alt` descritivo em todas as imagens
- Botões sem texto visível: `aria-label`
- Links externos: `rel="noopener noreferrer"`
- `aria-hidden="true"` em elementos puramente decorativos
- Heading hierarchy: um `h1` por página, `h2` por seção, `h3` em cards
- Todas as animações CSS respeitam `prefers-reduced-motion`

---

## Stack técnica

```
Next.js 15       App Router, Server Components por padrão
Tailwind CSS v4  classes utilitárias
shadcn/ui        componentes base (new-york style) — nunca editar src/components/ui/
Geist Sans/Mono  tipografia — pacote geist
Lucide React     ícones
TypeScript       tipagem
pnpm             gerenciador de pacotes — nunca npm ou yarn
```

### Regras de componente

- Server Component por padrão
- `"use client"` apenas quando necessário: interatividade, hooks de estado, IntersectionObserver
- Props simples: tipar inline, sem `interface` separada
- Constantes globais: `UPPER_SNAKE_CASE`
- Arquivos de componente: `kebab-case.tsx`
- Componentes: `PascalCase`

---

## Proibido

| O que | Por que |
|-------|---------|
| Gradientes purple/pink/rainbow | Fora da identidade |
| `font-bold` / `font-semibold` | Só `font-medium` e normal |
| Sombras decorativas sem hover | Design plano, sem profundidade falsa |
| Cores hex hardcoded no JSX | Usar tokens CSS |
| `onMouseEnter`/`onMouseLeave` para hover de card | Usar `.card-interactive` |
| Métricas ou percentuais inventados | Conteúdo deve ser real |
| Traços longos (`—`) em UI | Substituir por vírgula ou dois pontos |
| `npm` ou `yarn` | Apenas `pnpm` |

---

## Checklist de nova página

- [ ] `lang="pt-BR"` herdado do layout raiz
- [ ] Um único `h1`
- [ ] `generateMetadata` com `title`, `description`, `canonical`, `openGraph`
- [ ] JSON-LD schema relevante (`Article`, `BreadcrumbList`, etc.)
- [ ] Fundo `var(--surface)` na raiz
- [ ] `overflow-x: hidden` no body (já em globals.css)
- [ ] Responsivo em 375px e 1280px
- [ ] `pnpm build` sem erros antes de commitar
