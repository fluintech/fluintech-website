import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Agentes de IA no WhatsApp | Fluintech",
    template: "%s | Fluintech - IA no WhatsApp"
  },
  description: "Converse com a Lia e crie agentes de IA personalizados para seu WhatsApp. Qualifique leads, agende consultas, atenda 24/7 e automatize vendas. Reduza custos em até 80%.",
  generator: "Next.js",
  applicationName: "Fluintech",
  keywords: [
    "agentes IA WhatsApp",
    "Lia assistente IA",
    "qualificação de leads WhatsApp",
    "SDR automático WhatsApp",
    "chatbot inteligente WhatsApp",
    "automação vendas WhatsApp",
    "agendamento automático WhatsApp",
    "atendimento 24/7 WhatsApp",
    "follow-up automático WhatsApp",
    "bot de IA WhatsApp",
    "assistente virtual WhatsApp",
    "automação WhatsApp Business",
    "lead qualification automática",
    "conversas com IA no WhatsApp",
    "ferramenta IA vendas",
    "chatbot IA conversacional",
    "inteligência artificial Brasil",
    "automação negócios"
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
    languages: {
      'pt-BR': '/',
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    title: "Agentes de IA no WhatsApp",
    description: "Agentes de IA personalizados que trabalham no seu WhatsApp. Qualifique leads, agende consultas, atenda clientes 24/7. Fale com a Lia agora.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fluintech - Agentes de IA no WhatsApp com a Lia",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fluintech",
    creator: "@fluintech",
    title: "Agentes de IA no WhatsApp",
    description: "Crie agentes de IA para seu WhatsApp. Qualifique leads, agende consultas, automatize vendas com a Lia.",
    images: {
      url: "/og-image.jpg",
      alt: "Fluintech - Agentes de IA no WhatsApp",
    },
  },
  verification: {
    google: "seu-codigo-google-search-console",
  },
  category: "Technology",
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Fluintech - Converse com a Lia',
  description: 'Agentes de IA personalizados que trabalham no seu WhatsApp. Qualifique leads, agende consultas e automatize vendas.',
  url: 'https://www.fluintech.com.br',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    price: '0',
    priceCurrency: 'BRL'
  },
  provider: {
    '@type': 'Organization',
    name: 'Fluintech',
    url: 'https://www.fluintech.com.br',
    logo: 'https://www.fluintech.com.br/logo.png',
    image: 'https://www.fluintech.com.br/lia-avatar.png',
    sameAs: [
      'https://twitter.com/fluintech',
      'https://www.linkedin.com/company/fluintech',
      'https://www.instagram.com/fluintech'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['pt-BR']
    }
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150'
  },
  features: [
    'SDR Automático',
    'Agendamento Inteligente',
    'Atendimento 24/7',
    'Follow-up Automático'
  ]
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#10b981" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fluintech - Lia" />
        <meta name="format-detection" content="telephone=no" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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