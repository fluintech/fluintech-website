import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Fluintech — Agentes de IA que executam o trabalho pesado",
  description:
    "Implementamos agentes de IA que executam o trabalho pesado para que sua equipe foque no que realmente importa. Do diagnóstico ao primeiro agente em 30 dias.",
  keywords: "agentes de IA, automação, n8n, WhatsApp, inteligência artificial, PME, Brasil",
  authors: [{ name: "Fluintech" }],
  creator: "Fluintech",
  publisher: "Fluintech",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.fluintech.com.br",
    siteName: "Fluintech",
    title: "Fluintech — Agentes de IA que executam o trabalho pesado",
    description:
      "Implementamos agentes de IA que executam o trabalho pesado para que sua equipe foque no que realmente importa.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@fluintech",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Suspense>
          {children}
        </Suspense>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
