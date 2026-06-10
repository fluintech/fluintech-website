---
name: new-section
description: Use quando o usuário pedir para adicionar uma nova seção ou componente à página principal do site da Fluintech.
---

# Skill: Nova seção na home

## Checklist antes de criar

- [ ] A seção tem propósito claro e conteúdo real (sem placeholders)
- [ ] Não contém depoimentos, métricas inventadas ou clientes fictícios
- [ ] Segue o design system: fundo #0D1017, cards #141820, acentos #23C9B6
- [ ] Usa tokens CSS (var(--brand), var(--surface), etc) em vez de cores hardcoded
- [ ] É responsiva em 375px (mobile) e 1280px (desktop)
- [ ] Tem id= para ancoragem se for seção principal

## Estrutura padrão de uma seção

```tsx
<section className="py-14 px-8 border-b border-[--surface-border]" id="nome-da-secao">
  <div className="max-w-6xl mx-auto">
    <p className="text-xs font-medium uppercase tracking-widest text-[--brand] mb-3">
      Label da seção
    </p>
    <h2 className="text-2xl font-medium tracking-tight text-[--text-primary] max-w-xl mb-2">
      Título da seção
    </h2>
    <p className="text-sm text-[--text-secondary] max-w-lg mb-9 leading-relaxed">
      Subtítulo explicativo.
    </p>
    {/* Conteúdo da seção */}
  </div>
</section>
```

## Padrão de card

```tsx
<div className="bg-[--surface-card] border border-[--surface-border] rounded-xl p-5">
  <h3 className="text-sm font-medium text-[--text-primary] mb-1">Título</h3>
  <p className="text-xs text-[--text-secondary] leading-relaxed">Descrição.</p>
</div>
```

## Após criar a seção
1. Rodar pnpm build para verificar erros de TypeScript
2. Testar visualmente em mobile (375px) e desktop (1280px)
3. Verificar que o CTA (se houver) aponta para WHATSAPP_URL
