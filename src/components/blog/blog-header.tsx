"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X } from "lucide-react"
import Link from "next/link"

export function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-purple-900/90 backdrop-blur-md border-b border-purple-700/30">
      <nav className="max-w-7xl mx-auto px-4 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
            </div>
            <span className="text-xl font-bold text-white">Fluintech</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white/90 hover:text-white transition-colors">
              Início
            </Link>
            <Link href="/blog" className="text-white font-medium">
              Blog
            </Link>
            <Link href="/#solucoes" className="text-white/90 hover:text-white transition-colors">
              Soluções
            </Link>
            <Link href="/#contato" className="text-white/90 hover:text-white transition-colors">
              Contato
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
              <Input
                type="search"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-purple-800/50 border-purple-600 text-white placeholder:text-purple-300 focus:border-purple-400"
              />
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer">
              Assinar Newsletter
            </Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-purple-700/30 pt-4">
            <div className="space-y-4">
              <Link href="/" className="block text-white/90 hover:text-white">
                Início
              </Link>
              <Link href="/blog" className="block text-white font-medium">
                Blog
              </Link>
              <Link href="/#solucoes" className="block text-white/90 hover:text-white">
                Soluções
              </Link>
              <Link href="/#contato" className="block text-white/90 hover:text-white">
                Contato
              </Link>
              <div className="pt-4">
                <Input
                  type="search"
                  placeholder="Buscar artigos..."
                  className="mb-4 bg-purple-800/50 border-purple-600 text-white placeholder:text-purple-300"
                />
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer">
                  Assinar Newsletter
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
