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
    default: "Lista de Espera - Aula Gratuita de Automações | Fluintech",
    template: "%s | Fluintech",
  },
  description:
    "Entre na lista de espera para a aula gratuita sobre n8n, Evolution API, OpenAI e automações inteligentes. Aprenda a criar automações escaláveis do zero.",
  generator: "Next.js",
  applicationName: "Fluintech",
  keywords: [
    "n8n",
    "automação",
    "IA",
    "WhatsApp",
    "Evolution API",
    "OpenAI",
    "VPS",
    "self-hosted",
    "automações avançadas",
    "curso n8n",
    "aula gratuita automação",
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
    canonical: "/lista-espera",
    languages: {
      "pt-BR": "/lista-espera",
    },
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
    url: "https://www.fluintech.com.br/lista-espera",
    siteName: "Fluintech",
    title: "Lista de Espera - Aula Gratuita de Automações Avançadas",
    description: "Aprenda a criar automações escaláveis com n8n, WhatsApp e IA. Entre na lista de espera.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fluintech - Aula Gratuita de Automações",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fluintech",
    creator: "@fluintech",
    title: "Lista de Espera - Aula Gratuita de Automações",
    description: "Aprenda n8n, Evolution API, OpenAI e automações escaláveis. Inscreva-se na lista de espera.",
    images: {
      url: "/og-image.jpg",
      alt: "Fluintech - Aula Gratuita",
    },
  },
  category: "Technology",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalEvent",
  name: "Aula Gratuita de Automações Avançadas - Fluintech",
  description: "Aprenda a criar automações escaláveis com n8n, Evolution API, OpenAI e WhatsApp",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  organizer: {
    "@type": "Organization",
    name: "Fluintech",
    url: "https://www.fluintech.com.br",
    sameAs: [
      "https://www.instagram.com/fluintech",
      "https://www.facebook.com/profile.php?id=61578914720363",
      "https://www.youtube.com/channel/UCX6YDzQX_M8uu8qkK4aTo1g",
    ],
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
  },
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
        <meta name="theme-color" content="#7c3aed" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fluintech" />
        <meta name="format-detection" content="telephone=no" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
