// app/api/blog/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { createBlogPost } from "@/lib/blog"
import { z } from "zod"
import { headers } from "next/headers"

// Rate limiting map (em produção, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 }) // 1 hora
    return true
  }
  
  if (limit.count >= 10) { // Máximo 10 posts por hora
    return false
  }
  
  limit.count++
  return true
}

const createBlogSchema = z.object({
  slug: z
    .string()
    .min(3, "Slug deve ter pelo menos 3 caracteres")
    .max(100, "Slug deve ter no máximo 100 caracteres")
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens")
    .refine((slug) => !slug.startsWith('-') && !slug.endsWith('-'), {
      message: "Slug não pode começar ou terminar com hífen"
    }),
  title: z
    .string()
    .min(10, "Título deve ter pelo menos 10 caracteres")
    .max(200, "Título deve ter no máximo 200 caracteres"),
  content: z
    .string()
    .min(100, "Conteúdo deve ter pelo menos 100 caracteres")
    .max(50000, "Conteúdo muito longo (máximo 50.000 caracteres)"),
  excerpt: z
    .string()
    .min(50, "Resumo deve ter pelo menos 50 caracteres")
    .max(300, "Resumo deve ter no máximo 300 caracteres")
    .optional(),
  category: z
    .string()
    .min(2, "Categoria deve ter pelo menos 2 caracteres")
    .max(50, "Categoria muito longa")
    .optional(),
  tags: z
    .array(z.string().min(2).max(30))
    .max(10, "Máximo 10 tags")
    .optional(),
  author: z
    .string()
    .min(2, "Nome do autor deve ter pelo menos 2 caracteres")
    .max(100, "Nome do autor muito longo")
    .optional(),
  image: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true
      // Validate base64 image format
      return /^data:image\/(jpeg|jpg|png|gif|webp);base64,/.test(val) || /^[A-Za-z0-9+/]+=*$/.test(val)
    }, "Imagem deve estar em formato base64 válido"),
})

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          error: "Limite de requisições excedido",
          message: "Você pode criar no máximo 10 posts por hora"
        }, 
        { 
          status: 429,
          headers: {
            'Retry-After': '3600'
          }
        }
      )
    }

    // Check authorization header
    const authHeader = request.headers.get("authorization")
    const expectedToken = process.env.BLOG_API_TOKEN

    if (!expectedToken) {
      console.error("BLOG_API_TOKEN não configurado no .env")
      return NextResponse.json(
        { error: "Configuração inválida do servidor" }, 
        { status: 500 }
      )
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { 
          error: "Autenticação necessária",
          message: "Token de autorização Bearer necessário no header"
        }, 
        { status: 401 }
      )
    }

    const token = authHeader.replace("Bearer ", "")
    if (token !== expectedToken) {
      return NextResponse.json(
        { 
          error: "Token inválido",
          message: "O token de autenticação fornecido é inválido"
        }, 
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = createBlogSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          message: "Os dados fornecidos não atendem aos requisitos",
          details: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          })),
        },
        { status: 400 }
      )
    }

    const { 
      slug, 
      title,
      content, 
      excerpt,
      category,
      tags,
      author,
      image 
    } = validationResult.data

    // Process image if provided
    let imageData: string | undefined
    if (image) {
      if (image.startsWith("data:image/")) {
        // Remove data URL prefix to get pure base64
        imageData = image.split(",")[1]
      } else {
        // Assume it's already base64
        imageData = image
      }
      
      // Validate image size (max 5MB)
      const imageSizeInBytes = (imageData.length * 3) / 4
      const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
      
      if (imageSizeInBytes > maxSizeInBytes) {
        return NextResponse.json(
          {
            error: "Imagem muito grande",
            message: "A imagem não pode exceder 5MB"
          },
          { status: 400 }
        )
      }
    }

    // Generate excerpt if not provided
    const finalExcerpt = excerpt || content.substring(0, 155).trim() + "..."

    // Create blog post
    const newPost = await createBlogPost(slug, content, imageData)

    // Return success response
    return NextResponse.json(
      {
        success: true,
        post: {
          id: newPost.id,
          slug: newPost.slug,
          title: newPost.title,
          url: `https://www.fluintech.com.br/blog/${newPost.slug}`
        },
        message: "Post criado com sucesso"
      },
      { 
        status: 201,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    )
  } catch (error) {
    console.error("Erro ao criar blog post:", error)
    
    // Don't expose internal error details in production
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        message: "Ocorreu um erro ao processar sua solicitação",
        ...(isDevelopment && {
          details: error instanceof Error ? error.message : "Erro desconhecido"
        })
      },
      { status: 500 }
    )
  }
}

// Opcionalmente, adicione um GET endpoint para listar posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // Implementar lógica de paginação aqui
    // const posts = await getBlogPosts({ page, limit })
    
    return NextResponse.json({
      success: true,
      // posts,
      message: "Endpoint GET ainda não implementado completamente"
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar posts" },
      { status: 500 }
    )
  }
}