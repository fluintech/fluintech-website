// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.fluintech.com.br'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Protege rotas de API
          '/admin/',         // Protege área administrativa
          '/_next/',         // Protege arquivos do Next.js
          '/private/',       // Qualquer área privada
          '/*.json$',        // Protege arquivos JSON
          '/dashboard/',     // Protege dashboard de clientes
        ],
      },
      {
        userAgent: 'GPTBot',  // OpenAI
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',  // ChatGPT
        disallow: '/',
      },
      {
        userAgent: 'CCBot',  // Common Crawl
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',  // Claude
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',  // Google Bard/Gemini
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}