"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { WhatsAppChat } from "@/components/whatsapp-chat"
import { Footer } from "@/components/footer"
import { DemoModal } from "@/components/demo-modal"
import { 
  Menu, X, Play, ArrowRight, Zap, MessageCircle, CheckCircle2, 
  Calendar, Repeat2, BarChart3, Bot, TrendingUp, Clock, Users
} from "lucide-react"
import { WhatsAppButton } from "@/components/whastapp-button"

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=554431010224&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+a+automa%C3%A7%C3%A3o+com+IA.&type=phone_number&app_absent=0"

export default function FluintechLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({ leads: 0, response: 0, cost: 0 })
  const [floatingDots, setFloatingDots] = useState<Array<{left: string, delay: string, duration: string}>>([])

  useEffect(() => {
    const dots = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 4}s`
    }))
    setFloatingDots(dots)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({ leads: 85, response: 5, cost: 80 })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.05);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(37, 211, 102, 0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(37, 211, 102, 0.5);
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
          background: rgba(37, 211, 102, 0.3);
          border-radius: 50%;
          animation: float 8s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        .gradient-text {
          background: linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(37, 211, 102, 0.2);
        }

        .stat-card:hover {
          background: rgba(37, 211, 102, 0.1);
          border-color: rgba(37, 211, 102, 0.4);
        }
      `}</style>

      <div className="floating-elements" aria-hidden="true">
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

      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-purple-900/80 backdrop-blur-md border-b border-emerald-500/20 px-4 py-4 lg:px-8 transition-all duration-300">
        <nav className="flex items-center justify-between max-w-7xl mx-auto" aria-label="Menu principal">
          <div className="flex items-center space-x-3">
            <Logo size="medium" href="/" />
            <span className="text-xl font-bold text-white hidden sm:inline">Fluintech</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-white/90 hover:text-white transition-colors duration-300">
              Início
            </a>
            <a href="#recursos" className="text-white/90 hover:text-white transition-colors duration-300">
              Recursos
            </a>
            <a href="#lia" className="text-white/90 hover:text-white transition-colors duration-300">
              Sobre a Lia
            </a>
            <a href="/lista-espera" className="text-white/90 hover:text-white transition-colors duration-300">
              Lista de espera
            </a>
            <a href="/blog" className="text-white/90 hover:text-white transition-colors duration-300">
              Blog
            </a>
            <Button 
              onClick={() => window.open(WHATSAPP_URL, "_blank")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/40 cursor-pointer font-semibold"
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              Falar agora
            </Button>
          </div>

          <button
            className="md:hidden text-white transition-transform hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-purple-900/95 backdrop-blur-sm border-t border-emerald-500/20 animate-in slide-in-from-top duration-300">
            <nav className="px-4 py-6 space-y-4">
              <a href="#inicio" className="block text-white/90 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                Início
              </a>
              <a href="#recursos" className="block text-white/90 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                Recursos
              </a>
              <a href="#lia" className="block text-white/90 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                Sobre a Lia
              </a>
              <a href="/blog" className="block text-white/90 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                Blog
              </a>
              <Button 
                onClick={() => {
                  setIsDemoOpen(true)
                  setIsMenuOpen(false)
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white border-0 font-semibold"
              >
                <MessageCircle className="mr-2 w-4 h-4" />
                Falar agora
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ===== HERO SECTION ===== */}
        <section id="inicio" className="px-4 py-16 lg:px-8 lg:py-24 pt-32 fade-in-section">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <Badge className="mb-6 bg-emerald-500/20 text-emerald-100 border-emerald-500/50 hover:bg-emerald-500/30 transition-all duration-300 inline-block">
                  <div className="w-4 h-4 rounded-full overflow-hidden inline-block mr-2 -ml-1 border border-emerald-300 bg-white flex-shrink-0 relative">
                    <Image 
                      src="/lia-avatar.png" 
                      alt="Lia" 
                      fill
                      className="object-cover"
                      sizes="16px"
                      priority
                    />
                  </div>
                  Converse com a Lia - Agentes de IA
                </Badge>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight">
                  Agentes de IA que trabalham{" "}
                  <span className="gradient-text font-black">no seu WhatsApp</span>
                </h1>

                <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty leading-relaxed font-medium">
                  Automatize atendimento, qualifique leads, agende consultas e gerencie sua agenda com agentes de IA personalizados. Tudo acontecendo no WhatsApp, 24/7, sem parar.
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium">SDR que qualifica seus leads</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium">Agentes que marcam consultas e agendamentos</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium">Atendimento automático 24/7 personalizado</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    onClick={() => window.open(WHATSAPP_URL, "_blank")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-base px-8 py-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 cursor-pointer font-semibold"
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Converse com a Lia
                  </Button>
                  <Button
                    size="lg"
                    className="bg-emerald-400 hover:bg-emerald-500 text-purple-900 border-0 text-base px-8 py-6 transition-all duration-300 font-semibold cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50"
                    onClick={() => setIsDemoOpen(true)}
                  >
                    <Play className="mr-2 w-5 h-5" />
                    Ver demonstração
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
                <Button 
                  onClick={() => setIsDemoOpen(true)}
                  className="bg-gradient-to-br from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0 text-base px-6 py-4 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 cursor-pointer font-semibold absolute top-6 right-6 z-20"
                >
                  Ver mais agentes
                </Button>
                <div className="relative z-10">
                  <WhatsAppChat />
                  {/* <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full border-4 border-emerald-500 shadow-lg shadow-emerald-500/50 overflow-hidden bg-white relative">
                    <Image 
                      src="/lia-avatar.png" 
                      alt="Avatar da Lia" 
                      fill
                      className="object-cover"
                      sizes="96px"
                      priority
                    />
                  </div> */}
                </div>
              </div>
            </div>

            {/* ===== STATISTICS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20" role="region" aria-label="Estatísticas de desempenho">
              <div className="stat-card p-8 rounded-2xl text-center transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-emerald-400" />
                  </div>
                </div>
                <p className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                  {animatedStats.leads}%
                </p>
                <p className="text-white/80 font-semibold">Leads qualificados</p>
              </div>

              <div className="stat-card p-8 rounded-2xl text-center transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <Clock className="w-7 h-7 text-emerald-400" />
                  </div>
                </div>
                <p className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                  &lt;{animatedStats.response}s
                </p>
                <p className="text-white/80 font-semibold">Tempo de resposta</p>
              </div>

              <div className="stat-card p-8 rounded-2xl text-center transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-7 h-7 text-emerald-400" />
                  </div>
                </div>
                <p className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                  -{animatedStats.cost}%
                </p>
                <p className="text-white/80 font-semibold">Redução de custos</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== RECURSOS ===== */}
        <section id="recursos" className="px-4 py-16 lg:px-8 lg:py-24 bg-white/5 backdrop-blur border-y border-emerald-500/20 fade-in-section">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Tipos de agentes de IA que você pode criar
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Personalize agentes para diferentes necessidades do seu negócio
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: "SDR Automático",
                  description: "Qualifica leads, coleta informações e encaminha para vendas"
                },
                {
                  icon: Calendar,
                  title: "Agendador Inteligente",
                  description: "Marca consultas, sincroniza calendário e confirma automaticamente"
                },
                {
                  icon: MessageCircle,
                  title: "Atendimento 24/7",
                  description: "Responde perguntas frequentes e direciona para equipe quando necessário"
                },
                {
                  icon: Repeat2,
                  title: "Follow-up Automático",
                  description: "Dispara mensagens personalizadas em momentos estratégicos"
                }
              ].map((agent, i) => {
                const IconComponent = agent.icon
                return (
                  <div key={i} className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/15 hover:scale-105 cursor-pointer">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/20 mb-4">
                      <IconComponent className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{agent.title}</h3>
                    <p className="text-white/70 text-sm">{agent.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/80 text-lg mb-6">Crie o agente perfeito para seu negócio</p>
              <Button
                size="lg"
                onClick={() => window.open(WHATSAPP_URL, "_blank")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-base px-8 py-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 cursor-pointer font-semibold"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Converse com a Lia
              </Button>
            </div>
          </div>
        </section>

        {/* ===== CONHEÇA A LIA ===== */}
        <section id="lia" className="px-4 py-16 lg:px-8 lg:py-24 bg-gradient-to-br from-emerald-600/10 to-cyan-600/10 border-y border-emerald-500/20 fade-in-section">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center lg:justify-end order-2 lg:order-1">
                <div className="relative w-80 h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
                  <div className="relative z-10 w-full h-full rounded-3xl border-4 border-emerald-400/50 overflow-hidden shadow-2xl shadow-emerald-500/30">
                    <Image 
                      src="/lia.png" 
                      alt="Lia - Assistente de IA da Fluintech" 
                      fill
                      className="object-cover"
                      sizes="320px"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/50 z-20">
                    <div className="text-center">
                      <MessageCircle className="w-8 h-8 text-white mx-auto mb-1" />
                      <p className="text-white text-xs font-bold">IA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Conheça a <span className="gradient-text">Lia</span>
                </h2>
                <p className="text-xl text-white/90 mb-8 leading-relaxed font-medium">
                  Lia é a assistente de IA da Fluintech. Ela é humanizada, entende seu negócio, responde suas dúvidas sobre automação e mostra qual agente certo para você. E o melhor: ela mesma é um exemplo vivo de um agente autônomo que trabalha 24/7 sem parar.
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Entende seu contexto</h3>
                      <p className="text-white/70">Faz as perguntas certas e realmente te ouve para entender seu negócio em detalhes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Explica com clareza</h3>
                      <p className="text-white/70">Responde suas dúvidas em texto, áudio (basta pedir) e até interpreta imagens do seu negócio</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Faz follow-up</h3>
                      <p className="text-white/70">Acompanha sua jornada e retorna com recomendações personalizadas sempre que você precisa</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Encaminha para atendimento</h3>
                      <p className="text-white/70">Quando precisa de um humano, ela conecta você ao time certo da Fluintech</p>
                    </div>
                  </div>
                </div>

              <Button
                  size="lg"
                  onClick={() => window.open(WHATSAPP_URL, "_blank")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-base px-8 py-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 cursor-pointer font-semibold"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Quer ter um agente como a Lia?
                </Button>
                <p className="text-white/60 text-sm mt-4">Solicite uma demonstração</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== DEPOIMENTOS ===== */}
        <section className="px-4 py-16 lg:px-8 lg:py-24 bg-white/5 backdrop-blur border-y border-emerald-500/20 fade-in-section">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Agentes que transformaram negócios
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  text: "Implementamos em 2 dias e em 30 dias aumentamos qualificação de 40% para 85%. Nossa equipe agora foca apenas em leads prontos.",
                  author: "Carlos Silva",
                  role: "Diretor de Vendas • TechServ Solutions"
                },
                {
                  text: "Agendamentos antes: 20% dos leads confirmavam. Agora com o agendador automático: 95% confirmação e zero cancelamentos.",
                  author: "Marina Costa",
                  role: "Gerente de Operações • CliniPro Saúde"
                },
                {
                  text: "Reduzimos tempo de resposta de 8 horas para menos de 1 minuto. Satisfação de clientes subiu 40% em 3 meses.",
                  author: "Rafael Santos",
                  role: "CEO • ECommerce Solutions"
                }
              ].map((testimonial, i) => (
                <div key={i} className="p-8 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-300">
                  <div className="flex justify-center mb-4 gap-1">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-emerald-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-white/90 text-lg mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <footer className="space-y-1 border-t border-emerald-400/20 pt-4">
                    <p className="text-emerald-400 font-semibold">{testimonial.author}</p>
                    <cite className="text-white/60 text-sm not-italic">{testimonial.role}</cite>
                  </footer>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="px-4 py-16 lg:px-8 lg:py-24 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border-y border-emerald-400/30 fade-in-section">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Está pronto para transformar seu WhatsApp em canal de vendas?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Fale agora mesmo com a Lia. Ela vai entender seu negócio e recomendar exatamente qual agente de IA você precisa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setIsDemoOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-base px-8 py-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 cursor-pointer font-semibold"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Converse com a Lia
              </Button>
              <Button
                size="lg"
                className="bg-emerald-400 hover:bg-emerald-500 text-purple-900 border-0 text-base px-8 py-6 transition-all duration-300 font-semibold cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50"
                onClick={() => setIsDemoOpen(true)}
              >
                <Play className="mr-2 w-5 h-5" />
                Ver agentes em ação
              </Button>
            </div>
            <p className="text-white/60 text-sm mt-8">
              Resposta automática em menos de 1 minuto
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* ===== BOTÃO FLUTUANTE WHATSAPP ===== */}
      <aside className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group hover:shadow-emerald-500/40 cursor-pointer"
          onClick={() => window.open(WHATSAPP_URL, "_blank")}
          aria-label="Converse com a Lia no WhatsApp"
        >
          <svg className="w-8 h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
          </svg>
        </Button>
      </aside>

<<<<<<< HEAD
            {/* Contact Info Cards */}
            <FadeInView delay={0.6}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
                {[
                  { icon: MapPin, title: "Endereço", info: "Maringá, PR - Brasil" },
                  { icon: Mail, title: "E-mail", info: "contato@fluintech.com.br" },
                  { icon: Phone, title: "Telefone", info: "(44) 99864-4440" },
                ].map((contact, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="bg-white/5 backdrop-blur-md border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <contact.icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-white font-semibold mb-2">{contact.title}</h4>
                        <p className="text-gray-400">{contact.info}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </FadeInView>

            {/* WhatsApp CTA */}
            <FadeInView delay={0.9}>
              <div className="text-center mt-8">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                <WhatsAppButton />
                </motion.div>
              </div>
            </FadeInView>

            {/* Onboarding Modal */}
            <OnboardingModal open={showOnboardingForm} onOpenChange={setShowOnboardingForm} />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/40 backdrop-blur-md border-t border-purple-500/20 py-12 px-4 relative">
          <div className="container mx-auto">
            <FadeInView>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 mb-4"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">Fluintech</span>
                  </motion.div>
                  <p className="text-gray-400 mb-4">Automatização inteligente para o futuro dos negócios.</p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-4">Soluções</h4>
                  <ul className="space-y-2 text-gray-400">
                    {["Agendamentos IA", "Chatbots", "Automação", "Analytics"].map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a href="#" className="hover:text-purple-400 transition-colors">
                          {item}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-4">Empresa</h4>
                  <ul className="space-y-2 text-gray-400">
                    {[
                      { text: "Sobre nós", href: "#sobre" },
                      { text: "Blog", href: "#" },
                      { text: "Carreiras", href: "#" },
                      { text: "Contato", href: "#contato" },
                    ].map((item, index) => (
                      <motion.li
                        key={item.text}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a href={item.href} className="hover:text-purple-400 transition-colors">
                          {item.text}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-4">Newsletter</h4>
                  <p className="text-gray-400 mb-4">Receba novidades sobre IA</p>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Seu e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400"
                    />
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </FadeInView>

            <div className="border-t border-purple-500/20 pt-8 text-center">
              © {new Date().getFullYear()} Fluintech. Todos os direitos reservados.
            </div>

          </div>
        </footer>

        <style jsx>{`
          .neural-network {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
            animation: float 20s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(1deg); }
            66% { transform: translateY(10px) rotate(-1deg); }
          }
        `}</style>
      </div>
    </PageTransition>
=======
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
>>>>>>> origin/main
  )
}