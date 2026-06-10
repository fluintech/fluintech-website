#!/bin/bash
# Hook: PostToolUse
# Roda pnpm lint automaticamente após qualquer edição de arquivo .ts ou .tsx
# Saída não-zero bloqueia a ação seguinte do Claude Code

TOOL_NAME="${CLAUDE_TOOL_NAME}"
FILE_PATH="${CLAUDE_FILE_PATH}"

if [[ "$TOOL_NAME" == "Write" || "$TOOL_NAME" == "Edit" || "$TOOL_NAME" == "MultiEdit" ]]; then
  if [[ "$FILE_PATH" == *.ts || "$FILE_PATH" == *.tsx ]]; then
    echo "[hook] Arquivo TypeScript editado: $FILE_PATH"
    echo "[hook] Rodando lint..."
    cd "$(git rev-parse --show-toplevel)" && pnpm lint --quiet 2>&1
    EXIT_CODE=$?
    if [ $EXIT_CODE -ne 0 ]; then
      echo "[hook] BLOQUEADO: lint falhou. Corrija os erros antes de continuar."
      exit 2
    fi
    echo "[hook] Lint OK"
  fi
fi

exit 0
