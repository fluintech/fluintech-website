"use client"

import { useEffect, useState } from "react"
import { Bot, Calendar, CheckCircle, MessageCircle, Zap, Bell } from "lucide-react"

export function WorkflowAnimation() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { icon: MessageCircle, title: "Cliente inicia", color: "from-blue-500 to-blue-600" },
    { icon: Bot, title: "IA analisa", color: "from-purple-500 to-purple-600" },
    { icon: Calendar, title: "Agenda", color: "from-green-500 to-green-600" },
    { icon: Bell, title: "Notifica", color: "from-yellow-500 to-yellow-600" },
    { icon: CheckCircle, title: "Confirma", color: "from-pink-500 to-pink-600" },
    { icon: Zap, title: "Concluído", color: "from-indigo-500 to-indigo-600" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
              index === activeStep
                ? `bg-gradient-to-r ${step.color} scale-110 shadow-lg`
                : "bg-white/10 border border-purple-500/30"
            }`}
          >
            <step.icon
              className={`w-8 h-8 transition-colors duration-500 ${
                index === activeStep ? "text-white" : "text-purple-400"
              }`}
            />
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 mx-2 transition-all duration-500 ${
                index < activeStep ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-purple-500/30"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
