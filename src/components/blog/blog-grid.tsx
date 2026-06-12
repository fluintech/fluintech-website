import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
          <article
            className="h-full rounded-xl p-5 flex flex-col gap-3 card-interactive"
            style={{
              border: "1px solid var(--surface-border)",
              background: "var(--surface-card)",
            }}
          >
            <div className="flex items-center justify-between">
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
              {post.featured && (
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  destaque
                </span>
              )}
            </div>

            <h2
              className="text-sm font-medium leading-snug flex-1 transition-colors duration-150 group-hover:text-[--brand]"
              style={{ color: "var(--text-primary)" }}
            >
              {post.title}
            </h2>

            <p
              className="text-xs leading-relaxed line-clamp-3"
              style={{ color: "var(--text-secondary)" }}
            >
              {post.excerpt}
            </p>

            <div
              className="flex items-center gap-4 font-mono text-[10px] pt-1"
              style={{ color: "var(--text-muted)", borderTop: "1px solid var(--surface-border)" }}
            >
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
