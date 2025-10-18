// app/sitemap.ts - Versão com conteúdo dinâmico seguro
import { MetadataRoute } from 'next'

// Tipos para segurança
interface BlogPost {
  slug: string
  updatedAt: string
  priority?: number
}

interface CaseStudy {
  slug: string
  updatedAt: string
}

// Função helper para validar URLs
function sanitizeSlug(slug: string): string {
  // Remove caracteres perigosos e mantém apenas alfanuméricos, hífens e underscores
  return slug.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase()
}

// Função para buscar posts do blog de forma segura
async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // Exemplo com CMS (Contentful, Sanity, etc)
    // const posts = await client.getEntries({ content_type: 'blogPost' })
    
    // Exemplo com sistema de arquivos (MDX)
    // const posts = await getLocalBlogPosts()
    
    // Por enquanto, retorna array vazio
    // Substitua pela sua implementação real
    return []
  } catch (error) {
    console.error('Erro ao buscar posts do blog:', error)
    return [] // Retorna array vazio em caso de erro
  }
}

// Função para buscar casos de sucesso
async function fetchCaseStudies(): Promise<CaseStudy[]> {
  try {
    // Sua implementação aqui
    return []
  } catch (error) {
    console.error('Erro ao buscar casos de sucesso:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fluintech.com.br'
  const currentDate = new Date()

  // Páginas estáticas principais
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/solucoes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solucoes/chatbot-whatsapp`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solucoes/agendamento-automatico`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solucoes/automacao-processos`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solucoes/analytics-ia`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/precos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/casos-de-sucesso`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/termos-de-uso`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Buscar posts do blog de forma segura
  const blogPosts = await fetchBlogPosts()
  const blogPages: MetadataRoute.Sitemap = blogPosts
    .filter(post => post.slug && post.slug.trim() !== '') // Valida slugs
    .map((post) => ({
      url: `${baseUrl}/blog/${sanitizeSlug(post.slug)}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : currentDate,
      changeFrequency: 'monthly' as const,
      priority: post.priority || 0.7,
    }))

  // Buscar casos de sucesso
  const caseStudies = await fetchCaseStudies()
  const casePages: MetadataRoute.Sitemap = caseStudies
    .filter(cs => cs.slug && cs.slug.trim() !== '')
    .map((cs) => ({
      url: `${baseUrl}/casos-de-sucesso/${sanitizeSlug(cs.slug)}`,
      lastModified: cs.updatedAt ? new Date(cs.updatedAt) : currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // Combina todos os sitemaps
  return [...staticPages, ...blogPages, ...casePages]
}

// Configuração de revalidação (ISR)
export const revalidate = 3600 // Revalida a cada 1 hora