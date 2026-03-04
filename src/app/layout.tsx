import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
>>>>>>> 2ff3576 (Resolve merge markers in src/app/layout.tsx — prefer origin/main layout)
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Fluintech - Automação Inteligente com IA | Atendimento e Agendamentos",
  description:
    "Transforme seu atendimento com inteligência artificial. Automatize agendamentos, chatbots 24/7 e fluxos inteligentes. Reduza 70% do tempo de resposta.",
  keywords:
    "automação, inteligência artificial, chatbot, agendamento inteligente, atendimento automatizado, IA, Brasil",
  authors: [{ name: "Fluintech" }],
  creator: "Fluintech",
  publisher: "Fluintech",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.fluintech.com.br",
    url: "https://www.fluintech.com.br/lista-espera",
>>>>>>> 2ff3576 (Resolve merge markers in src/app/layout.tsx — prefer origin/main layout)
    siteName: "Fluintech",
    title: "Fluintech - Automação Inteligente com IA",
    description:
      "Transforme seu atendimento com inteligência artificial. Automatize agendamentos, chatbots 24/7 e fluxos inteligentes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fluintech - Automação Inteligente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluintech - Automação Inteligente com IA",
    description:
      "Transforme seu atendimento com inteligência artificial. Automatize agendamentos, chatbots 24/7 e fluxos inteligentes.",
    images: ["/og-image.png"],
  }
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
>>>>>>> 2ff3576 (Resolve merge markers in src/app/layout.tsx — prefer origin/main layout)
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="canonical" href="https://www.fluintech.com.br" />
        <meta name="geo.region" content="BR" />
        <meta name="geo.placename" content="Paraná" />
        <meta name="geo.position" content="-23.419018564247832;-51.93836327766127" />
        <meta name="ICBM" content="-23.419018564247832, -51.93836327766127" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fluintech",
              url: "https://www.fluintech.com.br",
              logo: "https://www.fluintech.com.br/logo.png",
              description:
                "Startup brasileira especializada em automação inteligente para atendimento ao cliente e agendamento de serviços com IA.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BR",
                addressRegion: "PR",
                addressLocality: "Paraná",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+55-44-99864-4440",
                contactType: "customer service",
                availableLanguage: "Portuguese",
              },
              sameAs: ["https://linkedin.com/company/fluintech", "https://instagram.com/fluintech"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
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
>>>>>>> 2ff3576 (Resolve merge markers in src/app/layout.tsx — prefer origin/main layout)
      </body>
    </html>
  )
}
>>>>>>> 40ff3f2 (feat: update landing page)
