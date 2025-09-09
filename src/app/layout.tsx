import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "Fluintech - Automatize seu atendimento com IA",
  description:
    "Transforme sua operação com agentes inteligentes que atendem clientes 24/7 e otimizam agendamentos automaticamente.",
  generator: "v0.app",
  keywords: "inteligência artificial, automação, chatbots, WhatsApp Business, atendimento automatizado, IA empresarial",
  authors: [{ name: "Fluintech" }],
  creator: "Fluintech",
  publisher: "Fluintech",
  robots: "index, follow",
  openGraph: {
    title: "Fluintech - Automatize seu atendimento com IA",
    description: "Transforme sua operação com agentes inteligentes que atendem clientes 24/7",
    url: "https://fluintech.com.br",
    siteName: "Fluintech",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fluintech - Automação com IA",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluintech - Automatize seu atendimento com IA",
    description: "Transforme sua operação com agentes inteligentes que atendem clientes 24/7",
    images: ["/og-image.jpg"],
    creator: "@fluintech",
  },
  alternates: {
    canonical: "https://fluintech.com.br",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 min-h-screen`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
