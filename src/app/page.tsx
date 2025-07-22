"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FadeInView } from "@/components/animations/fade-in-view"
import { PageTransition } from "@/components/animations/page-transition"
import { AutomationFlow } from "@/components/animations/automation-flow"
import { OnboardingModal } from "@/components/onboarding-modal"
import {
  Bot,
  Calendar,
  Zap,
  BarChart3,
  ArrowRight,
  Play,
  Star,
  Users,
  Target,
  Lightbulb,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { WhatsAppButton } from "@/components/whastapp-button"

export default function FluintechWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [email, setEmail] = useState("")
  const [showOnboardingForm, setShowOnboardingForm] = useState(false)

  const testimonials = [
    {
      name: "Carlos Silva",
      company: "TechServ Solutions",
      text: "A Fluintech revolucionou nosso atendimento. Reduzimos 70% do tempo de resposta e aumentamos a satisfação dos clientes.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      company: "Manutenção Express",
      text: "Os agendamentos inteligentes otimizaram nossa operação. Agora conseguimos atender 3x mais clientes com a mesma equipe.",
      rating: 5,
    },
    {
      name: "Roberto Oliveira",
      company: "ServicePro",
      text: "A automação com IA da Fluintech nos permitiu focar no que realmente importa: entregar um serviço excepcional.",
      rating: 5,
    },
  ]

  const features = [
    {
      icon: Calendar,
      title: "Agendamentos Inteligentes",
      description: "IA que otimiza horários e recursos automaticamente, reduzindo conflitos e maximizando eficiência.",
    },
    {
      icon: Bot,
      title: "Atendimento Automatizado",
      description: "Chatbots inteligentes que resolvem 80% das dúvidas dos clientes 24/7, com linguagem natural.",
    },
    {
      icon: Zap,
      title: "Fluxos com IA",
      description: "Automação completa de processos com inteligência artificial adaptativa e aprendizado contínuo.",
    },
    {
      icon: BarChart3,
      title: "Relatórios Inteligentes",
      description: "Analytics avançados com insights acionáveis para otimizar sua operação continuamente.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%239C92AC fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=1/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
          <div className="neural-network"></div>
        </div>

        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20 sticky top-0"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Fluintech</span>
              </motion.div>

              <nav className="hidden md:flex items-center space-x-8">
                {["Início", "Soluções", "Sobre", "Contato"].map((item, index) => (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    onClick={() => setShowOnboardingForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Comece Agora
                  </Button>
                </motion.div>
              </nav>

              <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>

            {/* Mobile Menu */}
            <motion.div
              initial={false}
              animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 pb-4 border-t border-purple-500/20">
                <nav className="flex flex-col space-y-4 mt-4">
                  {["Início", "Soluções", "Sobre", "Contato"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                  <Button
                    onClick={() => setShowOnboardingForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full w-fit"
                  >
                    Comece Agora
                  </Button>
                </nav>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section id="início" className="relative min-h-screen flex items-center justify-center px-4">
          <div className="container mx-auto text-center relative z-10">
            <FadeInView delay={0.2}>
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 text-sm animate-pulse">
                🚀 Tecnologia de IA de Última Geração
              </Badge>
            </FadeInView>

            <FadeInView delay={0.4}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Automatize seu atendimento com{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  inteligência artificial
                </span>
              </h1>
            </FadeInView>

            <FadeInView delay={0.6}>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transforme sua operação com agentes inteligentes que atendem clientes 24/7 e otimizam agendamentos
                automaticamente.
              </p>
            </FadeInView>

            <FadeInView delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  size="lg"
                  onClick={() => setShowOnboardingForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  Comece sua automação hoje
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Ver demonstração
                </Button>
              </div>
            </FadeInView>

            {/* Stats */}
            <FadeInView delay={1.0}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                {[
                  { value: "70%", label: "Redução no tempo de resposta", color: "text-purple-400" },
                  { value: "24/7", label: "Atendimento automatizado", color: "text-blue-400" },
                  { value: "3x", label: "Mais eficiência operacional", color: "text-purple-400" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.2 }}
                    className="text-center"
                  >
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </FadeInView>
          </div>
        </section>

        {/* Features Section */}
        <section id="soluções" className="py-20 px-4 relative">
          <div className="container mx-auto">
            <FadeInView>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Soluções que{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    transformam
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Descubra como nossa inteligência artificial pode revolucionar sua operação
                </p>
              </div>
            </FadeInView>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FadeInView key={index} delay={index * 0.2}>
                  <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="bg-white/5 backdrop-blur-md border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full group">
                      <CardContent className="p-6 text-center">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <feature.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* Automation Flow Demo */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <FadeInView>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Veja a{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    automação
                  </span>{" "}
                  em ação
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                  Fluxo inteligente de atendimento e agendamento funcionando 24/7
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.3}>
              <AutomationFlow />
            </FadeInView>

            <FadeInView delay={0.6}>
              <div className="text-center mt-8">
                <Button
                  size="lg"
                  onClick={() => setShowOnboardingForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Solicite uma demonstração personalizada
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </FadeInView>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 relative">
          <div className="container mx-auto">
            <FadeInView>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  O que nossos{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    clientes
                  </span>{" "}
                  dizem
                </h2>
              </div>
            </FadeInView>

            <FadeInView delay={0.3}>
              <div className="max-w-4xl mx-auto relative">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white/5 backdrop-blur-md border-purple-500/20">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-xl md:text-2xl text-gray-300 mb-6 italic leading-relaxed">
                        "{testimonials[currentTestimonial].text}"
                      </blockquote>
                      <div className="text-white font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                      <div className="text-purple-400">{testimonials[currentTestimonial].company}</div>
                    </CardContent>
                  </Card>
                </motion.div>

                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="flex justify-center mt-6 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? "bg-purple-500" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </FadeInView>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-20 px-4 relative">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeInView direction="left">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Sobre a{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Fluintech
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Somos uma startup brasileira especializada em automação inteligente para atendimento ao cliente e
                    agendamento de serviços. Nossa missão é democratizar o acesso à inteligência artificial para
                    empresas de pequeno porte e profissionais autônomos.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                      { icon: Target, title: "Missão", desc: "Democratizar IA para empresas" },
                      { icon: Lightbulb, title: "Visão", desc: "Liderar automação inteligente" },
                      { icon: Users, title: "Valores", desc: "Inovação e excelência" },
                    ].map((item, index) => (
                      <FadeInView key={index} delay={index * 0.2}>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <item.icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                      </FadeInView>
                    ))}
                  </div>
                </div>
              </FadeInView>

              <FadeInView direction="right" delay={0.3}>
                <Card className="bg-white/5 backdrop-blur-md border-purple-500/20">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {[
                        { year: "2023", title: "Fundação", desc: "Início da jornada em IA" },
                        { number: "50+", title: "Clientes", desc: "Empresas automatizadas" },
                        { number: "24/7", title: "Suporte", desc: "Atendimento contínuo" },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-center space-x-4"
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{item.year || item.number}</span>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{item.title}</h4>
                            <p className="text-gray-400">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Onboarding Form Section */}
        <section id="contato" className="py-20 px-4 relative">
          <div className="container mx-auto">
            <FadeInView>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Vamos automatizar seu{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    atendimento?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Responda algumas perguntas e descubra como podemos transformar sua operação
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.3}>
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={() => setShowOnboardingForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  Iniciar avaliação gratuita
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
                <p className="text-gray-400 mt-4">⏱️ Leva apenas 2 minutos • 🔒 Seus dados estão protegidos</p>
              </div>
            </FadeInView>

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
  )
}
