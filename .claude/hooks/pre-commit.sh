#!/bin/bash
# Hook: PreCommit
# Roda build completo antes de qualquer commit do Claude Code
# Garante que nada quebrado vai para o repositório

echo "[hook] Verificando build antes do commit..."
cd "$(git rev-parse --show-toplevel)"

pnpm build 2>&1
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "[hook] BLOQUEADO: pnpm build falhou. Commit cancelado."
  echo "[hook] Corrija os erros de TypeScript e tente novamente."
  exit 2
fi

echo "[hook] Build OK. Commit autorizado."
exit 0
