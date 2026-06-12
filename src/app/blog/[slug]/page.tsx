import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Zap } from "lucide-react"
import { getAllPosts } from "@/lib/blog"
import { parseMarkdown } from "@/lib/markdown"
import { Footer } from "@/components/footer"
import { ShareButtons } from "@/components/blog/share-buttons"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const posts = await getAllPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) return { title: "Post não encontrado — Fluintech", robots: { index: false, follow: false } }

  const description = post.excerpt.length > 155 ? post.excerpt.slice(0, 152) + "..." : post.excerpt

  return {
    title: `${post.title} — Blog Fluintech`,
    description,
    alternates: { canonical: `https://www.fluintech.com.br/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      url: `https://www.fluintech.com.br/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author ?? "Equipe Fluintech"],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export const revalidate = 3600

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const posts = await getAllPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) notFound()

  const postUrl = `https://www.fluintech.com.br/blog/${post.slug}`

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: { "@type": "Person", name: post.author ?? "Equipe Fluintech" },
    publisher: { "@type": "Organization", name: "Fluintech", url: "https://www.fluintech.com.br" },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    image: { "@type": "ImageObject", url: `${postUrl}/opengraph-image`, width: 1200, height: 630 },
    inLanguage: "pt-BR",
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.fluintech.com.br" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.fluintech.com.br/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Navbar */}
      <header
        className="sticky top-0 z-50"
        style={{
          borderBottom: "1px solid var(--surface-border)",
          background: "color-mix(in srgb, var(--surface) 88%, transparent)",
          backdropFilter: "blur(12px)",
        }}
      >
        <nav className="max-w-6xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "var(--brand-subtle)", border: "1px solid var(--brand-border)" }}
              aria-hidden="true"
            >
              <Zap className="w-3.5 h-3.5" style={{ color: "var(--brand)" }} />
            </div>
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>
              Fluintech
            </span>
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm transition-colors duration-150 hover:text-[--brand]"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Blog
          </Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-4 lg:px-8 py-16">
        {/* Article header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded"
              style={{
                background: "var(--brand-subtle)",
                color: "var(--brand)",
                border: "1px solid var(--brand-border)",
              }}
            >
              {post.category}
            </span>
          </div>

          <h1
            className="text-2xl md:text-3xl font-medium tracking-tight leading-snug mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {post.title}
          </h1>

          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            {post.excerpt}
          </p>

          <div
            className="flex items-center gap-5 font-mono text-xs pb-6"
            style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--surface-border)" }}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            {post.author && <span>{post.author}</span>}
          </div>
        </header>

        {/* Article body */}
        <div
          className="mb-12"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div
            className="flex flex-wrap gap-2 pt-6"
            style={{ borderTop: "1px solid var(--surface-border)" }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-1 rounded"
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--text-muted)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <ShareButtons
          url={`https://www.fluintech.com.br/blog/${post.slug}`}
          title={post.title}
        />

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-150 hover:text-[--brand]"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Blog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
