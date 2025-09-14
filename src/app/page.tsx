"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WhatsAppChat } from "@/components/whatsapp-chat"
import { WorkflowSection } from "@/components/workflow-section"
import { SolutionsGrid } from "@/components/solutions-grid"
import { Footer } from "@/components/footer"
import { DemoModal } from "@/components/demo-modal"
import { Menu, X, Play, ArrowRight, Zap, Star } from "lucide-react"

export default function FluintechLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({ reduction: 0, availability: 0, efficiency: 0 })
  const [floatingDots, setFloatingDots] = useState<Array<{left: string, delay: string, duration: string}>>([])

  useEffect(() => {
    // Generate floating dots only on client side to avoid hydration mismatch
    const dots = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 4}s`
    }))
    setFloatingDots(dots)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({ reduction: 70, availability: 24, efficiency: 3 })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 scrollbar scrollbar-w-1 scrollbar-track-purple-900/5 scrollbar-thumb-purple-400/20 hover:scrollbar-thumb-purple-400/40 scrollbar-track-rounded scrollbar-thumb-rounded">
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.05);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.2);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.4);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .floating-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(139, 92, 246, 0.3);
          border-radius: 50%;
          animation: float 8s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      <div className="floating-elements">
        {floatingDots.map((dot, i) => (
          <div
            key={i}
            className="floating-dot"
            style={{
              left: dot.left,
              animationDelay: dot.delay,
              animationDuration: dot.duration,
            }}
          />
        ))}
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-purple-900/80 backdrop-blur-md border-b border-purple-700/30 px-4 py-4 lg:px-8 transition-all duration-300">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
              <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
            </div>
            <span className="text-xl font-bold text-white">Fluintech</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-white/90 hover:text-white transition-all duration-300 hover:scale-105">
              Início
            </a>
            <a href="#solucoes" className="text-white/90 hover:text-white transition-all duration-300 hover:scale-105">
              Soluções
            </a>
            <a href="#sobre" className="text-white/90 hover:text-white transition-all duration-300 hover:scale-105">
              Sobre
            </a>
            <a href="/blog" className="text-white/90 hover:text-white transition-all duration-300 hover:scale-105">
              Blog
            </a>
            <a href="#contato" className="text-white/90 hover:text-white transition-all duration-300 hover:scale-105">
              Contato
            </a>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer">
              Comece Agora
            </Button>
          </div>

          <button
            className="md:hidden text-white transition-transform hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-purple-900/95 backdrop-blur-sm border-t border-purple-700 animate-in slide-in-from-top duration-300">
            <div className="px-4 py-6 space-y-4">
              <a
                href="#inicio"
                className="block text-white/90 hover:text-white transition-all duration-300 hover:translate-x-2"
              >
                Início
              </a>
              <a
                href="#solucoes"
                className="block text-white/90 hover:text-white transition-all duration-300 hover:translate-x-2"
              >
                Soluções
              </a>
              <a
                href="#sobre"
                className="block text-white/90 hover:text-white transition-all duration-300 hover:translate-x-2"
              >
                Sobre
              </a>
              <a
                href="/blog"
                className="block text-white/90 hover:text-white transition-all duration-300 hover:translate-x-2"
              >
                Blog
              </a>
              <a
                href="#contato"
                className="block text-white/90 hover:text-white transition-all duration-300 hover:translate-x-2"
              >
                Contato
              </a>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 transition-all duration-300 hover:scale-105 cursor-pointer">
                Comece Agora
              </Button>
            </div>
          </div>
        )}
      </header>

      <section id="inicio" className="px-4 py-16 lg:px-8 lg:py-24 pt-32 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-purple-700/50 text-purple-200 border-purple-600 hover:bg-purple-700/60 transition-all duration-300 hover:scale-105">
                <Zap className="w-4 h-4 mr-2" />
                Tecnologia de IA de Última Geração
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
                Automatize seu atendimento com{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  inteligência artificial
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-purple-200 mb-8 text-pretty">
                Transforme sua operação com agentes inteligentes que atendem clientes 24/7 e otimizam agendamentos
                automaticamente.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 cursor-pointer"
                >
                  Comece sua automação hoje
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-400 text-purple-200 hover:bg-purple-800/50 hover:border-purple-300 text-lg px-8 py-4 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer"
                  onClick={() => setIsDemoOpen(true)}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Ver demonstração
                </Button>
              </div>
            </div>

            <div className="relative">
              <WhatsAppChat />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="text-center transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{animatedStats.reduction}%</div>
              <p className="text-purple-300">Redução no tempo de resposta</p>
            </div>
            <div className="text-center transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{animatedStats.availability}/7</div>
              <p className="text-purple-300">Atendimento automatizado</p>
            </div>
            <div className="text-center transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{animatedStats.efficiency}x</div>
              <p className="text-purple-300">Mais eficiência operacional</p>
            </div>
          </div>
        </div>
      </section>

      <SolutionsGrid />

      <WorkflowSection />

      <section className="px-4 py-16 lg:px-8 lg:py-24 bg-black/20 fade-in-section">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-yellow-400 fill-current transition-all duration-300 hover:scale-125"
              />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 text-balance">
            "A Fluintech revolucionou nosso atendimento. Reduzimos 70% do tempo de resposta e aumentamos a satisfação
            dos clientes."
          </blockquote>
          <cite className="text-purple-300 text-lg">— Carlos Silva, TechServ Solutions</cite>
        </div>
      </section>

      <section id="sobre" className="px-4 py-16 lg:px-8 lg:py-24 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Sobre a Fluintech</h2>
              <p className="text-xl text-purple-100 mb-6 leading-relaxed">
                Somos uma startup dedicada a democratizar o acesso à inteligência artificial para empresas de todos os
                tamanhos. Nossa missão é transformar o atendimento ao cliente através de soluções inovadoras e
                acessíveis.
              </p>
              <p className="text-lg text-purple-200 mb-8 leading-relaxed">
                Com foco em automação inteligente, ajudamos empresas a otimizar seus processos, reduzir custos
                operacionais e melhorar a experiência do cliente através de tecnologia de ponta.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <p className="text-purple-200">Clientes Atendidos</p>
                </div>
                <div className="text-center transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <p className="text-purple-200">Suporte Disponível</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-2xl border border-purple-500/30 flex items-center justify-center transition-all duration-300 hover:border-purple-400/50 hover:shadow-xl">
                <div className="text-center">
                  <Zap className="w-24 h-24 text-purple-400 mx-auto mb-4 transition-all duration-300 hover:scale-110" />
                  <p className="text-purple-100 text-lg">Tecnologia Inovadora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="bg-[#25d366] hover:bg-[#20c55a] text-white rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group hover:shadow-green-500/25 cursor-pointer"
          onClick={() =>
            window.open(
              "https://wa.me/554431010224?text=Olá! Gostaria de saber mais sobre a automação com IA.",
              "_blank",
            )
          }
        >
          <svg className="w-8 h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
          </svg>
        </Button>
      </div>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  )
}