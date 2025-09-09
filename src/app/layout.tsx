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
  description: "Transforme sua operação com agentes inteligentes que atendem clientes 24/7 e otimizam agendamentos automaticamente.",
  generator: "Next.js",
  applicationName: "Fluintech",
  keywords: [
    "inteligência artificial", 
    "automação", 
    "chatbots", 
    "WhatsApp Business", 
    "atendimento automatizado", 
    "IA empresarial",
    "agendamento automático",
    "atendimento 24/7",
    "assistente virtual"
  ],
  authors: [{ name: "Fluintech", url: "https://www.fluintech.com.br" }],
  creator: "Fluintech",
  publisher: "Fluintech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.fluintech.com.br"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.fluintech.com.br",
    siteName: "Fluintech",
    title: "Fluintech - Automatize seu atendimento com IA",
    description: "Transforme sua operação com agentes inteligentes que atendem clientes 24/7 e otimizam agendamentos automaticamente.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fluintech - Automação com IA para atendimento ao cliente",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fluintech",
    creator: "@fluintech",
    title: "Fluintech - Automatize seu atendimento com IA",
    description: "Transforme sua operação com agentes inteligentes que atendem clientes 24/7 e otimizam agendamentos automaticamente.",
    images: {
      url: "/og-image.jpg",
      alt: "Fluintech - Automação com IA para atendimento ao cliente",
    },
  },
  verification: {
    google: "google-site-verification-code-here",
    yandex: "yandex-verification-code-here",
    yahoo: "yahoo-site-verification-code-here",
  },
  category: "Technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fluintech" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 min-h-screen antialiased`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}