"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Eye, Share2, Facebook, Twitter, Linkedin, Copy } from "lucide-react"
import Image from "next/image"
import type { BlogPost } from "@/lib/blog"
import { parseMarkdown } from "@/lib/markdown"
import { useToast } from "@/hooks/use-toast"

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [shareDropdown, setShareDropdown] = useState<string | null>(null)
  const { toast } = useToast()

  const sharePost = (platform: string, post: BlogPost) => {
    const url = `${window.location.origin}/blog/${post.slug}`
    const text = `${post.title} - ${post.excerpt}`

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url,
    }

    if (platform === "copy") {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast({
            title: "Link copiado!",
            description: "O link do artigo foi copiado para a área de transferência.",
            variant: "default",
          })
        })
        .catch(() => {
          toast({
            title: "Erro ao copiar",
            description: "Não foi possível copiar o link. Tente novamente.",
            variant: "destructive",
          })
        })
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
      toast({
        title: "Compartilhando...",
        description: `Abrindo ${platform === "facebook" ? "Facebook" : platform === "twitter" ? "Twitter" : "LinkedIn"} para compartilhar o artigo.`,
        variant: "default",
      })
    }
    setShareDropdown(null)
  }

  if (selectedPost) {
    return (
      <article className="bg-black/20 rounded-2xl border border-purple-500/20 overflow-hidden">
        <div className="relative h-64 md:h-96">
          <Image
            src={selectedPost.image || "/placeholder.svg"}
            alt={selectedPost.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Button
            onClick={() => setSelectedPost(null)}
            className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white cursor-pointer transition-all duration-200 hover:scale-105"
          >
            ← Voltar
          </Button>
          <div className="absolute top-4 right-4">
            <div className="relative">
              <Button
                onClick={() => setShareDropdown(shareDropdown === selectedPost.id ? null : selectedPost.id)}
                className="bg-black/50 hover:bg-black/70 text-white cursor-pointer transition-all duration-200 hover:scale-105"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              {shareDropdown === selectedPost.id && (
                <div className="absolute top-full right-0 mt-2 bg-black/90 border border-purple-500/30 rounded-lg p-2 min-w-[200px] z-50">
                  <div className="space-y-2">
                    <Button
                      onClick={() => sharePost("facebook", selectedPost)}
                      className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      onClick={() => sharePost("twitter", selectedPost)}
                      className="w-full justify-start bg-sky-500 hover:bg-sky-600 text-white cursor-pointer"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button
                      onClick={() => sharePost("linkedin", selectedPost)}
                      className="w-full justify-start bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button
                      onClick={() => sharePost("copy", selectedPost)}
                      className="w-full justify-start bg-gray-600 hover:bg-gray-700 text-white cursor-pointer"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar Link
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className="bg-purple-600 text-white">{selectedPost.category}</Badge>
            <div className="flex items-center text-purple-200 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(selectedPost.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="flex items-center text-purple-200 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {selectedPost.readTime}
            </div>
            <div className="flex items-center text-purple-200 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              {selectedPost.views} visualizações
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">{selectedPost.title}</h1>

          <div className="prose prose-invert prose-purple max-w-none">
            <div
              className="text-lg leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(selectedPost.content) }}
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {selectedPost.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-purple-500 text-purple-200">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog Fluintech</h1>
        <p className="text-xl text-purple-200 max-w-2xl mx-auto">
          Insights sobre inteligência artificial, automação e transformação digital para empresas modernas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Card
            key={post.id}
            className={`bg-black/20 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 cursor-pointer ${
              post.featured ? "md:col-span-2" : ""
            }`}
            onClick={() => setSelectedPost(post)}
          >
            <div className="relative h-48 md:h-64">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover rounded-t-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-purple-600 text-white">{post.category}</Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge variant="outline" className="bg-black/50 border-purple-500 text-white text-xs">
                  <Eye className="w-3 h-3 mr-1" />
                  {post.views}
                </Badge>
                <div className="relative">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShareDropdown(shareDropdown === post.id ? null : post.id)
                    }}
                    size="sm"
                    className="bg-black/50 hover:bg-black/70 text-white cursor-pointer transition-all duration-200 hover:scale-105 p-2"
                  >
                    <Share2 className="w-3 h-3" />
                  </Button>
                  {shareDropdown === post.id && (
                    <div className="absolute top-full right-0 mt-2 bg-black/90 border border-purple-500/30 rounded-lg p-2 min-w-[180px] z-50">
                      <div className="space-y-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            sharePost("facebook", post)
                          }}
                          className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white cursor-pointer text-xs"
                          size="sm"
                        >
                          <Facebook className="w-3 h-3 mr-2" />
                          Facebook
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            sharePost("twitter", post)
                          }}
                          className="w-full justify-start bg-sky-500 hover:bg-sky-600 text-white cursor-pointer text-xs"
                          size="sm"
                        >
                          <Twitter className="w-3 h-3 mr-2" />
                          Twitter
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            sharePost("linkedin", post)
                          }}
                          className="w-full justify-start bg-blue-700 hover:bg-blue-800 text-white cursor-pointer text-xs"
                          size="sm"
                        >
                          <Linkedin className="w-3 h-3 mr-2" />
                          LinkedIn
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            sharePost("copy", post)
                          }}
                          className="w-full justify-start bg-gray-600 hover:bg-gray-700 text-white cursor-pointer text-xs"
                          size="sm"
                        >
                          <Copy className="w-3 h-3 mr-2" />
                          Copiar Link
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <CardHeader>
              <h2
                className={`font-bold text-white hover:text-purple-300 transition-colors ${
                  post.featured ? "text-2xl md:text-3xl" : "text-xl"
                }`}
              >
                {post.title}
              </h2>
            </CardHeader>

            <CardContent>
              <p className="text-purple-200 mb-4 leading-relaxed">{post.excerpt}</p>

              <div className="flex items-center justify-between text-sm text-purple-300">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views} views
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
