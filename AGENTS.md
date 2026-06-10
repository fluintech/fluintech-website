# AGENTS.md — Fluintech Website

## Contexto para subagentes e agentes paralelos

Este arquivo define como agentes paralelos do Claude Code devem se comportar
neste repositório. Leia junto com CLAUDE.md.

## Regras universais para todos os agentes

1. Nunca editar src/components/ui/ (componentes shadcn gerenciados)
2. Nunca commitar credenciais ou variáveis de ambiente reais
3. Nunca fazer git push sem confirmação explícita do usuário principal
4. Sempre rodar pnpm build antes de declarar uma tarefa concluída
5. Sem depoimentos, métricas inventadas ou clientes fictícios no conteúdo

## Agente: frontend
Responsabilidade: src/app/page.tsx, src/components/*.tsx, src/app/globals.css
Pode: editar, criar componentes, ajustar estilos
Não pode: modificar middleware, robots, termos, privacidade

## Agente: seo
Responsabilidade: src/app/layout.tsx, src/app/sitemap.ts, src/app/robots.ts, metadados
Pode: atualizar metadata, Open Graph, títulos, descrições
Não pode: modificar lógica de negócio ou componentes visuais

## Agente: security-reviewer
Responsabilidade: revisão de código antes de deploy
Deve executar: skill security-review completo
Reporta para: agente principal com lista de issues encontrados

## Padrão de handoff entre agentes
Ao finalizar uma tarefa, o agente deve:
1. Listar arquivos modificados
2. Confirmar que pnpm build passa sem erros
3. Indicar se há pendências para o próximo agente
