---
name: deploy
description: Use quando o usuário pedir para fazer deploy, publicar o site ou enviar alterações para produção. Guia o processo completo de verificação antes de push.
---

# Skill: Deploy para produção

## Quando usar
Sempre que for solicitado deploy, publicação ou push para main.

## Passos obrigatórios em ordem

1. Verificar se há mudanças não commitadas
```bash
git status
git diff --stat
```

2. Rodar build completo e garantir zero erros
```bash
pnpm build
```

3. Verificar lint
```bash
pnpm lint
```

4. Revisar o diff final antes do commit
```bash
git diff --staged
```

5. Confirmar com o usuário antes de qualquer push
Nunca fazer push sem confirmação explícita do usuário.

6. Commit com mensagem semântica
```bash
git add .
git commit -m "tipo: descrição curta do que mudou"
```

Tipos válidos: feat, fix, docs, style, refactor, chore

7. Push somente após confirmação
```bash
git push origin main
```

## Regras
- Nunca usar git push --force
- Nunca fazer deploy com erros de TypeScript
- Deploy na Vercel acontece automaticamente após push na main
- Verificar o painel da Vercel após push para confirmar deploy bem-sucedido
