---
name: security-review
description: Use quando o usuário pedir revisão de segurança, antes de qualquer deploy em produção, ou ao adicionar novas rotas de API, server actions ou integrações externas.
---

# Skill: Revisão de segurança

## Checklist obrigatório

### Credenciais e segredos
- [ ] Nenhuma credencial hardcoded no código (JWT, API keys, tokens)
- [ ] Todas as variáveis sensíveis estão em .env.local ou Vercel env vars
- [ ] .env* está no .gitignore
- [ ] Nenhum console.log expõe dados sensíveis

### Server Actions e API Routes
- [ ] Inputs validados antes de qualquer operação
- [ ] Autenticação verificada em rotas protegidas
- [ ] Rate limiting aplicado em endpoints públicos
- [ ] Respostas de erro não expõem stack traces em produção
- [ ] Webhook URLs e tokens protegidos por variável de ambiente

### Headers de segurança (verificar src/middleware.ts)
- [ ] X-Frame-Options: DENY (proteção clickjacking)
- [ ] X-Content-Type-Options: nosniff
- [ ] Content-Security-Policy configurado
- [ ] Referrer-Policy: strict-origin-when-cross-origin

### Dependências
- [ ] Rodar auditoria de dependências
```bash
pnpm audit
```
- [ ] Sem dependências com vulnerabilidades críticas ou altas sem mitigação

### Next.js específico
- [ ] Variáveis prefixadas com NEXT_PUBLIC_ só expõem dados não sensíveis
- [ ] Server Components não passam dados sensíveis para Client Components
- [ ] Imagens externas com domínios explicitamente permitidos em next.config.mjs
- [ ] ignoreBuildErrors: false em produção (atualmente true — avaliar)

### MCP e integrações
- [ ] MCP servers usam apenas permissões mínimas necessárias
- [ ] Webhooks do n8n autenticados com Bearer token
- [ ] URLs de webhook não expostas no frontend

## Comandos de verificação
```bash
pnpm audit
pnpm build
grep -r "process.env" src/ --include="*.tsx" --include="*.ts"
grep -rn "console.log" src/ --include="*.tsx" --include="*.ts"
```
