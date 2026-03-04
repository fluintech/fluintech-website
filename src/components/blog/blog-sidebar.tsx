"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, TrendingUp, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import { subscribeToNewsletter } from "@/app/actions/newsletter"
import { getCategories, getPopularPosts, getPopularTags, type BlogPost } from "@/lib/blog"
import { useToast } from "@/hooks/use-toast"

export function BlogSidebar() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { toast } = useToast()

  const [categories, setCategories] = useState<{ name: string; count: number }[]>([])
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([])
  const [tags, setTags] = useState<{ name: string; count: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, postsData, tagsData] = await Promise.all([
          getCategories(),
          getPopularPosts(3),
          getPopularTags(),
        ])

        setCategories(categoriesData)
        setPopularPosts(postsData)
        setTags(tagsData)
      } catch (error) {
        console.error("Error loading sidebar data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    try {
      const result = await subscribeToNewsletter(email)

      if (result.success) {
        toast({
          title: "Inscrição realizada!",
          description: "Você receberá nossos insights semanais sobre IA e automação.",
          variant: "default",
        })
        setEmail("")
      } else {
        toast({
          title: "Erro na inscrição",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Não foi possível processar sua inscrição. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-48 bg-purple-800/20 rounded-lg mb-6"></div>
          <div className="h-32 bg-purple-800/20 rounded-lg mb-6"></div>
          <div className="h-40 bg-purple-800/20 rounded-lg mb-6"></div>
          <div className="h-24 bg-purple-800/20 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-200 mb-4 text-sm">
            Receba insights semanais sobre IA e automação direto no seu email.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/20 border-purple-500/50 text-white placeholder:text-purple-300"
              required
            />
            <Button
              type="submit"
              disabled={isSubscribing}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer transition-all duration-200 hover:scale-105"
            >
              {isSubscribing ? "Inscrevendo..." : "Assinar Grátis"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="bg-black/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-800/20 cursor-pointer transition-all duration-200 hover:scale-105"
                >
                  <span className="text-purple-200 text-sm">{category.name}</span>
                  <Badge variant="outline" className="border-purple-500 text-purple-300 text-xs">
                    {category.count}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-purple-300 text-sm">Nenhuma categoria encontrada</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card className="bg-black/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Mais Populares
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularPosts.length > 0 ? (
              popularPosts.map((post, index) => (
                <div key={post.id} className="border-b border-purple-700/30 pb-3 last:border-b-0">
                  <h4 className="text-white text-sm font-medium mb-2 hover:text-purple-300 cursor-pointer transition-colors">
                    {post.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-purple-300">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                    <span>{post.views} visualizações</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-purple-300 text-sm">Nenhum post popular encontrado</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card className="bg-black/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">Tags Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <Badge
                  key={tag.name}
                  variant="outline"
                  className="border-purple-500 text-purple-200 hover:bg-purple-800/30 cursor-pointer transition-colors text-xs"
                >
                  #{tag.name} ({tag.count})
                </Badge>
              ))
            ) : (
              <p className="text-purple-300 text-sm">Nenhuma tag encontrada</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
