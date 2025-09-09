"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MessageSquare, Zap, BarChart3 } from "lucide-react"

interface Solution {
  icon: any
  title: string
  description: string
  gradient: string
}

export function SolutionsGrid() {
  const solutions: Solution[] = [
    {
      icon: Calendar,
      title: "Agendamentos Inteligentes",
      description: "Sistema automatizado que agenda consultas e serviços com base na disponibilidade em tempo real.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageSquare,
      title: "Atendimento Automatizado",
      description: "Chatbots inteligentes que respondem dúvidas frequentes e direcionam clientes adequadamente.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Fluxos com IA",
      description: "Automação de processos complexos usando inteligência artificial para otimizar operações.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Relatórios Inteligentes",
      description: "Análises detalhadas e insights automáticos para tomada de decisões estratégicas.",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section id="solucoes" className="px-4 py-16 lg:px-8 lg:py-24 bg-black/20 fade-in-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Soluções Inteligentes</h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Descubra como nossa tecnologia pode revolucionar seu atendimento ao cliente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <Card
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              {/* Gradient border effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${solution.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg`}
              />

              <CardContent className="relative p-6 h-full flex flex-col">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${solution.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                >
                  <solution.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors">
                  {solution.title}
                </h3>

                <p className="text-purple-200 text-sm leading-relaxed flex-1">{solution.description}</p>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg pointer-events-none`}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
