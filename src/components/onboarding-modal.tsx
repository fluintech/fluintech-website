"use client"

import React, { useEffect, useRef } from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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
  AlertCircle,
  Loader2,
} from "lucide-react"
import {
  type OnboardingFormData,
  onboardingSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from "@/lib/validations/onboarding"
import { sendLeadToN8N } from "@/lib/sendLead"

interface OnboardingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open || currentStep) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: 0, behavior: "auto" })
      }, 0)
    }
  }, [open, currentStep])

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      cargo: "",
      empresa: "",
      cnpj: "",
      segmento: "",
      colaboradores: "",
      desafios: [],
      outroDesafio: "",
      objetivo: "",
      urgencia: "",
      contatoPreferido: [],
      horarioContato: "",
    },
    mode: "onChange",
  })

  const {
    watch,
    trigger,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = form

  const watchedValues = watch()

  const steps = [
    { number: 1, title: "Quem é você?", icon: User, schema: step1Schema },
    { number: 2, title: "Sobre a empresa", icon: Building, schema: step2Schema },
    { number: 3, title: "Quais desafios?", icon: Target, schema: step3Schema },
    { number: 4, title: "Seu objetivo", icon: Rocket, schema: step4Schema },
    { number: 5, title: "Quando começar?", icon: Calendar, schema: step5Schema },
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

  const validateCurrentStep = async () => {
    const currentStepSchema = steps[currentStep - 1].schema
    const currentData = getValues()

    try {
      currentStepSchema.parse(currentData)
      return true
    } catch (error) {
      await trigger()
      return false
    }
  }

  const handleNext = async () => {
    const isValid = await validateCurrentStep()

    if (isValid && currentStep < totalSteps) {
      // Marcar step como completo com animação
      setCompletedSteps((prev) => [...prev, currentStep])

      // Aguardar animação de conclusão
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 800)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (data: OnboardingFormData) => {
    try {
      await sendLeadToN8N(data)
      setCompletedSteps((prev) => [...prev, currentStep])

      setTimeout(() => {
        setIsSubmitted(true)
      }, 800)
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
    }
  }

  const handleClose = () => {
    if (currentStep > 1 && !isSubmitted) {
      setShowExitConfirm(true)
    } else {
      onOpenChange(false)
      resetForm()
    }
  }

  const confirmExit = () => {
    setShowExitConfirm(false)
    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setCurrentStep(1)
    setCompletedSteps([])
    setIsSubmitted(false)
    form.reset()
  }

  const toggleArrayValue = (field: keyof OnboardingFormData, value: string) => {
    const currentArray = (watchedValues[field] as string[]) || []
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    setValue(field, newArray)
  }

  // Node completion animation component
  const NodeCompletionAnimation = ({ stepNumber }: { stepNumber: number }) => {
    const isCompleted = completedSteps.includes(stepNumber)
    const isActive = currentStep === stepNumber

    return (
      <motion.div
        className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
          isCompleted
            ? "bg-green-500 border-2 border-green-400"
            : isActive
              ? "bg-purple-500 border-2 border-purple-400"
              : "bg-gray-700 border-2 border-gray-600"
        }`}
        animate={isCompleted ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              <CheckCircle className="w-4 h-4 text-white" />
            </motion.div>
          ) : (
            <motion.div key="icon" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              {React.createElement(steps[stepNumber - 1].icon, {
                className: "w-4 h-4 text-white",
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success pulse effect */}
        {isCompleted && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-400"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, repeat: 2 }}
          />
        )}
      </motion.div>
    )
  }

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-3">Obrigado, {watchedValues.nome?.split(" ")[0]}! 🎉</h2>
            <p className="text-gray-300 mb-6 text-sm">
              Recebemos suas informações. Um especialista da Fluintech entrará em contato em breve para ajudar a
              transformar seu atendimento com IA.
            </p>
            <Button
              size="lg"
              onClick={() => onOpenChange(false)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Explorar o site
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl h-[85vh] flex flex-col">
          {/* Header fixo */}
          <DialogHeader className="flex-shrink-0 pb-2">
            <DialogTitle className="text-xl font-bold text-center">Vamos automatizar seu atendimento?</DialogTitle>
            <DialogDescription className="text-center text-sm">
              Responda algumas perguntas e descubra como podemos transformar sua operação
            </DialogDescription>
          </DialogHeader>

          {/* Progress Bar fixo */}
          <div className="flex-shrink-0 mb-4">
            <div className="flex justify-between items-center mb-3">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center space-y-1">
                  <NodeCompletionAnimation stepNumber={step.number} />
                  <span
                    className={`text-xs font-medium text-center max-w-16 leading-tight ${
                      completedSteps.includes(step.number)
                        ? "text-green-400"
                        : currentStep === step.number
                          ? "text-purple-400"
                          : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          {/* Conteúdo do formulário com scroll independente */}          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <AnimatePresence mode="wait">
                {/* Etapa 1: Quem é você? */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                  {/* Nome */}
                  <div>
                    <label className="block text-gray-300 mb-1.5 text-sm">Nome completo *</label>
                    <Controller
                      name="nome"
                      control={form.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Seu nome completo"
                          className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400 h-9 px-3"
                        />
                      )}
                    />
                    {errors.nome && (
                      <p className="text-red-400 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.nome.message}
                      </p>
                    )}
                  </div>

                  {/* E-mail */}
                  <div>
                    <label className="block text-gray-300 mb-1.5 text-sm">E-mail profissional *</label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Controller
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="email"
                            placeholder="seu@empresa.com"
                            className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400 pl-8 pr-3 h-9"
                          />
                        )}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-gray-300 mb-1.5 text-sm">Telefone *</label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Controller
                        name="telefone"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="(11) 99999-9999"
                            className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400 pl-8 pr-3 h-9"
                          />
                        )}
                      />
                    </div>
                    {errors.telefone && (
                      <p className="text-red-400 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.telefone.message}
                      </p>
                    )}
                  </div>

                  {/* Cargo */}
                  <div>
                    <label className="block text-gray-300 mb-1.5 text-sm">Cargo / Função *</label>
                    <Controller
                      name="cargo"
                      control={form.control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="h-9 bg-white/10 border-purple-500/30 text-white px-3">
                            <SelectValue placeholder="Selecione seu cargo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dono">Dono/Proprietário</SelectItem>
                            <SelectItem value="gestor">Gestor/Gerente</SelectItem>
                            <SelectItem value="tecnico">Técnico</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.cargo && (
                      <p className="text-red-400 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.cargo.message}
                      </p>
                    )}
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
                    className="space-y-4"
                  >

                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-300 mb-1.5 text-sm">Nome da empresa *</label>
                          <Controller
                            name="empresa"
                            control={form.control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Nome da sua empresa"
                                className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400 h-9"
                              />
                            )}
                          />
                          {errors.empresa && (
                            <p className="text-red-400 text-xs mt-1 flex items-center">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {errors.empresa.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-1.5 text-sm">CNPJ</label>
                          <Controller
                            name="cnpj"
                            control={form.control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="00.000.000/0001-00"
                                className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400 h-9"
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-3 text-sm">Segmento de atuação *</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {segmentos.map((segmento) => (
                            <button
                              key={segmento.value}
                              type="button"
                              onClick={() => setValue("segmento", segmento.value)}
                              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                                watchedValues.segmento === segmento.value
                                  ? "border-purple-500 bg-purple-500/20"
                                  : "border-gray-600 bg-white/5 hover:border-purple-500/50"
                              }`}
                            >
                              <segmento.icon className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                              <span className="text-white text-xs">{segmento.label}</span>
                            </button>
                          ))}
                        </div>
                        {errors.segmento && (
                          <p className="text-red-400 text-xs mt-2 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.segmento.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-1.5 text-sm">Número de colaboradores *</label>
                        <Controller
                          name="colaboradores"
                          control={form.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-9">
                                <SelectValue placeholder="Selecione o número de colaboradores" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-5">1-5 colaboradores</SelectItem>
                                <SelectItem value="6-20">6-20 colaboradores</SelectItem>
                                <SelectItem value="21-50">21-50 colaboradores</SelectItem>
                                <SelectItem value="+50">Mais de 50 colaboradores</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.colaboradores && (
                          <p className="text-red-400 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.colaboradores.message}
                          </p>
                        )}
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
                    className="space-y-4"
                  >

                    <div className="space-y-3">
                      {desafiosOptions.map((desafio) => (
                        <button
                          key={desafio.value}
                          type="button"
                          onClick={() => toggleArrayValue("desafios", desafio.value)}
                          className={`w-full p-3 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                            (watchedValues.desafios || []).includes(desafio.value)
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-gray-600 bg-white/5 hover:border-purple-500/50"
                          }`}
                        >
                          <desafio.icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                          <span className="text-white text-left flex-1 text-sm">{desafio.label}</span>
                          {(watchedValues.desafios || []).includes(desafio.value) && (
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          )}
                        </button>
                      ))}

                      <div>
                        <label className="block text-gray-300 mb-1.5 text-sm">Outro desafio?</label>
                        <Controller
                          name="outroDesafio"
                          control={form.control}
                          render={({ field }) => (
                            <Textarea
                              {...field}
                              placeholder="Descreva seu desafio específico..."
                              className="bg-white/10 border-purple-500/30 text-white placeholder-gray-400 resize-none"
                              rows={2}
                            />
                          )}
                        />
                      </div>

                      {errors.desafios && (
                        <p className="text-red-400 text-xs flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.desafios.message}
                        </p>
                      )}
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
                    className="space-y-4"
                  >               

                    <div className="space-y-3">
                      {objetivos.map((objetivo) => (
                        <button
                          key={objetivo.value}
                          type="button"
                          onClick={() => setValue("objetivo", objetivo.value)}
                          className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 ${
                            watchedValues.objetivo === objetivo.value
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-gray-600 bg-white/5 hover:border-purple-500/50"
                          }`}
                        >
                          <objetivo.icon className="w-6 h-6 text-purple-400 flex-shrink-0" />
                          <span className="text-white text-left flex-1">{objetivo.label}</span>
                          {watchedValues.objetivo === objetivo.value && (
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          )}
                        </button>
                      ))}

                      {errors.objetivo && (
                        <p className="text-red-400 text-xs flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.objetivo.message}
                        </p>
                      )}
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
                  className="space-y-6"
                >
      
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-300 mb-4">Urgência *</label>
                      <div className="space-y-3">
                        {urgencias.map((urgencia) => (
                          <button
                            key={urgencia.value}
                            type="button"
                            onClick={() => setValue("urgencia", urgencia.value)}
                            className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-4 ${
                              watchedValues.urgencia === urgencia.value
                                ? "border-purple-500 bg-purple-500/20"
                                : "border-gray-600 bg-white/5 hover:border-purple-500/50"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full ${urgencia.color}`}></div>
                            <span className="text-white flex-1">{urgencia.label}</span>
                            {watchedValues.urgencia === urgencia.value && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </button>
                        ))}
                      </div>
                      {errors.urgencia && (
                        <p className="text-red-400 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.urgencia.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-4">Preferência de contato *</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
                          { value: "email", label: "E-mail", icon: Mail },
                          { value: "telefone", label: "Telefone", icon: Phone },
                        ].map((contato) => (
                          <button
                            key={contato.value}
                            type="button"
                            onClick={() => toggleArrayValue("contatoPreferido", contato.value)}
                            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                              (watchedValues.contatoPreferido || []).includes(contato.value)
                                ? "border-purple-500 bg-purple-500/20"
                                : "border-gray-600 bg-white/5 hover:border-purple-500/50"
                            }`}
                          >
                            <contato.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                            <span className="text-white text-sm">{contato.label}</span>
                          </button>
                        ))}
                      </div>
                      {errors.contatoPreferido && (
                        <p className="text-red-400 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.contatoPreferido.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">Horário preferido para contato *</label>
                      <Controller
                        name="horarioContato"
                        control={form.control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o horário" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manha">Manhã (9h - 12h)</SelectItem>
                              <SelectItem value="tarde">Tarde (13h - 17h)</SelectItem>
                              <SelectItem value="noite">Noite (18h - 20h)</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.horarioContato && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.horarioContato.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-purple-500/20">
              <Button
                type="button"
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
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar formulário
                      <CheckCircle className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
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
              🔒 Seus dados estão protegidos. Utilizamos apenas para entender sua necessidade e oferecer a melhor
              solução.
            </p>
          </form>
        </div>
        </DialogContent>
      </Dialog>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitConfirm} onOpenChange={setShowExitConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircle className="w-6 h-6 text-orange-400 mr-2" />
              Tem certeza?
            </DialogTitle>
            <DialogDescription>
              Você perderá todas as informações preenchidas até agora. Deseja realmente sair?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowExitConfirm(false)}
              className="border-gray-600 text-gray-300"
            >
              Continuar preenchendo
            </Button>
            <Button onClick={confirmExit} className="bg-red-600 hover:bg-red-700">
              Sim, sair
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
