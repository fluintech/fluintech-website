import { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"

const BASE = "https://www.fluintech.com.br"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const posts = await getAllPosts()
  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/termos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...blogPosts,
  ]
}
