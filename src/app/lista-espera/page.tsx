"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Server, Sparkles, ArrowRight, Instagram, Facebook, Youtube } from "lucide-react"
import Image from "next/image"
import { submitWaitlistForm } from "../actions/waitlist-form"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"

export default function ListaEsperaPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const result = await submitWaitlistForm(formData)

      if (result.success) {
        setIsSuccess(true)
      } else {
        setError(result.error || "Erro ao processar sua inscrição. Tente novamente.")
      }
    } catch (err) {
      setError("Erro ao processar sua inscrição. Tente novamente.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-6 sm:p-8 md:p-12 text-center bg-slate-900/80 backdrop-blur-lg border-slate-700/50 animate-scale-in">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500/20 rounded-full p-4 animate-pulse-glow">
              <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-[#25D366]" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-balance text-white">
            Inscrição Confirmada!
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-8">
            Você está na lista de espera para a aula gratuita de automações avançadas.
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 sm:p-6 mb-6 border border-slate-700/30">
            <p className="text-sm text-white mb-4 font-medium">
              Entre no nosso grupo de WhatsApp para acompanhar todas as atualizações:
            </p>
            <a
              href="https://chat.whatsapp.com/JLWZzZ1zgFgGoviII5evxo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                size="lg"
                className="gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <WhatsAppIcon className="h-6 w-6" />
                Entrar no Grupo do WhatsApp
              </Button>
            </a>
          </div>
          <div className="flex justify-center gap-4 pt-6">
            <a
              href="https://www.instagram.com/fluintech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#EC4899] transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61578914720363"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#EC4899] transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCX6YDzQX_M8uu8qkK4aTo1g"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#EC4899] transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-slate-800/50">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EC4899]/5 to-transparent" />
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.3fr] gap-6 lg:gap-10 items-center">
            <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-[#EC4899]/10 text-[#EC4899] px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm border border-[#EC4899]/20 animate-pulse-glow">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                Vagas Limitadas
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-balance leading-tight text-white">
                Domine automações do básico ao avançado com n8n e IA
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 text-pretty leading-relaxed">
                Aprenda a criar automações escaláveis, integrar WhatsApp via Evolution API e aplicar IA com OpenAI em
                fluxos reais de negócio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="#inscricao" className="w-full sm:w-auto scroll-smooth">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 text-base sm:text-lg bg-[#EC4899] hover:bg-[#DB2777] text-white transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg shadow-[#EC4899]/20"
                  >
                    Entrar na Lista de Espera
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </a>
              </div>
              <section className="py-10 border-b border-slate-800/50">
                <div className="container mx-auto px-4">
                  <div className="flex flex-wrap justify-center gap-8">
                    {[
                      { src: "/images/n8n-pink-2bwhite-logo.png", label: "n8n", img: true },
                      { src: "/images/logo-openai.png", label: "OpenAI", img: true },
                      { src: "whatsapp", label: "WhatsApp", img: false },
                      { src: "/images/evolution-logo-white.svg", label: "Evolution API", img: true },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="relative h-14 w-14 rounded-xl bg-zinc-800/60 border border-zinc-700 overflow-hidden flex items-center justify-center">
                          {item.img ? (
                            <Image src={item.src} alt={item.label} fill className="object-contain p-2" />
                          ) : (
                            <WhatsAppIcon className="h-full w-full p-3 text-green-500" />
                          )}
                        </div>
                        <span className="text-gray-400 text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <div className="relative animate-fade-in animation-delay-200 order-first lg:order-last">
              <div className="relative w-full aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer">
                <Image
                  src="/images/hero.png"
                  alt="Fluintech - Automações com n8n, OpenAI e WhatsApp"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent to-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 text-balance text-white animate-fade-in-up">
              O que você vai aprender
            </h2>
            <p className="text-center text-gray-400 text-base sm:text-lg mb-8 sm:mb-12 animate-fade-in-up animation-delay-100">
              Conteúdo 100% prático e aplicável
            </p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm border-slate-700/50 hover:border-[#EC4899]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#EC4899]/10 cursor-pointer animate-fade-in-up animation-delay-200">
                <div className="bg-[#EC4899]/10 rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4 border border-[#EC4899]/20">
                  <Server className="h-7 w-7 sm:h-8 sm:w-8 text-[#EC4899]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Instalação e Configuração de VPS</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Configure seu próprio servidor do zero e tenha controle total da infraestrutura.
                </p>
              </Card>

              <Card className="p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm border-slate-700/50 hover:border-[#EC4899]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#EC4899]/10 cursor-pointer animate-fade-in-up animation-delay-300">
                <div className="bg-[#EC4899]/10 rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4 border border-[#EC4899]/20">
                  <Image src="/images/n8n-pink-2bwhite-logo.png" alt="n8n" width={32} height={32} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Implementação do n8n Self-Hosted</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Instale e configure o n8n no seu servidor sem custos de SaaS.
                </p>
              </Card>

              <Card className="p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm border-slate-700/50 hover:border-[#25D366]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/10 cursor-pointer animate-fade-in-up animation-delay-400">
                <div className="bg-[#25D366]/10 rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center border border-[#25D366]/20">
                  <Image src="/images/evolution-logo-white.svg" alt="Evolution API" width={32} height={32} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Integração com Evolution API</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Conecte WhatsApp às suas automações para atendimento e vendas.
                </p>
              </Card>

              <Card className="p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm border-slate-700/50 hover:border-[#EC4899]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#EC4899]/10 cursor-pointer animate-fade-in-up animation-delay-400">
                <div className="bg-[#EC4899]/10 rounded-lg w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center border border-[#EC4899]/20">
                  <Image src="/images/logo-openai.png" alt="OpenAI" width={32} height={32} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Uso Estratégico da OpenAI</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Implemente IA em fluxos automatizados para decisões inteligentes.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-balance text-white">
              Por que participar?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Autonomia Técnica",
                  description: "Domine a infraestrutura e tenha controle total sobre suas automações.",
                },
                {
                  title: "Redução de Custos",
                  description: "Elimine dependência de ferramentas SaaS caras com soluções self-hosted.",
                },
                {
                  title: "Automações Escaláveis",
                  description: "Crie fluxos que crescem junto com seu negócio sem limitações.",
                },
                {
                  title: "Aplicações Reais",
                  description: "Aprenda casos práticos em vendas, atendimento e operações.",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 items-start animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="bg-[#EC4899]/10 rounded-lg w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#EC4899]/20">
                    <CheckCircle2 className="h-5 w-5 text-[#EC4899]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="inscricao" className="py-16 md:py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 md:p-12 bg-white/10 backdrop-blur-lg border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-white">
                  Entre na Lista de Espera
                </h2>
                <p className="text-purple-200 text-lg">Garanta seu acesso antecipado à aula gratuita</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-medium text-white">
                    Nome completo *
                  </label>
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="h-12 bg-white/20 border-white/30 text-white placeholder:text-purple-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white">
                    E-mail *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="h-12 bg-white/20 border-white/30 text-white placeholder:text-purple-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="whatsapp" className="text-sm font-medium text-white">
                    WhatsApp *
                  </label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="h-12 bg-white/20 border-white/30 text-white placeholder:text-purple-300"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/20 text-red-200 px-4 py-3 rounded-lg text-sm border border-red-500/30">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg h-12 bg-white text-purple-900 hover:bg-purple-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Garantir Minha Vaga"}
                </Button>

                <p className="text-xs text-center text-purple-300">
                  Ao se inscrever, você concorda em receber comunicações da Fluintech sobre a aula e conteúdos
                  relacionados.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-purple-200">© 2025 Fluintech. Todos os direitos reservados.</div>
            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/fluintech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-200 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61578914720363"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-200 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCX6YDzQX_M8uu8qkK4aTo1g"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-200 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
