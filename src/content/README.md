# Blog Content Directory

Este diretório contém todos os artigos do blog em formato Markdown. Cada arquivo representa um post individual com metadados no frontmatter.

## Estrutura dos Arquivos

Cada arquivo Markdown deve seguir esta estrutura:

\`\`\`markdown
---
title: "Título do Artigo"
excerpt: "Resumo breve do conteúdo"
author: "Nome do Autor"
date: "YYYY-MM-DD"
readTime: "X min"
category: "Categoria"
image: "/caminho/para/imagem.jpg"
tags: ["tag1", "tag2", "tag3"]
featured: true/false (opcional)
---

Conteúdo do artigo em Markdown...
\`\`\`

## Campos Obrigatórios

- **title**: Título principal do artigo
- **excerpt**: Resumo que aparece na listagem
- **author**: Nome do autor
- **date**: Data de publicação (formato YYYY-MM-DD)
- **readTime**: Tempo estimado de leitura
- **category**: Categoria principal do artigo
- **image**: Caminho para a imagem de capa
- **tags**: Array de tags relacionadas

## Campos Opcionais

- **featured**: Define se o artigo é destacado (aparece maior na grid)

## Como Adicionar Novos Posts

1. Crie um novo arquivo `.md` neste diretório
2. Use um nome descritivo no formato `slug-do-artigo.md`
3. Adicione o frontmatter com todos os campos obrigatórios
4. Escreva o conteúdo em Markdown
5. O artigo aparecerá automaticamente no blog

## Exemplo de Nome de Arquivo

- `ia-generativa-atendimento-2024.md`
- `whatsapp-business-marketing-2024.md`
- `roi-automacao-metricas-chatbots.md`

Os arquivos são automaticamente ordenados por data (mais recentes primeiro).
