import type { Metadata } from "next"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogGrid } from "@/components/blog/blog-grid"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { Footer } from "@/components/footer"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog - Fluintech | Insights sobre IA e Automação",
  description:
    "Descubra as últimas tendências em inteligência artificial, automação de atendimento e transformação digital. Artigos especializados para empresas modernas.",
  keywords:
    "inteligência artificial, automação, chatbots, WhatsApp Business, atendimento automatizado, IA empresarial, transformação digital",
  authors: [{ name: "Equipe Fluintech" }],
  creator: "Fluintech",
  publisher: "Fluintech",
  robots: "index, follow",
  openGraph: {
    title: "Blog Fluintech - Insights sobre IA e Automação",
    description: "Descubra as últimas tendências em inteligência artificial e automação empresarial",
    url: "https://fluintech.com/blog",
    siteName: "Fluintech",
    images: [
      {
        url: "/blog-thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Fluintech - Insights sobre IA e Automação",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Fluintech - Insights sobre IA e Automação",
    description: "Descubra as últimas tendências em inteligência artificial e automação empresarial",
    images: ["/blog-thumbnail.jpg"],
    creator: "@fluintech",
  },
  alternates: {
    canonical: "https://fluintech.com/blog",
  },
}

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog Fluintech",
  description: "Insights sobre inteligência artificial, automação e transformação digital",
  url: "https://fluintech.com/blog",
  publisher: {
    "@type": "Organization",
    name: "Fluintech",
    logo: {
      "@type": "ImageObject",
      url: "https://fluintech.com/logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://fluintech.com/blog",
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <BlogHeader />

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            {/* Google Ads - Header Banner */}
            {/* 
            <div className="mb-8 text-center">
              <!-- Google Ads Header Banner 728x90 -->
              <!-- Adicionar código do Google Ads aqui -->
            </div>
            */}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <BlogGrid posts={posts} />
              </div>

              <aside className="lg:col-span-1">
                <BlogSidebar />

                {/* Google Ads - Sidebar */}
                {/* 
                <div className="mt-8">
                  <!-- Google Ads Sidebar 300x250 -->
                  <!-- Adicionar código do Google Ads aqui -->
                </div>
                */}
              </aside>
            </div>

            {/* Google Ads - Footer Banner */}
            {/* 
            <div className="mt-16 text-center">
              <!-- Google Ads Footer Banner 728x90 -->
              <!-- Adicionar código do Google Ads aqui -->
            </div>
            */}
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
