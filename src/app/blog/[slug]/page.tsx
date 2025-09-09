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
    }
  }

  return {
    title: `${post.title} - Fluintech Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image || "/blog-thumbnail.jpg"],
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image || "/blog-thumbnail.jpg"],
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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <BlogGrid posts={[updatedPost]} />
      </div>
    </div>
  )
}
