import { type NextRequest, NextResponse } from "next/server"
import { createBlogPost } from "@/lib/blog"
import { z } from "zod"

const createBlogSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug é obrigatório")
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  content: z.string().min(10, "Conteúdo deve ter pelo menos 10 caracteres"),
  image: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true
      // Validate base64 image format
      return /^data:image\/(jpeg|jpg|png|gif);base64,/.test(val) || /^[A-Za-z0-9+/]+=*$/.test(val)
    }, "Imagem deve estar em formato base64 válido"),
})

export async function POST(request: NextRequest) {
  try {
    // Check authorization header
    const authHeader = request.headers.get("authorization")
    const expectedToken = process.env.BLOG_API_TOKEN || "fluintech-blog-2024"

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Token de autorização necessário" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    if (token !== expectedToken) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 })
    }

    const body = await request.json()

    const validationResult = createBlogSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: validationResult.error.errors,
        },
        { status: 400 },
      )
    }

    const { slug, content, image } = validationResult.data

    let imageData: string | undefined
    if (image) {
      if (image.startsWith("data:image/")) {
        // Remove data URL prefix to get pure base64
        imageData = image.split(",")[1]
      } else {
        // Assume it's already base64
        imageData = image
      }
    }

    const newPost = await createBlogPost(slug, content, imageData)

    return NextResponse.json({
      success: true,
      post: newPost,
      message: "Blog criado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao criar blog:", error)
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
