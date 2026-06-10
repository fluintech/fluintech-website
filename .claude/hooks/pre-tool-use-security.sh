#!/bin/bash
# Hook: PreToolUse — Segurança
# Bloqueia tentativas de ler ou expor arquivos sensíveis
# e padrões suspeitos de prompt injection

TOOL_NAME="${CLAUDE_TOOL_NAME}"
FILE_PATH="${CLAUDE_FILE_PATH:-}"
COMMAND="${CLAUDE_COMMAND:-}"

# Bloqueia leitura de arquivos de credenciais
SENSITIVE_FILES=(".env" ".env.local" ".env.production" "*.pem" "*.key" "id_rsa" ".npmrc" ".netrc")
for pattern in "${SENSITIVE_FILES[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "[security] BLOQUEADO: tentativa de acessar arquivo sensível: $FILE_PATH"
    exit 2
  fi
done

# Bloqueia comandos suspeitos mesmo que não estejam na deny list
DANGEROUS_PATTERNS=("base64 -d" "eval " "exec(" "> /dev/tcp" "nc -e" "bash -i" "/etc/passwd" "/etc/shadow")
for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if [[ "$COMMAND" == *"$pattern"* ]]; then
    echo "[security] BLOQUEADO: padrão suspeito detectado: $pattern"
    exit 2
  fi
done

exit 0
