"use client"

import { useState } from "react"
import { Calendar, MessageCircle, Bot, Mail, CheckCircle, Zap } from "lucide-react"

interface WorkflowStep {
  title: string
  icon: any
  description: string
}

export function WorkflowSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const workflowSteps: WorkflowStep[] = [
    { title: "Cliente inicia conversa", icon: MessageCircle, description: "Primeiro contato via WhatsApp" },
    { title: "IA analisa solicitação", icon: Bot, description: "Processamento inteligente da mensagem" },
    { title: "Agenda automaticamente", icon: Calendar, description: "Sistema verifica disponibilidade" },
    { title: "Notifica equipe", icon: Mail, description: "Equipe recebe notificação instantânea" },
    { title: "Confirma agendamento", icon: CheckCircle, description: "Cliente recebe confirmação" },
    { title: "Processo concluído", icon: Zap, description: "Fluxo finalizado com sucesso" },
  ]

  return (
    <section className="px-4 py-16 lg:px-8 lg:py-24 fade-in-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Fluxo Automatizado</h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">Processo inteligente em 6 etapas conectadas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {workflowSteps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div
                className={`
                  relative bg-white/10 backdrop-blur-sm rounded-xl p-6 
                  border-2 transition-all duration-300 cursor-pointer
                  ${
                    hoveredStep === index
                      ? "border-green-400 shadow-lg shadow-green-400/20 bg-white/15"
                      : "border-purple-700/50 hover:border-purple-500/70"
                  }
                `}
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {index + 1}
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0 
                      transition-all duration-300 shadow-lg
                      ${
                        hoveredStep === index
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 scale-110"
                          : "bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-105"
                      }
                    `}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="text-xs text-purple-400 mb-1 font-medium">Etapa {index + 1}</div>
                    <h3 className="text-white font-semibold mb-2 text-lg">{step.title}</h3>
                    <p className="text-purple-300 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Glow effect on hover */}
                {hoveredStep === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl pointer-events-none" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
