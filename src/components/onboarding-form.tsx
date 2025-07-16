"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Building,
  Target,
  Rocket,
  Calendar,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Mail,
  Phone,
  Users,
  MessageCircle,
  Zap,
  BarChart3,
  Settings,
  Heart,
  Briefcase,
  Monitor,
  ArrowRight,
} from "lucide-react"
import { sendLeadToN8N } from "@/lib/sendLead"

interface FormData {
  // Etapa 1
  nome: string
  email: string
  telefone: string
  cargo: string

  // Etapa 2
  empresa: string
  cnpj: string
  segmento: string
  colaboradores: string

  // Etapa 3
  desafios: string[]

  // Etapa 4
  objetivo: string

  // Etapa 5
  urgencia: string
  contatoPreferido: string[]
  horarioContato: string
}

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    empresa: "",
    cnpj: "",
    segmento: "",
    colaboradores: "",
    desafios: [],
    objetivo: "",
    urgencia: "",
    contatoPreferido: [],
    horarioContato: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    { number: 1, title: "Quem é você?", icon: User },
    { number: 2, title: "Sobre a empresa", icon: Building },
    { number: 3, title: "Qual desafio?", icon: Target },
    { number: 4, title: "Seu objetivo", icon: Rocket },
    { number: 5, title: "Quando começar?", icon: Calendar },
  ]

  const segmentos = [
    { value: "servicos", label: "Serviços", icon: Settings },
    { value: "manutencao", label: "Manutenção", icon: Zap },
    { value: "facilities", label: "Facilities", icon: Building },
    { value: "saude", label: "Saúde", icon: Heart },
    { value: "ti", label: "TI", icon: Monitor },
    { value: "outros", label: "Outros", icon: Briefcase },
  ]

  const desafiosOptions = [
    { value: "agendamento", label: "Agendamento manual ou desorganizado", icon: Calendar },
    { value: "atendimento", label: "Atendimento lento ou ineficiente", icon: MessageCircle },
    { value: "visibilidade", label: "Falta de visibilidade sobre serviços", icon: BarChart3 },
    { value: "conversao", label: "Baixa taxa de conversão digital", icon: Target },
    { value: "escalar", label: "Preciso escalar sem aumentar equipe", icon: Users },
  ]

  const objetivos = [
    { value: "automatizar", label: "Automatizar atendimento via canais digitais", icon: MessageCircle },
    { value: "integrar", label: "Integrar agendamentos com meu sistema", icon: Settings },
    { value: "fluxo", label: "Criar fluxo completo de atendimento com IA", icon: Zap },
    { value: "reduzir", label: "Reduzir custos com atendentes", icon: BarChart3 },
    { value: "experiencia", label: "Melhorar experiência do cliente", icon: Heart },
  ]

  const urgencias = [
    { value: "urgente", label: "🔥 Preciso para ontem!", color: "bg-red-500" },
    { value: "semanas", label: "⏱️ Nas próximas semanas", color: "bg-orange-500" },
    { value: "meses", label: "📅 Próximos meses", color: "bg-blue-500" },
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await sendLeadToN8N(formData)
      if (response.status === 204) {
        setIsSubmitted(true)
      } else {
        alert("Erro ao enviar: " + response.status)
      }
    } catch (err) {
      console.error("Erro ao enviar lead:", err)
      alert("Erro na comunicação com o servidor.")
    }
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayValue = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFormData(field, newArray)
  }

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4">Obrigado, {formData.nome.split(" ")[0]}! 🎉</h2>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          Recebemos suas informações. Um especialista da Fluintech entrará em contato em breve para ajudar a transformar
          seu atendimento com IA.
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          Explorar o site enquanto isso
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex items-center space-x-2 ${
                step.number <= currentStep ? "text-purple-400" : "text-gray-500"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.number <= currentStep ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-400"
                }`}
              >
                <step.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium hidden md:block">{step.title}</span>
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="bg-white/5 backdrop-blur-md border-purple-500/20">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {/* Etapa 1: Quem é você? */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <User className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Quem é você?</h2>
                  <p className="text-gray-400">Vamos nos conhecer melhor</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Nome completo *</label>
                    <Input
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={(e) => updateFormData("nome", e.target.value)}
                      className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">E-mail profissional *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="seu@empresa.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400 pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">Telefone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder="(11) 99999-9999"
                          value={formData.telefone}
                          onChange={(e) => updateFormData("telefone", e.target.value)}
                          className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400 pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Cargo / Função</label>
                    <select
                      value={formData.cargo}
                      onChange={(e) => updateFormData("cargo", e.target.value)}
                      className="w-full bg-white/10 border border-purple-500/30 text-white rounded-md px-3 py-2"
                    >
                      <option value="">Selecione seu cargo</option>
                      <option value="dono">Dono/Proprietário</option>
                      <option value="gestor">Gestor/Gerente</option>
                      <option value="tecnico">Técnico</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Etapa 2: Sobre a empresa */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <Building className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Sobre a empresa</h2>
                  <p className="text-gray-400">Conte-nos sobre seu negócio</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Nome da empresa *</label>
                      <Input
                        placeholder="Nome da sua empresa"
                        value={formData.empresa}
                        onChange={(e) => updateFormData("empresa", e.target.value)}
                        className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">CNPJ</label>
                      <Input
                        placeholder="00.000.000/0001-00"
                        value={formData.cnpj}
                        onChange={(e) => updateFormData("cnpj", e.target.value)}
                        className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-4">Segmento de atuação *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {segmentos.map((segmento) => (
                        <button
                          key={segmento.value}
                          onClick={() => updateFormData("segmento", segmento.value)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            formData.segmento === segmento.value
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-gray-600 bg-white/5 hover:border-purple-500/50"
                          }`}
                        >
                          <segmento.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                          <span className="text-white text-sm">{segmento.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-4">Número de colaboradores</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["1-5", "6-20", "21-50", "+50"].map((size) => (
                        <button
                          key={size}
                          onClick={() => updateFormData("colaboradores", size)}
                          className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                            formData.colaboradores === size
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-gray-600 bg-white/5 hover:border-purple-500/50"
                          }`}
                        >
                          <span className="text-white font-semibold">{size}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Etapa 3: Desafios */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Qual desafio você quer resolver?</h2>
                  <p className="text-gray-400">Selecione todos que se aplicam</p>
                </div>

                <div className="space-y-4">
                  {desafiosOptions.map((desafio) => (
                    <button
                      key={desafio.value}
                      onClick={() => toggleArrayValue("desafios", desafio.value)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-4 ${
                        formData.desafios.includes(desafio.value)
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-gray-600 bg-white/5 hover:border-purple-500/50"
                      }`}
                    >
                      <desafio.icon className="w-6 h-6 text-purple-400" />
                      <span className="text-white text-left">{desafio.label}</span>
                      {formData.desafios.includes(desafio.value) && (
                        <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                      )}
                    </button>
                  ))}

                  <div>
                    <label className="block text-gray-300 mb-2">Outro desafio?</label>
                    <Textarea
                      placeholder="Descreva seu desafio específico..."
                      className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400"
                      rows={3}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Etapa 4: Objetivo */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <Rocket className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Qual seu objetivo principal?</h2>
                  <p className="text-gray-400">Escolha sua prioridade</p>
                </div>

                <div className="space-y-4">
                  {objetivos.map((objetivo) => (
                    <button
                      key={objetivo.value}
                      onClick={() => updateFormData("objetivo", objetivo.value)}
                      className={`w-full p-6 rounded-lg border-2 transition-all duration-300 flex items-center space-x-4 ${
                        formData.objetivo === objetivo.value
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-gray-600 bg-white/5 hover:border-purple-500/50"
                      }`}
                    >
                      <objetivo.icon className="w-8 h-8 text-purple-400" />
                      <span className="text-white text-left text-lg">{objetivo.label}</span>
                      {formData.objetivo === objetivo.value && (
                        <CheckCircle className="w-6 h-6 text-green-400 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Etapa 5: Quando começar */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Quando deseja começar?</h2>
                  <p className="text-gray-400">Vamos alinhar o timing</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-4">Urgência</label>
                    <div className="space-y-3">
                      {urgencias.map((urgencia) => (
                        <button
                          key={urgencia.value}
                          onClick={() => updateFormData("urgencia", urgencia.value)}
                          className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-4 ${
                            formData.urgencia === urgencia.value
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-gray-600 bg-white/5 hover:border-purple-500/50"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full ${urgencia.color}`}></div>
                          <span className="text-white">{urgencia.label}</span>
                          {formData.urgencia === urgencia.value && (
                            <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-4">Preferência de contato</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
                        { value: "email", label: "E-mail", icon: Mail },
                        { value: "telefone", label: "Telefone", icon: Phone },
                      ].map((contato) => (
                        <button
                          key={contato.value}
                          onClick={() => toggleArrayValue("contatoPreferido", contato.value)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            formData.contatoPreferido.includes(contato.value)
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-gray-600 bg-white/5 hover:border-purple-500/50"
                          }`}
                        >
                          <contato.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                          <span className="text-white text-sm">{contato.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Horário preferido para contato</label>
                    <select
                      value={formData.horarioContato}
                      onChange={(e) => updateFormData("horarioContato", e.target.value)}
                      className="w-full bg-white/10 border border-purple-500/30 text-white rounded-md px-3 py-2"
                    >
                      <option value="">Selecione o horário</option>
                      <option value="manha">Manhã (9h - 12h)</option>
                      <option value="tarde">Tarde (13h - 17h)</option>
                      <option value="noite">Noite (18h - 20h)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
            >
              <ChevronLeft className="mr-2 w-4 h-4" />
              Voltar
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Enviar formulário
                <CheckCircle className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Próximo
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-400 text-center mt-6">
            🔒 Seus dados estão protegidos. Utilizamos apenas para entender sua necessidade e oferecer a melhor solução.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
