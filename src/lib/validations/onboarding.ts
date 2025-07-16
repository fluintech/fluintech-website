import { z } from "zod"

export const onboardingSchema = z.object({
  // Etapa 1: Informações pessoais
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  cargo: z.string().min(1, "Selecione seu cargo"),

  // Etapa 2: Informações da empresa
  empresa: z.string().min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
  cnpj: z.string().optional(),
  segmento: z.string().min(1, "Selecione o segmento"),
  colaboradores: z.string().min(1, "Selecione o número de colaboradores"),

  // Etapa 3: Desafios
  desafios: z.array(z.string()).min(1, "Selecione pelo menos um desafio"),
  outroDesafio: z.string().optional(),

  // Etapa 4: Objetivo
  objetivo: z.string().min(1, "Selecione seu objetivo principal"),

  // Etapa 5: Timing e contato
  urgencia: z.string().min(1, "Selecione a urgência"),
  contatoPreferido: z.array(z.string()).min(1, "Selecione pelo menos uma forma de contato"),
  horarioContato: z.string().min(1, "Selecione o horário preferido"),
})

export type OnboardingFormData = z.infer<typeof onboardingSchema>

// Schemas por etapa para validação incremental
export const step1Schema = onboardingSchema.pick({
  nome: true,
  email: true,
  telefone: true,
  cargo: true,
})

export const step2Schema = onboardingSchema.pick({
  empresa: true,
  cnpj: true,
  segmento: true,
  colaboradores: true,
})

export const step3Schema = onboardingSchema.pick({
  desafios: true,
  outroDesafio: true,
})

export const step4Schema = onboardingSchema.pick({
  objetivo: true,
})

export const step5Schema = onboardingSchema.pick({
  urgencia: true,
  contatoPreferido: true,
  horarioContato: true,
})
