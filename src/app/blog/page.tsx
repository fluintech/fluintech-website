// app/blog/page.tsx
import type { Metadata } from "next"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogGrid } from "@/components/blog/blog-grid"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { Footer } from "@/components/footer"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog Fluintech - Automação e IA para Empresas | Guias e Tutoriais",
  description:
    "Aprenda sobre automação de atendimento, chatbots com IA, WhatsApp Business e transformação digital. Guias práticos, casos de uso e tendências para empresas brasileiras.",
  keywords: [
    "blog automação empresarial",
    "inteligência artificial para negócios",
    "chatbot whatsapp tutorial",
    "automação de atendimento guia",
    "IA conversacional",
    "transformação digital empresas",
    "atendimento automatizado dicas",
    "whatsapp business automação",
    "como implementar chatbot",
    "ROI automação atendimento"
  ],
  authors: [{ name: "Equipe Fluintech", url: "https://www.fluintech.com.br" }],
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
    title: "Blog Fluintech - Automação e IA para Empresas",
    description: "Guias práticos sobre automação de atendimento, chatbots e transformação digital para empresas brasileiras",
    url: "https://www.fluintech.com.br/blog",
    siteName: "Fluintech",
    images: [
      {
        url: "/blog-thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Fluintech - Automação com IA e Chatbots para Empresas",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Fluintech - Automação e IA para Empresas",
    description: "Guias práticos sobre automação de atendimento, chatbots e transformação digital",
    images: ["/blog-thumbnail.jpg"],
    creator: "@fluintech",
    site: "@fluintech",
  },
  alternates: {
    canonical: "https://www.fluintech.com.br/blog",
    types: {
      'application/rss+xml': [
        {
          url: 'https://www.fluintech.com.br/blog/rss.xml',
          title: 'Blog Fluintech RSS Feed'
        }
      ],
    }
  },
}

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog Fluintech",
  description: "Insights sobre inteligência artificial, automação de atendimento e transformação digital para empresas brasileiras",
  url: "https://www.fluintech.com.br/blog",
  inLanguage: "pt-BR",
  publisher: {
    "@type": "Organization",
    name: "Fluintech",
    url: "https://www.fluintech.com.br",
    logo: {
      "@type": "ImageObject",
      url: "https://www.fluintech.com.br/logo.png",
      width: 600,
      height: 60,
    },
    sameAs: [
      "https://twitter.com/fluintech",
      "https://www.linkedin.com/company/fluintech",
      "https://www.instagram.com/fluintech"
    ]
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.fluintech.com.br/blog",
  },
}

// Breadcrumb structured data
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
    }
  ]
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      {/* JSON-LD for Blog */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />
      
      {/* JSON-LD for Breadcrumb */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} 
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <BlogHeader />

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            {/* SEO-friendly heading */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Blog Fluintech
              </h1>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Descubra como transformar seu negócio com automação inteligente e IA conversacional
              </p>
            </div>

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

              <aside className="lg:col-span-1" aria-label="Barra lateral do blog">
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