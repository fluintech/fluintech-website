import type { Metadata } from "next"
import Link from "next/link"
import { Zap, Rss } from "lucide-react"
import { Footer } from "@/components/footer"
import { BlogGrid } from "@/components/blog/blog-grid"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog — Fluintech",
  description:
    "Insights sobre agentes de IA, automação de operações e engenharia de contexto para empresas que querem resultado real.",
  alternates: {
    canonical: "https://www.fluintech.com.br/blog",
    types: {
      "application/rss+xml": [
        { url: "https://www.fluintech.com.br/blog/rss.xml", title: "Blog Fluintech RSS" },
      ],
    },
  },
  openGraph: {
    title: "Blog — Fluintech",
    description: "Insights sobre agentes de IA, automação e engenharia de contexto.",
    url: "https://www.fluintech.com.br/blog",
    type: "website",
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)" }}>
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
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm transition-colors duration-150 hover:text-[--text-primary]"
              style={{ color: "var(--text-secondary)" }}
            >
              Home
            </Link>
            <a
              href="/blog/rss.xml"
              aria-label="RSS Feed"
              className="transition-colors duration-150 hover:text-[--brand]"
              style={{ color: "var(--text-muted)" }}
            >
              <Rss className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
        {/* Page header */}
        <div className="mb-12">
          <p
            className="font-mono text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: "var(--brand)" }}
          >
            Blog
          </p>
          <h1 className="text-3xl font-medium tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
            Insights sobre agentes de IA.
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Engenharia, automação e operações reais.
          </p>
        </div>

        {/* Post grid */}
        <BlogGrid posts={posts} />
      </main>

      <Footer />
    </div>
  )
}
