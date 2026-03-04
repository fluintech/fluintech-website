// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation"
import { getBlogPosts, incrementViews } from "@/lib/blog"
import { BlogGrid } from "@/components/blog/blog-grid"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const posts = await getBlogPosts()
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Post não encontrado - Fluintech Blog",
      robots: {
        index: false,
        follow: false,
      }
    }
  }

  // Extract first 155 characters for description if excerpt is too long
  const description = post.excerpt.length > 155 
    ? post.excerpt.substring(0, 152) + "..." 
    : post.excerpt

  // Generate keywords from post data
  const keywords = [
    post.category || "automação",
    "inteligência artificial",
    "chatbot",
    "atendimento automatizado",
    "transformação digital",
    "whatsapp business",
    ...(post.tags || [])
  ]

  return {
    title: `${post.title} | Blog Fluintech`,
    description: description,
    keywords: keywords,
    authors: [
      { 
        name: post.author || "Equipe Fluintech",
        url: "https://www.fluintech.com.br"
      }
    ],
    creator: "Fluintech",
    publisher: "Fluintech",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    },
    openGraph: {
      title: post.title,
      description: description,
      url: `https://www.fluintech.com.br/blog/${post.slug}`,
      siteName: "Fluintech",
      images: [
        {
          url: post.image || "/blog-thumbnail.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      locale: "pt_BR",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author || "Equipe Fluintech"],
      section: post.category || "Tecnologia",
      tags: post.tags || ["automação", "IA", "chatbot"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: [post.image || "/blog-thumbnail.jpg"],
      creator: "@fluintech",
      site: "@fluintech",
    },
    alternates: {
      canonical: `https://www.fluintech.com.br/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const posts = await getBlogPosts()
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Increment view count
  await incrementViews(post.slug)

  // Get updated post with incremented views
  const updatedPosts = await getBlogPosts()
  const updatedPost = updatedPosts.find((p) => p.slug === params.slug)!

  // Generate Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: updatedPost.title,
    description: updatedPost.excerpt,
    image: updatedPost.image || "https://www.fluintech.com.br/blog-thumbnail.jpg",
    datePublished: updatedPost.date,
    dateModified: updatedPost.updatedAt || updatedPost.date,
    author: {
      "@type": "Person",
      name: updatedPost.author || "Equipe Fluintech",
      url: "https://www.fluintech.com.br/sobre"
    },
    publisher: {
      "@type": "Organization",
      name: "Fluintech",
      url: "https://www.fluintech.com.br",
      logo: {
        "@type": "ImageObject",
        url: "https://www.fluintech.com.br/logo.png",
        width: 600,
        height: 60
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.fluintech.com.br/blog/${updatedPost.slug}`
    },
    url: `https://www.fluintech.com.br/blog/${updatedPost.slug}`,
    inLanguage: "pt-BR",
    wordCount: updatedPost.content?.split(/\s+/).length || 0,
    articleSection: updatedPost.category || "Tecnologia",
    keywords: updatedPost.tags?.join(", ") || "automação, IA, chatbot",
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ReadAction",
      userInteractionCount: updatedPost.views || 0
    }
  }

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: "https://www.fluintech.com.br"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.fluintech.com.br/blog"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: updatedPost.title,
        item: `https://www.fluintech.com.br/blog/${updatedPost.slug}`
      }
    ]
  }

  return (
    <>
      {/* Article Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} 
      />
      
      {/* Breadcrumb Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} 
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <article className="container mx-auto px-4 py-8">
          <BlogGrid posts={[updatedPost]} />
        </article>
      </div>
    </>
  )
}

// Generate static params for all blog posts (SSG)
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Revalidate every hour (ISR)
export const revalidate = 3600